export function generateGridCoordinates(
  index: number,
  width: number,
  height: number,
  startFrom:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "left"
    | "right"
    | "top"
    | "bottom" = "topLeft",
): { x: number; y: number } {
  // Create a grid filled diagonally
  const grid: number[][] = Array.from({ length: height }, () =>
    Array(width).fill(0),
  );
  let currentIndex = 1;

  const fromRight = startFrom.includes("Right") || startFrom === "right";
  const fromBottom = startFrom.includes("bottom");
  const isStraight = ["left", "right", "top", "bottom"].includes(startFrom);

  if (!isStraight) {
    // Fill diagonally
    for (let d = 0; d < width + height - 1; d++) {
      for (let y = 0; y < height; y++) {
        const x = fromRight ? width - 1 - (d - y) : d - y;

        if (x >= 0 && x < width) {
          const effectiveY = fromBottom ? height - 1 - y : y;
          grid[effectiveY][x] = currentIndex++;
        }
      }
    }
  } else {
    // Fill straight
    if (startFrom === "left" || startFrom === "right") {
      for (let x = 0; x < width; x++) {
        const effectiveX = fromRight ? width - 1 - x : x;
        for (let y = 0; y < height; y++) {
          grid[y][effectiveX] = currentIndex++;
        }
      }
    } else {
      // top or bottom
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const effectiveY = fromBottom ? y : height - 1 - y;
          grid[effectiveY][x] = currentIndex++;
        }
      }
    }
  }

  // Find the coordinates of the index
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === index) {
        return { x, y };
      }
    }
  }

  throw new Error(`Index ${index} is out of bounds for the grid`);
}
