(async () => {
  const buffers = [];
  for await (const chunk of process.stdin) buffers.push(chunk);
  const buffer = Buffer.concat(buffers);
  const inputText = buffer.toString();

  console.time("sudoku");

  const board = Board.fromString(inputText);
  console.log("input:");
  console.log(board.toString());

  let current = board.clone();
  for (let depth = 1; depth <= 10; ++depth) {
    console.log(`***** depth = ${depth} ****`);
    const result = solve(current, depth);
    if (result.type === "solved") {
      console.log("solved!");
      console.log(result.board.toString());
      console.timeEnd("sudoku");
      return;
    }
    if (result.type === "impossible") {
      console.log("cannot to solve");
      console.timeEnd("sudoku");
      return;
    }
    // より深く仮置きしないと解けない場合
    // その場合でも、「ここに置くと詰む」という知識は得られたので、反映する
    if (result.type === "more_depth_needed") {
      current = result.board;
      console.log(current.toString());
      continue;
    }
  }
  console.log("more depth is needed.");
})();

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type Digit = typeof digits[number];

const cellCoords = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
type CellCoord = typeof cellCoords[number];
const blockCoords = [0, 1, 2];
type BlockCoord = typeof blockCoords[number];

class Cell {
  constructor(
    public readonly x: CellCoord,
    public readonly y: CellCoord,
    private readonly possibleDigits: Set<Digit>
  ) {}

  isFixed(): boolean {
    return this.possibleDigits.size === 1;
  }

  fixedDigit(): Digit {
    if (!this.isFixed()) {
      throw new Error("not fixed yet");
    }
    return [...this.possibleDigits.values()][0];
  }

  isImpossible(): boolean {
    return this.possibleDigits.size === 0;
  }

  getPossibleDigits(): Set<Digit> {
    return new Set(this.possibleDigits);
  }
  canBe(number: Digit): boolean {
    return this.possibleDigits.has(number);
  }
  remove(possible: Digit) {
    this.possibleDigits.delete(possible);
  }
  fix(number: Digit) {
    if (!this.possibleDigits.has(number)) {
      throw new Error(`cannot fix to ${number}`);
    }
    this.possibleDigits.clear();
    this.possibleDigits.add(number);
  }

  clone(): Cell {
    return new Cell(this.x, this.y, new Set(this.possibleDigits));
  }

  static equals(a: Cell, b: Cell): boolean {
    return (
      a.x === b.x &&
      a.y === b.y &&
      [...a.possibleDigits].join("") === [...b.possibleDigits].join("")
    );
  }

  toString(): string {
    if (this.isImpossible()) {
      return "x";
    }
    if (this.isFixed()) {
      return this.fixedDigit().toString();
    }
    if (this.possibleDigits.size === 9) {
      return "_";
    }
    return `{${[...this.possibleDigits].join("")}}`;
  }
  static fromChar(x: CellCoord, y: CellCoord, ch: string) {
    if (ch === "_") {
      return new Cell(x, y, new Set(digits));
    }

    if (/^[1-9]$/.test(ch)) {
      return new Cell(x, y, new Set([Number(ch) as Digit]));
    }

    throw new Error(`invalid ch: ${ch}`);
  }
}

class Board {
  private readonly rowMemo: Cell[][];
  private readonly colMemo: Cell[][];
  private readonly blockMemo: Cell[][];
  private blocksMemo: Cell[][] | null = null;
  private readonly sameRowMemo: Cell[][];
  private readonly sameColMemo: Cell[][];
  private readonly sameBlockMemo: Cell[][];

  constructor(private readonly cells: Cell[]) {
    this.rowMemo = Array(9);
    this.colMemo = Array(9);
    this.blockMemo = Array(9);
    this.sameRowMemo = Array(9);
    this.sameColMemo = Array(9);
    this.sameBlockMemo = Array(9);
  }

  clone(): Board {
    return new Board(this.cells.map((cell) => cell.clone()));
  }

  toString(): string {
    let ret = "";
    for (const y of cellCoords) {
      for (const x of cellCoords) {
        ret += this.at(x, y).toString();
      }
      ret += "\n";
    }
    return ret;
  }

  /**
   * 確定したセルを返す
   */
  fixed(): Cell[] {
    return this.cells.filter((cell) => cell.isFixed());
  }

  /**
   * もう少しで確定しそうなセルを返す
   */
  almostFixed(): Cell[] {
    const notFixed = this.cells.filter((cell) => !cell.isFixed());
    // at least 2
    const minimumPossibilities = Math.min(
      ...notFixed.map((cell) => cell.getPossibleDigits().size)
    );

    return notFixed.filter(
      (cell) => cell.getPossibleDigits().size === minimumPossibilities
    );
  }
  abduction(x: CellCoord, y: CellCoord, number: Digit): Board {
    const ret = this.clone();
    ret.at(x, y).fix(number);
    return ret;
  }

