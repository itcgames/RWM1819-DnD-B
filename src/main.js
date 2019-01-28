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

    this.audioManager = new SoundManager();
    this.audioManager.initialize();

    var sounds = {
      'pickup': 'resources/sound/pickup.wav', 
      'error' : 'resources/sound/error.wav',
      'confirm':'resources/sound/confirmation.wav'};

    for(name in sounds)
    {
        this.audioManager.loadSound(name, sounds[name]);
    }

    this.dragManager = new DragDropManager();

    this.drag1 = new Square(200,400,50,50, 'red', this.audioManager, "drag");
    this.drag1.makeDraggable("red", "green");
    this.drag2 = new Square(500,400,50,50, 'red', this.audioManager, "drag");
    this.drag2.makeDraggable("red", "green");
    this.drag3 = new Square(200,600,50,50, 'red', this.audioManager, "drag");
    this.drag3.makeDraggable("red", "green");

    this.drop1 = new Square(200,300,75,75, 'blue', this.audioManager);
    this.drop1.makeDropZone("cyan", "blue", 1);
    this.drop2 = new Square(500,300,75,75, 'blue', this.audioManager);
    this.drop2.makeDropZone('cyan', 'blue', 1);

    this.dragManager.addDraggable(this.drag1.draggable);
    this.dragManager.addDraggable(this.drag2.draggable);
    this.dragManager.addDraggable(this.drag3.draggable);

    this.dragManager.addDropzone(this.drop1.draggable);
    this.dragManager.addDropzone(this.drop2.draggable);
  }

  update()
  {
    mainLoop.main.draw();
    window.requestAnimationFrame(mainLoop.main.update);
  }

  draw()
  {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drop1.draw(this.ctx);
    this.drop2.draw(this.ctx);

    this.drag1.draw(this.ctx);
    this.drag2.draw(this.ctx);
    this.drag3.draw(this.ctx);
    this.ctx.fill();
  }
}