import { Canvas, Color, Rectangle } from "../../src/new-canvas";

const canvas = new Canvas(document.querySelector("canvas"));

const rectangle = new Rectangle([-0.5, -0.5, 0.5, 0.5])
  .fill(Color.BLACK)
  .stroke(Color.GREEN)
  .strokeWidth(10);
  //.rotate(Math.PI / 2);

canvas.draw(rectangle);
