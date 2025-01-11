import { makeScene2D, Rect, Layout, Txt, Circle, hue } from "@motion-canvas/2d";
import { all, createRefArray, makeRef, range } from "@motion-canvas/core";
import { generateGridCoordinates } from "../utils/coordinates";

export default makeScene2D(function* (view) {
  const squares = createRefArray<Rect>();
  const width = 28;
  const height = 16;
  const size = 50;
  const spacing = 10;

  view.add(
    <Layout>
      {range(width * height).map((index) => {
        const gridPos = generateGridCoordinates(
          index + 1,
          width,
          height,
          "topLeft",
        );
        return (
          <Rect
            ref={squares}
            key={index.toString()}
            fill={"#CF4232"}
            smoothCorners={true}
            radius={2}
            size={50}
            x={
              gridPos.x * (size + spacing) +
              (size + spacing) / 2 -
              (width * (size + spacing)) / 2
            }
            y={
              gridPos.y * (size + spacing) +
              (size + spacing) / 2 -
              (height * (size + spacing)) / 2
            }
          />
        );
      })}
    </Layout>,
  );

  yield* all(
    ...squares.map((square, i) => square.scale(0, 0.3).to(1, i * 0.005)),
  );
});
