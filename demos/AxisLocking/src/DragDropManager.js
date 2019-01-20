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
      for(var j = 0; j < this.draggables.length; j++){ // first iterate through all the draggables
        for(var i = 0; i < this.dropzones.length; i++){ // check each against all available dropzones
          var dropzone = this.dropzones[i].entity.getBoundingBox(); // get the bounds of the dropzone
          var draggable = this.draggables[j].entity.getBoundingBox();
          if(utilities.boundingBoxCollision(draggable, dropzone)){ // if they are colliding
            var x,y;
            x = dropzone.x + ((dropzone.width - draggable.width) / 2); 
            y = dropzone.y + ((dropzone.height - draggable.height) / 2);
            this.draggables[j].entity.updatePosition(x,y); // call the entitys update position method
             // place the draggable in the centre of the dropzone
            this.dropzones[i].validDrop(true); // confirmation affordance
          
            if(this.draggables[j].entity.soundManager !== undefined){
              this.draggables[j].entity.soundManager.playSound("confirm", false);
            }
          } else {
            /*
           var x,y;
           x = this.draggables[j].origin.x;
           y = this.draggables[j].origin.y;
           this.draggables[j].entity.updatePosition(x,y);
           this.dropzones[i].validDrop(false); // invalid affordance

           if(this.draggables[j].entity.soundManager !== undefined){
            this.draggables[j].entity.soundManager.playSound("error", false);
           }
           */
          }
        }
      }
    }
  }
}
  