'use strict';

// creating a drag and drop manager to control draggable and dropzone entities
// to be worked on after P2
class DragDropManager{
  constructor(){
    this.draggables = [];
    this.dropzones = [];
    document.addEventListener("mouseup", this.checkDropZones.bind(this), true); // fires on a mouse up detection
  }

  addDraggable(draggable){
   this.draggables.push(draggable);
  }

  addDropzone(dropzone){
   this.dropzones.push(dropzone);
  }

  checkDropZones(){
    if((this.dropzones == undefined || this.dropzones.length <= 0) 
    && (this.draggables == undefined || this.draggables.length <=0)){
      // do nothing
    } else {
      for(var j = 0; j < this.dropzones.length; j++){ // first iterate through all the draggables
        for(var i = 0; i < this.draggables.length; i++){ // check each against all available dropzones
          if(utilities.boundingBoxCollision(this.draggables[i].entity.getBoundingBox(), this.dropzones[j].entity.getBoundingBox())){ // if they are colliding
            var dropzone = this.dropzones[j].entity.getBoundingBox(); // get the bounds of the dropzone
            var draggable = this.draggables[i].entity.getBoundingBox();
            var x,y;
            x = dropzone.x + ((dropzone.width - draggable.width) / 2); 
            y = dropzone.y + ((dropzone.height - draggable.height) / 2);
            this.draggables[i].entity.updatePosition(x,y); // call the entitys update position method
             // place the draggable in the centre of the dropzone
            this.dropzones[j].validDrop(true); // confirmation affordance
          
            if(this.draggables[i].entity.soundManager !== undefined){
              this.draggables[i].entity.soundManager.playSound("confirm", false);
            }
          } else {
           var x,y;
           x = this.draggables[i].origin.x;
           y = this.draggables[i].origin.y;
           this.draggables[i].entity.updatePosition(x,y);
           this.dropzones[j].validDrop(false); // invalid affordance

           if(this.draggables[i].entity.soundManager !== undefined){
            this.draggables[i].entity.soundManager.playSound("error", false);
           }
          }
        }
      }
    }
  }
}
  