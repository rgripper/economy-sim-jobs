// const createMushroomArea = ({ x, y }: { x: number; y: number }) => {
//   const maxSize = 2;
//   const maxNumber = 6;
//   const maxArea = 30;

//   const gr = new PIXI.Graphics();
//   //gr.beginFill();
//   //gr.lineStyle(2, 0xffefcf, 1, 0);
//   gr.beginFill(0xff3f1f, 1);

//   const mushrooms = new Array(Math.ceil(1 + Math.random() * (maxNumber - 1)))
//     .fill(0)
//     .map(() => ({
//       size: 1 + Math.random() * (maxSize - 1),
//       x: Math.random() * maxArea,
//       y: Math.random() * maxArea,
//     }));

//   mushrooms.forEach(({ size, x, y }) => gr.drawCircle(x, y, size));

//   gr.endFill();
//   gr.x = x;
//   gr.y = y;
//   return gr;
// };
