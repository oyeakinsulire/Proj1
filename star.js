class Star {
  constructor(
    position, // p5.Vector(x, y)
    modules, // number
    radius, // number
    dipsScale, // number
    smallerTipsScale, // number
    circlesCount, // number
    rotationSpeed, // number
    scalingSpeed, // number
    circleSizeDomain,
    sideCircleSize,
  ) {
    this.position = position; // p5.Vector object storing the (X, Y) centre of the star on the canvas
    this.radius = radius; // radius of the star

    this.modules = modules; // number of star 'tips'
    this.dipsScale = dipsScale; // the depth of the 'dips' compared to the radius, smaller scale = bigger dips
    this.angleSpacing = (2 * PI) / modules; // angle between star tips
    this.smallerTipsScale = smallerTipsScale;
    this.circlesCount = circlesCount;
    this.scalingSpeed = scalingSpeed;

    this.rotationSpeed = rotationSpeed;
    this.circleDiams = [];
    this.circleSizeDomain = circleSizeDomain;
    this.sideCircleSize = sideCircleSize;

    for(let i=0; i<this.circlesCount; i++) {
      this.circleDiams.push(round(random(this.circleSizeDomain[0], this.circleSizeDomain[1])) * 0.01 * this.radius * 2)
    }

	this.startingVector = new p5.Vector(0, -this.radius); // a vector pointing directly upwards that we will use to draw the star modules

    this.outlineColour = '#A1AADB';
    this.surfaceEngravingColour = "purple";
    this.lineEngravingColour = '#7841FF';
    this.circlesColour = 'blue'
  }

  update(dipsScale, modulesCount, smallerTipsScale) {
    this.dipsScale = dipsScale;
    this.modules = modulesCount;
    this.angleSpacing = (2 * PI) / modulesCount;
    this.smallerTipsScale = smallerTipsScale;
  }
  animate() {
    this.radius = map(sin(frameCount * this.scalingSpeed), -1, 1, gridSize * 0.3 * 0.5, gridSize * 0.9 * 0.5);
    this.startingVector.normalize();
    this.startingVector.mult(this.radius);
    this.startingVector.rotate(this.rotationSpeed);
  }

  display() {
    this.drawCutLines();
    this.drawSurfaceEngraving();
    this.drawLineEngraving();
    this.drawCircles();
  }

  drawCutLines() {
    // put here lines that should be cut out by the laser. These shold be closed shapes.
    this.drawOutline();
  }

  drawOutlineBase() {
    // the outline of the star.
    stroke(this.outlineColour);
    noFill();

    let moduleVector = new p5.Vector(
      this.startingVector.x,
      this.startingVector.y
    ); // create a copy of the starting vector


    beginShape();

    for (let i = 0; i < this.modules; i++) {
      // add tip vertex to shape
      vertex(position.x + moduleVector.x, position.y + moduleVector.y);

      // rotate by half of the angle between tips
      moduleVector.rotate(this.angleSpacing * 0.5);

      // add dip vertex to shape
      vertex(
        position.x + moduleVector.x * this.dipsScale,
        position.y + moduleVector.y * this.dipsScale
      );
      // rotate by half of the angle between tips
      moduleVector.rotate(this.angleSpacing * 0.5);
    }
    // end and close the shape
    endShape(CLOSE);
  }

  drawOutline() {
    // the outline of the star.
    // set the  stroke colour to the cutting colour. This needs to be consistent to prepare for laser cutting.
    stroke(this.outlineColour);
    strokeWeight(0.4);
    noFill();

    let moduleVector = new p5.Vector(
      this.startingVector.x,
      this.startingVector.y
    ); // create a copy of the starting vector

    beginShape();

    for (let i = 0; i < this.modules; i++) {
      this.addModuleVertices(moduleVector);
    }
    // end and close the shape
    endShape(CLOSE);
  }

  addModuleVertices(moduleVector) {

      // add major tip vertex to shape
      vertex(this.position.x + moduleVector.x, this.position.y + moduleVector.y);

      // rotate by 0.3 of the angle between tips
      moduleVector.rotate(this.angleSpacing * 0.3);

      // add a dip vertex #1
      vertex(
        this.position.x + moduleVector.x * this.dipsScale,
        this.position.y + moduleVector.y * this.dipsScale
      );
      moduleVector.rotate(this.angleSpacing * 0.2);

      // add a smaller tip vertex

      vertex(
        this.position.x + moduleVector.x * this.smallerTipsScale,
        this.position.y + moduleVector.y * this.smallerTipsScale
      );

      circle(this.position.x + moduleVector.x * this.smallerTipsScale,
        this.position.y + moduleVector.y * this.smallerTipsScale, this.sideCircleSize);

      // add a dip vertex #2
      moduleVector.rotate(this.angleSpacing * 0.2);
      vertex(
        this.position.x + moduleVector.x * this.dipsScale,
        this.position.y + moduleVector.y * this.dipsScale
      );
      // rotate by half of the angle between tips
      moduleVector.rotate(this.angleSpacing * 0.3);
  }

  drawSurfaceEngravingModule(moduleVector) {

    moduleVector.rotate(this.angleSpacing);

    circle(
        this.position.x + (moduleVector.x * 0.1),
        this.position.y + (moduleVector.y * 0.1),
        5,
    );

    circle(
        this.position.x + (moduleVector.x * 0.18),
        this.position.y + (moduleVector.y * 0.18),
        3,
    );


    circle(
        this.position.x + (moduleVector.x * 0.18),
        this.position.y + (moduleVector.y * 0.18),
        2,
    );


  }

  drawSurfaceEngraving() {
    // put closed shapes here that you want engraved as a surface
    noStroke();
    fill(this.surfaceEngravingColour);

    let moduleVector = new p5.Vector(
      this.startingVector.x,
      this.startingVector.y
    );

    for (let i=0; i<this.modules; i++) {
      this.drawSurfaceEngravingModule(moduleVector);
    }


    // circle(this.position.x, this.position.y, this.radius * 0.5);
  }

  drawLineEngravingModule(moduleVector, vectorScale) {
    push();
    moduleVector.rotate(this.angleSpacing * 0.5);
    line(
      this.position.x,
      this.position.y,
      this.position.x + moduleVector.x * 0.6 * vectorScale,
      this.position.y + moduleVector.y * 0.6 * vectorScale,
    );
    pop();
  }

  drawLineEngraving() {
    // put lines here that you want engraves as lines
    noFill();
    strokeWeight(0.4);
    stroke(this.lineEngravingColour);

    // create a copy of the starting vector
    let moduleVector = new p5.Vector(
      this.startingVector.x,
      this.startingVector.y
    );

    for (let i=0; i<this.modules*2; i++) {
      let vectorScale = [0.5, 1][i%2];

      this.drawLineEngravingModule(moduleVector, vectorScale);
    }
  }

  drawCircles() {
    strokeWeight(0.25);
    stroke(this.circlesColour);

    let minDiam = this.startingVector.mag() * 2 * 0.6;
    let maxDiam = this.startingVector.mag() * 2 * 0.8;


    for(let i=0; i<this.circlesCount; i++) {

      circle(this.position.x, this.position.y, this.circleDiams[i]);
    }

  }
}
