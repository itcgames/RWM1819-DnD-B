'use strict';

/**
 * draggable entity, currentl represented as a square object
 */
class Draggable
{
  // TODO: pass co-ords by reference so functions can control an object rather than having to render the object speratly
  // taking in sizing parameters as well as a dropzone entity to check that it's placement is valid
  constructor(x,y,width, height, dropzone, sounds)
  {
    this.that = this;
    this.x = x;
    this.y = y;
    this.origin = {x: x, y: y}; // origin point to return to
    this.width = width;
    this.height = height;

    this.baseW = width;
    this.baseH = height;
    this.scaleW = width / 2;
    this.scaleH = height / 2;
    this.lerpTo = false;

    this.color = 'green';
    this.dropzone = dropzone; // reference to the dropzone entity
    
    this.soundManager = sounds;

    this.inflight = {}; // used to get rid of object "jumping" to mouse co-ords

    document.addEventListener("mousedown",this.onMouseDown.bind(this), true);
  }

  boundingBox()
  {
    return {x:this.x, y:this.y, width:this.width, height:this.height};
  }

  // detect a mouse button press event and check to see if it is within the points of the entity
  onMouseDown(e)
  {
    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);

    // pointBoxCollision takes a box{x,y,width, height} and a point{x,y}
    if(utilities.pointBoxCollision(this.boundingBox(), {x: e.clientX, y: e.clientY})){
      document.addEventListener("mousemove", this.mouseMoveHandler, true);
      document.addEventListener("mouseup", this.mouseUpHandler, true);
      this.scaleDown(true);
      
      this.inflight.x = e.clientX - this.x;
      this.inflight.y = e.clientY - this.y;
      
      this.soundManager.playSound("pickup", false);
    }
  }
  
  // update the entity's location each mouse move
  onMouseMove(e){
    this.x = e.clientX - this.inflight.x;
    this.y = e.clientY - this.inflight.y;
  }

  // when the mouse button is released perform checks to ensure placement is valid and then remove the listeners
  onMouseUp(e){
    if(utilities.boundingBoxCollision(this.boundingBox(), this.dropzone.boundingBox())){
      this.dropzone.validDrop(true);
      this.scaleDown(false);
      this.x = this.dropzone.x + ((this.dropzone.width - this.width) / 2);
      this.y = this.dropzone.y + ((this.dropzone.height - this.height) / 2);
      this.soundManager.playSound("confirm", false);
    } else {
      this.dropzone.validDrop(false);
      this.scaleDown(false);
      this.x = this.origin.x;
      this.y = this.origin.y;

      this.soundManager.playSound("error", false);
    }

    
    
    document.removeEventListener("mousemove",this.mouseMoveHandler, true);
    document.removeEventListener("mouseup", this.mouseUpHandler, true);
  }

  scaleDown(scale){
    if(scale){
      this.width = utilities.lerp(this.baseW, this.scaleW, .5);
      this.height = utilities.lerp(this.baseH, this.scaleH, .5);
    } else {
      this.width = utilities.lerp(this.scaleW, this.baseW, 1);
      this.height = utilities.lerp(this.scaleH, this.baseH, 1);
    }
  }

  draw(ctx){
    if(this.lerpTo){
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

/**
 * basic square entity to represent a dropzone
 */
class DropZone {
  constructor(x,y,width,height) {
    this.x = x;
    this.y = y;    
    this.width = width;
    this.height = height;
    
    this.colour = 'red';
  }

  // validation flip
  validDrop(bool) {
    if(bool) {
      this.colour = 'blue';
    } else {
      this.colour = 'red';
    }
  }

  boundingBox() {
    return {x:this.x, y:this.y, width:this.width, height:this.height};
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}