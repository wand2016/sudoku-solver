(async () => {
  const buffers = [];
  for await (const chunk of process.stdin) buffers.push(chunk);
  const buffer = Buffer.concat(buffers);
  const inputText = buffer.toString();

  const board = Board.fromString(inputText);
  console.log("input:");
  console.log(board.toString());

  for (let depth = 1; depth < 10; ++depth) {
    console.log(`***** depth = ${depth} ****`);
    const result = solve(board, depth);
    if (result.type === "solved") {
      console.log("solved");
      console.log(result.board.toString());
      return;
    }
    if (result.type === "impossible") {
      console.log("cannot to solve");
      return;
    }
  }
})();

class Cell {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly possibles: Set<number>
  ) {}

  isFixed(): boolean {
    return this.possibles.size === 1;
  }

  fixedValue(): number {
    if (!this.isFixed()) {
      throw new Error("not fixed yet");
    }
    return [...this.possibles.values()][0];
  }

  isImpossible(): boolean {
    return this.possibles.size === 0;
  }

  canBe(number: number): boolean {
    return this.possibles.has(number);
  }
  remove(possible: number) {
    this.possibles.delete(possible);
  }
  fix(number: number) {
    if (!this.possibles.has(number)) {
      throw new Error(`cannot fix to ${number}`);
    }
    this.possibles.clear();
    this.possibles.add(number);
  }

  clone(): Cell {
    return new Cell(this.x, this.y, new Set(this.possibles));
  }

  static equals(a: Cell, b: Cell): boolean {
    return (
      a.x === b.x &&
      a.y === b.y &&
      [...a.possibles].join("") === [...b.possibles].join("")
    );
  }

  toString(): string {
    if (this.isImpossible()) {
      return "x";
    }
    if (this.isFixed()) {
      return this.fixedValue().toString();
    }
    if (this.possibles.size === 9) {
      return "_";
    }
    return `{${[...this.possibles].join("")}}`;
  }
  static fromChar(x: number, y: number, ch: string) {
    if (/^[1-9]$/.test(ch)) {
      return new Cell(x, y, new Set([Number(ch)]));
    }
    if (ch === "_") {
      return new Cell(x, y, new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    }

    throw new Error(`invalid ch: ${ch}`);
  }
}

class Board {
  constructor(private readonly cells: Cell[]) {}

  clone(): Board {
    return new Board(this.cells.map((cell) => cell.clone()));
  }

  toString(): string {
    let ret = "";
    for (let y = 0; y < 9; ++y) {
      for (let x = 0; x < 9; ++x) {
        ret += this.at(x, y).toString();
      }
      ret += "\n";
    }
    return ret;
  }

  progress(): string {
    return `${this.fixed().length} / 81`;
  }

  fixed() {
    return this.cells.filter((cell) => cell.isFixed());
  }

  // もう少しで確定しそうなセルを返す
  almostFixed(): Cell[] {
    const notFixed = this.cells.filter((cell) => !cell.isFixed());
    // at least 2
    const minimumPossibilities = Math.min(
      ...notFixed.map((cell) => cell.possibles.size)
    );

    return notFixed.filter(
      (cell) => cell.possibles.size === minimumPossibilities
    );
  }
  abduction(x: number, y: number, number: number): Board {
    const ret = this.clone();
    ret.at(x, y).fix(number);
    return ret;
  }

  row(y: number) {
    return this.cells.filter((cell) => cell.y === y);
  }
  col(x: number) {
    return this.cells.filter((cell) => cell.x === x);
  }
  at(x: number, y: number): Cell {
    return this.cells[y * 9 + x];
  }

  block(bx: number, by: number) {
    return this.cells
      .filter((cell) => Math.floor(cell.x / 3) === bx)
      .filter((cell) => Math.floor(cell.y / 3) === by);
  }
  blocks(): Cell[][] {
    let ret: Cell[][] = [];
    for (let by = 0; by < 3; ++by) {
      for (let bx = 0; bx < 3; ++bx) {
        ret.push(this.block(bx, by));
      }
    }
    return ret;
  }

