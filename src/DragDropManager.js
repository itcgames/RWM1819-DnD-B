'use strict';

// creating a drag and drop manager to control draggable and dropzone entities
// to be worked on after P2
class DragDropManager{
    constructor(){

    }

    checkDropZones(){
    // old code will abstract dropzone detection to a drag and drop manager
    /*
    if(this.dropzones == undefined){
    
    } else {
      for(var i = 0; i < this.dropzones.length; i++){
        if(utilities.boundingBoxCollision(this.entity.getCollider(), this.dropzones[i].getCollider())){
          var dropzone = this.dropzones[i].getCollider();
          this.entity.x = dropzone.x + ((dropzone.width - this.entity.width) / 2);
          this.entity.y = dropzone.y + ((dropzone.height - this.entity.height) / 2);

          this.dropzones[i].draggable.validDrop(true);

          if(this.entity.soundManager !== undefined){
            this.entity.soundManager.playSound("confirm", false);
          }
        } else {
          this.entity.x = this.origin.x;
          this.entity.y = this.origin.y;

          this.dropzones[i].draggable.validDrop(false);
          
          if(this.entity.soundManager !== undefined){
            this.entity.soundManager.playSound("error", false);
          }
        }
      }
    }*/
    }
}