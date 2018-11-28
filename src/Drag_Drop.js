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
    this.origin = {x: entity.getCollider().x, y: entity.getCollider().y};
    this.dragging = false;

    this.inflight = {}; // used to get rid of object "jumping" to mouse co-ords
    
    document.addEventListener("mousedown",this.onMouseDown.bind(this), true);
    this.mouseOverHandler = this.onMouseOver.bind(this);
    document.addEventListener("mousemove", this.mouseOverHandler, true);
  }

  addDropZones(dropzone)
  {
    this.dropzones = dropzone;
  }

  onMouseOver(e)
  {
    if(!this.dragging){
      if(utilities.pointBoxCollision(this.entity.getCollider(), {x: e.clientX, y: e.clientY})){
        document.body.style.cursor = "none";
        this.entity.hoverStart();
      } else {
        document.body.style.cursor = "default";
        this.entity.hoverEnd();
      }
    }
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
      
      this.inflight.x = e.clientX - this.entity.getCollider().x;
      this.inflight.y = e.clientY - this.entity.getCollider().y; 
      
      if(this.entity.soundManager != undefined) { 
       this.entity.soundManager.playSound("pickup", false);
      }
    }
  }
  
  // update the entity's location each mouse move
  onMouseMove(e){
    e.preventDefault();
    this.entity.updatePosition(e.clientX - this.inflight.x, e.clientY - this.inflight.y);
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

          this.dropzones[i].draggable.validDrop(true);

          if(this.soundManager !== undefined){
            this.entity.soundManager.playSound("confirm", false);
          }
        } else {
          this.entity.updatePosition(this.origin.x, this.origin.y);

          this.dropzones[i].draggable.validDrop(false);
          
          if(this.entity.soundManager !== undefined){
            this.entity.soundManager.playSound("error", false);
          }
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

  // validation
  validDrop(bool) {
    if(bool){
      this.object.colour = 'green';
    } else {
      this.object.colour = 'pink';
    }
  }
}