  rows(y: CellCoord): Cell[] {
    return (
      this.rowMemo[y] ||
      (this.rowMemo[y] = this.cells.filter((cell) => cell.y === y))
    );
  }

  cols(x: CellCoord): Cell[] {
    return (
      this.colMemo[x] ||
      (this.colMemo[x] = this.cells.filter((cell) => cell.x === x))
    );
  }

  /**
   * 座標指定してセル取得
   */
  at(x: CellCoord, y: CellCoord): Cell {
    return this.rows(y)[x];
  }

  /**
   * ブロックを構成するセルのコレクションを返す
   */
  block(bx: BlockCoord, by: BlockCoord): Cell[] {
    return (
      this.blockMemo[by * 3 + bx] ||
      (this.blockMemo[by * 3 + bx] = this.cells
        .filter((cell) => Math.floor(cell.x / 3) === bx)
        .filter((cell) => Math.floor(cell.y / 3) === by))
    );
  }

  /**
   * ブロックのコレクション
   */
  blocks(): Cell[][] {
    if (this.blocksMemo) {
      return this.blocksMemo;
    }

    const ret: Cell[][] = [];
    for (const by of blockCoords) {
      for (const bx of blockCoords) {
        ret.push(this.block(bx, by));
      }
    }

    return (this.blocksMemo = ret);
  }

  /**
   * あるセルと同じ行の他のセル
   */
  sameRow(ref: Cell): Cell[] {
    return (
      this.sameRowMemo[ref.y * 9 + ref.x] ||
      (this.sameRowMemo[ref.y * 9 + ref.x] = this.rows(ref.y).filter(
        (cell) => cell.x !== ref.x
      ))
    );
  }

  /**
   * あるセルと同じ列の他のセル
   */
  sameCol(ref: Cell): Cell[] {
    return (
      this.sameColMemo[ref.y * 9 + ref.x] ||
      (this.sameColMemo[ref.y * 9 + ref.x] = this.cols(ref.x).filter(
        (cell) => cell.y !== ref.y
      ))
    );
  }

  /**
   * あるセルと同じブロックの他のセル
   */
  sameBlock(ref: Cell): Cell[] {
    const memo = this.sameBlockMemo[ref.y * 9 + ref.x];
    if (memo) {
      return memo;
    }

    // 3で割って量子化
    const bx = Math.floor(ref.x / 3);
    const by = Math.floor(ref.y / 3);

    return (this.sameBlockMemo[ref.y * 9 + ref.x] = this.block(bx, by).filter(
      (cell) => cell.x !== ref.x || cell.y !== ref.y
    ));
  }

  /**
   * 盤面を進め、セルのとりうる数字の候補を絞り込む
   */
  next(): Board {
    const ret = this.clone();

    // 確定しているセルに対して
    for (const fixedCell of this.fixed()) {
      const fixedDigit = fixedCell.fixedDigit();
      // 同じ行、同じ列、同じブロックのセル消込
      for (const cell of ret.sameRow(fixedCell)) {
        cell.remove(fixedDigit);
      }
      for (const cell of ret.sameCol(fixedCell)) {
        cell.remove(fixedDigit);
      }
      for (const cell of ret.sameBlock(fixedCell)) {
        cell.remove(fixedDigit);
      }
    }

    // ブロック内である数字になりうるセルがただ一つ存在すれば、それは確定してよい
    //
    // ________1
    // ____1____
    // _23______
    // ...
    //
    // こういうケースで
    //
    // ________1
    // ____1____
    // 123______
    // ...
    //
    // を確定してよい
    //
    for (const block of ret.blocks()) {
      for (const digit of digits) {
        const candidates = block.filter((cell) => cell.canBe(digit));
        if (candidates.length === 1) {
          candidates[0].fix(digit);
        }
      }
    }

    return ret;
  }

  isSolved(): boolean {
    return this.cells.every((cell) => cell.isFixed());
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

  static fromString(string: string): Board {
    const cells: Cell[] = [];

    const lines = string.split("\n");
    for (const y of cellCoords) {
      for (const x of cellCoords) {
        cells.push(Cell.fromChar(x, y, lines[y][x]));
      }
    }

    return new Board(cells);
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
    }
  | {
      type: "more_depth_needed";
      board: Board;
    };

function solve(board: Board, maxDepth = 3, depth = 1): Result {
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

    // 深さ最大なら脱出
    if (depth === maxDepth) {
      return {
        type: "too_deep",
      };
    }

    current = result.board;
    const almostFixed = current.almostFixed();
    for (const cellToFix of almostFixed) {
      for (const possible of cellToFix.getPossibleDigits()) {
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
      type: "more_depth_needed",
      board: current,
    };
  }
}

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
