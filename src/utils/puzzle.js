export function makeSolvedTiles(total) {
  return Array.from({ length: total }, (_, i) => i);
}

export function isSolved(arr) {
  return arr.every((v, i) => v === i);
}

export function shuffleFromSolved(grid, steps = 200) {
  const total = grid * grid;
  let arr = makeSolvedTiles(total);
  let empty = total - 1;
  for (let i = 0; i < steps; i++) {
    const neighbors = [];
    const r = Math.floor(empty / grid),
      c = empty % grid;
    const pushIf = (rr, cc) => {
      if (rr >= 0 && rr < grid && cc >= 0 && cc < grid)
        neighbors.push(rr * grid + cc);
    };
    pushIf(r - 1, c);
    pushIf(r + 1, c);
    pushIf(r, c - 1);
    pushIf(r, c + 1);
    const choice = neighbors[Math.floor(Math.random() * neighbors.length)];
    [arr[empty], arr[choice]] = [arr[choice], arr[empty]];
    empty = choice;
  }
  return arr;
}
