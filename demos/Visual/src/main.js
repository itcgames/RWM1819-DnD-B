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

    this.drag = new Square(200,400,50,50, 'red', "drag");
    this.drop = new Square(400,500,75,75, 'green', "drop");

    var array = [];
    array.push(this.drop);
    if(this.drag.draggable != undefined){
      this.drag.draggable.addDropZones(array);
    }

  }

  update()
  {
    mainLoop.main.draw();
    window.requestAnimationFrame(mainLoop.main.update);
  }

  draw()
  {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drop.draw(this.ctx);
    this.drag.draw(this.ctx);
    this.ctx.fill();
  }
}