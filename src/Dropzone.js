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