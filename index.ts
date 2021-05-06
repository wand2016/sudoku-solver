(async () => {
  const buffers = [];
  for await (const chunk of process.stdin) buffers.push(chunk);
  const buffer = Buffer.concat(buffers);
  const text = buffer.toString();

  // 行分割
  const lines = text.split("\n");
  // 空行いらない
  lines.pop();
  // assert
  if (lines.length !== 9) {
    throw new Error("must be 9 lines");
  }

  // セル分割
  const cells = lines.map((line) => {
    const cellsInLine = line.split("");
    // assert
    if (cellsInLine.length !== 9) {
      throw new Error("must be 9 cells a line");
    }
    return cellsInLine;
  });
  console.log(cells);
})();
