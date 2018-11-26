'use strict';

var that = {};
/**
 * draggable entity, currentl represented as a square object
 */
class Draggable
{
  // TODO: pass co-ords by reference so functions can control an object rather than having to render the object speratly
  // taking in sizing parameters as well as a dropzone entity to check that it's placement is valid
  constructor(entity)
  {
    that = this;
    this.dropzones = {};
    this.entity = entity;  // reference to the entity
    this.origin = {x: entity.x, y: entity.y};
    this.dragging = false;

    this.inflight = {}; // used to get rid of object "jumping" to mouse co-ords
    
    document.addEventListener("mousedown",this.onMouseDown.bind(this), true);
  }

  addDropZones(dropzone)
  {
    this.dropzones = dropzone;
  }

  // detect a mouse button press event and check to see if it is within the points of the entity
  onMouseDown(e)
  {
    e.preventDefault();

    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);
    
    if(utilities.pointBoxCollision(this.entity.getCollider(), {x: e.clientX, y: e.clientY})){
      this.dragging = true;
      document.addEventListener("mousemove", this.mouseMoveHandler, true);
      document.addEventListener("mouseup", this.mouseUpHandler, true);
      
      this.inflight.x = e.clientX - this.entity.x;
      this.inflight.y = e.clientY - this.entity.y; 
    }
  }
  
  // update the entity's location each mouse move
  onMouseMove(e){
    e.preventDefault();
    this.entity.x = e.clientX - this.inflight.x;
    this.entity.y = e.clientY - this.inflight.y;
  }

  // when the mouse button is released perform checks to ensure placement is valid and then remove the listeners
  onMouseUp(e){
    e.preventDefault();
    this.dragging = false;
    if(this.dropzones == undefined){
    
    } else {
      for(var i = 0; i < this.dropzones.length; i++){
        if(utilities.boundingBoxCollision(this.entity.getCollider(), this.dropzones[i].getCollider())){
          var dropzone = this.dropzones[i].getCollider();
          this.entity.x = dropzone.x + ((dropzone.width - this.entity.width) / 2);
          this.entity.y = dropzone.y + ((dropzone.height - this.entity.height) / 2);
        } else {
          this.entity.x = this.origin.x;
          this.entity.y = this.origin.y;
        }
      }
    }

    document.removeEventListener("mousemove",this.mouseMoveHandler, true);
    document.removeEventListener("mouseup", this.mouseUpHandler, true);
  }
}

/**
 * basic entity to represent a dropzone
 */
class DropZone {
  constructor(object) {
    this.object = object;
  }
}