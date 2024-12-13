// p5.js sketch  by Marysia Tańska, 2024
// sketch made for the 2024 edition of Advent.js project run by Rianna Suen and Mike Cook
// https://www.instagram.com/advent_js/

// const CANVAS_SIZE = 1000;

// const CANVAS_SIZE = document.getElementById("work_data").clientHeight;
// console.log(CANVAS_SIZE);
const CANVAS_SIZE = window.screen.height * 0.7;

const ORIGINAL_CANVAS_SIZE = 1000;

// console.log(CANVAS_SIZE)

let gridCells = 8;

let gridSize = CANVAS_SIZE / gridCells;

let stars = [];

const smallerTipsScaleMin = 0.8 * CANVAS_SIZE / ORIGINAL_CANVAS_SIZE;
const smallerTipsScaleMax = 1.6 * CANVAS_SIZE / ORIGINAL_CANVAS_SIZE;
const dipsScaleMin = 0.4 * CANVAS_SIZE / ORIGINAL_CANVAS_SIZE;
const dipsScaleMax = 0.8 * CANVAS_SIZE / ORIGINAL_CANVAS_SIZE;

const circlesSizeMin = 40 * CANVAS_SIZE / ORIGINAL_CANVAS_SIZE;
const circlesSizeMax = 80 * CANVAS_SIZE / ORIGINAL_CANVAS_SIZE;

const sideCircleSize = 50 * CANVAS_SIZE / ORIGINAL_CANVAS_SIZE;

function setup() {
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  canvas.parent("p5_sketch"); // set the ID of the div where your sketch will be located
  console.log('parent div width', canvas.parent);

  // document.getElementById("work_data").appendChild( canvas );
  rectMode(CENTER);

  stars = generateStars(gridSize, CANVAS_SIZE);

  noFill();

}

function generateStars(gridSize, canvasSize) {

  let starsArray = [];

  for(let posX=gridSize*0.5; posX<canvasSize; posX+=gridSize){
    for(let posY=gridSize*0.5; posY<canvasSize; posY+=gridSize) {


      let starPosition = new p5.Vector(posX, posY);
      let smallerTipsScale = round(random(smallerTipsScaleMin, smallerTipsScaleMax), 1) * 0.5;
      let dipsScale = round(random(dipsScaleMin, dipsScaleMax), 1) * 0.5

      starsArray.push(new Star(
        starPosition,
        round(random(2.5, 12.49)),
        gridSize * 0.9 * 0.5,
        dipsScale,
        smallerTipsScale,
        random([0, 1, 3, 5]),
        round(random(-10, 10)) * 0.0003,
        random(10, 50) * 0.0007,
        [circlesSizeMin, circlesSizeMax],
        sideCircleSize,
      ));
    }

  }
  return starsArray;
}

function draw() {

  background('#00112B');

  stars.forEach(star => {

    star.animate();
    star.display();

  });

}

function keyPressed() {
  if(keyCode == LEFT_ARROW && gridCells > 1) {
    gridCells--;

    gridSize = CANVAS_SIZE / gridCells;

    stars = generateStars(gridSize, CANVAS_SIZE);
  }
  else if(keyCode == RIGHT_ARROW && gridCells < 12) {
    gridCells++;

    gridSize = CANVAS_SIZE / gridCells;

    stars = generateStars(gridSize, CANVAS_SIZE);
  }
  if(keyCode == 32) {
    stars = generateStars(gridSize, CANVAS_SIZE);

  }
  if(key === 's') {
    save('stars.png');
  }
}
