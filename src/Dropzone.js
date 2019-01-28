/**
 * basic entity to represent a dropzone
 */
class DropZone {
    constructor(entity, capacity) {
      this.entity = entity;
      this.capacity = capacity;
      this.count = 0;
    }

    // validation
    validDrop(bool) {
      if(bool){
        this.entity.hoverStart();
      } else {
        this.entity.hoverEnd();
      }
    }

    getCapacity(){
      return this.capacity;
    }

    setCapacity(capacity){
      this.capacity = capacity;
    }

    getCurrentCount(){
      return this.count;
    }

    setCount(count){
      this.count = count;
    }
  }