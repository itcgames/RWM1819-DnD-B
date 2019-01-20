'use strict';

/**
 * main class, handles update loop as well as the call to render for any entities
 * creates a canvas holder on creation, initialises canvas and entities in function call
 */
class Main
{
  constructor()
  {
    this.canvas = {};
  }

  init()
  {
    console.log("App Initialized");
    this.canvas = document.createElement("canvas");
    this.canvas.id = "thecanvas";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.dragManager = new DragDropManager();

    this.drag1 = new Square(200,400,50,50, 'red', undefined, "drag");
    this.drag2 = new Square(500,400,50,50, 'red', undefined, "drag");

    this.drag1.draggable.setAxisLock("horizontal", {minX: 200, minY: 400, maxX: 400, maxY: 400});
    this.drag2.draggable.setAxisLock("vertical", {minX: 500, minY: 400, maxX: 500, maxY: 800});
  }

  update()
  {
    mainLoop.main.draw();
    window.requestAnimationFrame(mainLoop.main.update);
  }

  draw()
  {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drag1.draw(this.ctx);
    this.drag2.draw(this.ctx);
    this.ctx.fill();
  }
}