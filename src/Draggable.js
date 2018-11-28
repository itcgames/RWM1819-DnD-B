'use strict';

var that = {};
/**
 * draggable entity, currently represented as a square object
 */
class Draggable
{
  // taking in sizing parameters as well as a dropzone entity to check that it's placement is valid
  constructor(entity)
  {
    that = this;
    this.range = {};
    this.entity = entity;  // reference to the entity
    this.origin = {x: entity.getCollider().x, y: entity.getCollider().y};

    this.dragging = false;
    this.axisLock = false;
    this.axis = "";

    this.inflight = {}; // used to get rid of object "jumping" to mouse co-ords
    
    document.addEventListener("mousedown",this.onMouseDown.bind(this), true);
    this.mouseOverHandler = this.onMouseOver.bind(this);
    document.addEventListener("mousemove", this.mouseOverHandler, true);
  }

  setAxisLock(axis, range) // locks the entity to an axis
  {
    this.axisLock = true;
    this.axis = axis;
    if(range != undefined){
    this.range = {minX: range.minX, minY: range.minY, maxX: range.maxX, maxY: range.maxY};
    }
  }

  onMouseOver(e)
  {
    if(!this.dragging){
      if(utilities.pointBoxCollision(this.entity.getCollider(), {x: e.clientX, y: e.clientY})){
        //document.body.style.cursor = "none";
        this.entity.hoverStart();
      } else {
        //document.body.style.cursor = "default";
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
    if(this.axisLock){
      if(this.axis === "horizontal"){
        this.entity.updatePosition(e.clientX - this.inflight.x, this.entity.getCollider().y);
      } else if (this.axis === "vertical"){
        this.entity.updatePosition(this.entity.getCollider().x, e.clientY - this.inflight.y);
      }

      if(this.range != undefined)
      {
        var collider = this.entity.getCollider();
        var x;
        var y;

        if(collider.x < this.range.minX){
          x = this.range.minX;
        }
        if(collider.y < this.range.minY){
          y = this.range.minY;
        }
        if(collider.x > this.range.maxX){
          x = this.range.maxX;
        }
        if(collider.y > this.range.maxY){
          y = this.range.maxY;
        }
        this.entity.updatePosition(x, y);
      }
    }
    else{
      this.entity.updatePosition(e.clientX - this.inflight.x, e.clientY - this.inflight.y);
    }
  }

  // when the mouse button is released perform checks to ensure placement is valid and then remove the listeners
  onMouseUp(e){
    e.preventDefault();
    this.dragging = false;
    document.removeEventListener("mousemove",this.mouseMoveHandler, true);
    document.removeEventListener("mouseup", this.mouseUpHandler, true);
  }
}