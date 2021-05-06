(async () => {
  const buffers = [];
  for await (const chunk of process.stdin) buffers.push(chunk);
  const buffer = Buffer.concat(buffers);
  const inputText = buffer.toString();

  let board = Board.fromString(inputText);

  console.log("solve");
  while (true) {
    console.log(board.toString());
    console.log(board.progress());

    if (board.isImpossible()) {
      console.log("cannot solve!");
      break;
    }

    if (board.isSolved()) {
      console.log("solved");
      break;
    }

    const next = board.next();

    if (Board.equals(board, next)) {
      console.log("abduction is needed");
      break;
    }

    board = next;
  }
})();

class Cell {
  constructor(
    public readonly x: number,
    public readonly y: number,
    private readonly possibles: Set<number>
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

  remove(possible: number) {
    this.possibles.delete(possible);
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
        ret += this.cells[y * 9 + x].toString();
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

  row(y: number) {
    return this.cells.filter((cell) => cell.y === y);
  }

  col(x: number) {
    return this.cells.filter((cell) => cell.x === x);
  }

  block(x: number, y: number) {
    // 3で割って量子化
    const bx = Math.floor(x / 3);
    const by = Math.floor(y / 3);
    return this.cells
      .filter((cell) => Math.floor(cell.x / 3) === bx)
      .filter((cell) => Math.floor(cell.y / 3) === by);
  }

  sameRow(ref: Cell) {
    return this.row(ref.y).filter((cell) => cell.x !== ref.x);
  }
  sameCol(ref: Cell) {
    return this.col(ref.x).filter((cell) => cell.y !== ref.y);
  }
  sameBlock(ref: Cell) {
    return this.block(ref.x, ref.y).filter(
      (cell) => cell.x !== ref.x || cell.y !== ref.y
    );
  }

  next(): Board {
    const ret = this.clone();

    // 確定しているブロックに対して
    for (const f of this.fixed()) {
      // 同じ行消込
      for (const cell of ret.sameRow(f)) {
        cell.remove(f.fixedValue());
      }
      // 同じ列消込
      for (const cell of ret.sameCol(f)) {
        cell.remove(f.fixedValue());
      }
      // 同じブロック消込
      for (const cell of ret.sameBlock(f)) {
        cell.remove(f.fixedValue());
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
