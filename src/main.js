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

    this.drag = new Square(200,400,50,50, 'red', this.audioManager, "drag");
<<<<<<< HEAD
    this.drop = new Square(400,500,75,75, 'green', this.audioManager, "drag");

    this.drag.draggable.setAxisLock("horizontal", {minX: 200, minY: 400, maxX: 300, maxY: 400});
    this.drop.draggable.setAxisLock("vertical", {minX: 400, minY: 300, maxX: 400, maxY: 600});

/*     var array = [];
    array.push(this.drop);
    if(this.drag.draggable != undefined){
      this.drag.draggable.addDropZones(array);
    }
 */
=======
    this.drop = new Square(400,500,75,75, 'green', this.audioManager, "drop");

    var array = [];
    array.push(this.drop);
    if(this.drag.draggable != undefined){
      this.drag.draggable.addDropZones(array);
    }

>>>>>>> aba063dc9fa340c57ceee4607ff49861790e20c1
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