  sameRow(ref: Cell) {
    return this.row(ref.y).filter((cell) => cell.x !== ref.x);
  }
  sameCol(ref: Cell) {
    return this.col(ref.x).filter((cell) => cell.y !== ref.y);
  }
  sameBlock(ref: Cell) {
    // 3で割って量子化
    const bx = Math.floor(ref.x / 3);
    const by = Math.floor(ref.y / 3);

    return this.block(bx, by).filter(
      (cell) => cell.x !== ref.x || cell.y !== ref.y
    );
  }

  next(): Board {
    const ret = this.clone();

    // 確定しているセルに対して
    for (const fixedCell of this.fixed()) {
      // 同じ行消込
      for (const cell of ret.sameRow(fixedCell)) {
        cell.remove(fixedCell.fixedValue());
      }
      // 同じ列消込
      for (const cell of ret.sameCol(fixedCell)) {
        cell.remove(fixedCell.fixedValue());
      }
      // 同じブロック消込
      for (const cell of ret.sameBlock(fixedCell)) {
        cell.remove(fixedCell.fixedValue());
      }
    }

    // ブロックに対して
    for (const block of ret.blocks()) {
      for (const number of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        // ブロック内である数字になりうるセルがただ一つ存在すれば、それは確定してよい
        const candidates = block.filter((cell) => cell.canBe(number));
        if (candidates.length === 1) {
          candidates[0].fix(number);
        }
      }
    }

    return ret;
  }

  isSolved(): boolean {
    return this.fixed().length === 81;
  }

  isImpossible(): boolean {
    return this.cells.some((cell) => cell.isImpossible());
  }

  static equals(a: Board, b: Board): boolean {
    return a.cells.every((cellA, i) => {
      const cellB = b.cells[i];
      return Cell.equals(cellA, cellB);
    });
  }

  static fromChars(chars: string[][]) {
    const cells: Cell[] = [];
    for (let y = 0; y < 9; ++y) {
      for (let x = 0; x < 9; ++x) {
        cells.push(Cell.fromChar(x, y, chars[y][x]));
      }
    }

    return new Board(cells);
  }

  static fromString(string: string) {
    const lines = string.split("\n");

    const chars: string[][] = [];
    for (let y = 0; y < 9; ++y) {
      chars.push(lines[y].split(""));
    }

    return Board.fromChars(chars);
  }
}

type ResultShallow =
  | {
      type: "solved";
      board: Board;
    }
  | {
      type: "impossible";
    }
  | {
      type: "abduction_needed";
      board: Board;
    };

type Result =
  | ResultShallow
  | {
      type: "too_deep";
    };

function solveShallow(board: Board): ResultShallow {
  let current: Board = board.clone();
  while (true) {
    if (current.isImpossible()) {
      return { type: "impossible" };
    }

    if (current.isSolved()) {
      return { type: "solved", board: current };
    }

    const next = current.next();
    if (Board.equals(current, next)) {
      return { type: "abduction_needed", board: next };
    }

    current = next;
  }
}

function solve(board: Board, maxDepth = 3, depth = 1): Result {
  // 脱出条件
  if (depth > maxDepth) {
    return {
      type: "too_deep",
    };
  }

  let current = board.clone();
  OUTER: while (true) {
    const result = solveShallow(current);

    if (result.type === "impossible") {
      return result;
    }
    if (result.type === "solved") {
      return result;
    }

    // abduction_needed
    // 1つ仮置きして解なしになれば、その仮置きが間違っているということ
    current = result.board;
    const almostFixed = current.almostFixed();
    for (const cellToFix of almostFixed) {
      for (const possible of cellToFix.possibles) {
        // 仮置きした問題を解く
        const abductionResult = solve(
          current.abduction(cellToFix.x, cellToFix.y, possible),
          maxDepth,
          depth + 1
        );
        // 解けちゃったらそれはそれでよし
        if (abductionResult.type === "solved") {
          return abductionResult;
        }
        // 仮置きして解なしになったら、その仮置きを候補から外して仕切り直し
        if (abductionResult.type === "impossible") {
          current.at(cellToFix.x, cellToFix.y).remove(possible);
          continue OUTER;
        }
      }
    }

    // 深さが足りないとここにくる
    return {
      type: "abduction_needed",
      board: current,
    };
  }
}
