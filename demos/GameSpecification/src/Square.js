class Square{
    constructor(x, y, width, height, colour, sounds){
        this.draggable = {};
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.soundManager = sounds;
        this.colour = colour;
    }

    makeDropZone(hoverOn, hoverOff, capacity){
        this.draggable = new DropZone(this, capacity);
        this.hoverOn = hoverOn;
        this.hoverOff = hoverOff;
    }

    makeDraggable(hoverOn, hoverOff){
        this.draggable = new Draggable(this);
        this.hoverOn = hoverOn;
        this.hoverOff = hoverOff;
    }

    hoverStart()
    {
        this.colour = this.hoverOn;
    }

    hoverEnd()
    {
        this.colour = this.hoverOff;
    }

    getBoundingBox()
    {
        return {x: this.x, y: this.y, width: this.width, height:this.height};
    }

    updatePosition(x,y){
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        if(this.draggable.name != null){
            ctx.fillText(this.draggable.name, this.x + this.width / 2, this.y + this.height / 2);
        } else {
            ctx.fillText(this.draggable.category, this.x + this.width / 2, this.y + this.height / 2);
        }
        ctx.closePath();
      }
}