(async () => {
  const buffers = [];
  for await (const chunk of process.stdin) buffers.push(chunk);
  const buffer = Buffer.concat(buffers);
  const inputText = buffer.toString();

  const board = Board.fromString(inputText);
  console.log(board.toString());

  const next = board.next();
  console.log(next.toString());
})();

class Cell {
  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly possibles: Set<number>
  ) {}

  isFixed(): boolean {
    return this.possibles.size === 1;
  }

  isImpossible(): boolean {
    return this.possibles.size === 0;
  }

  reduce(possible: number) {
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
    if (this.possibles.size === 0) {
      return "x";
    }
    if (this.possibles.size === 1) {
      return this.possibles.values().next().value;
    }
    if (this.possibles.size === 9) {
      return "_";
    }
    return "?";
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

  next(): Board {
    return this.clone();
  }

  static equals(a: Board, b: Board): boolean {
    return a.cells.some((cellA, i) => {
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
