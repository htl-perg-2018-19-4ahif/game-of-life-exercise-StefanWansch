window.onload = () => {
  const boardSize = 800;
  let height = 200, width = 200;
  let ar: boolean[][];
  let help: boolean[][];
  let size = 4;
  let percent = 0.03;                                     //Pointsize

  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');

  const generateBoard = (boardSize: number, population: number) => {          //Help from Matthias Heiden
    return new Array(boardSize).fill(false).map(() => new Array(boardSize).fill(false).map(() => Math.random() < population));
  };

  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ar = generateBoard(width, percent);                     //create a boolean matrix
  help = ar.slice();                                   //Copy of the matrix

  window.requestAnimationFrame(draw);

  function countNeighbours() {                        //Kill all the points where neighbours > 3 or neighbours < 2
    let countN = 0;
    for (let i = 0; i < ar.length; i++) {
      for (let j = 0; j < ar[i].length; j++) {
        for (let col = i - 1; col <= i + 1; col++) {
          for (let row = j - 1; row <= j + 1; row++) {
            if (col >= 0 && row >= 0 && col < width && row < height) {
              if (ar[col][row] === true) {
                countN++;
              }
            }
          }
        }
        if (ar[i][j] == true) {
          countN--;
        }

        if (ar[i][j] == true) {
          if (countN >= 2 && countN <= 3) {
            help[i][j] = true;
          } else {
            help[i][j] = false;
          }
        } else if (ar[i][j] == false && countN == 3)
          help[i][j] = true;

        countN = 0;
      }
    }
    ar = help.slice();
  }
  // Call 'draw' function whenever browser renders a frame on the screen
  function draw() {                                         //Bug
    ctx.clearRect(0, 0, boardSize, boardSize);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (ar[i][j] == true) {
          ctx.fillRect(i * size, j * size, size, size);
        }
      }
    }
    countNeighbours();
    window.requestAnimationFrame(draw);
  }
};