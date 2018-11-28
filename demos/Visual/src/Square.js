class Square{
    constructor(x, y, width, height, colour, createZones){
        this.draggable = {};
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        switch(createZones)
        {
            case "drag":
            this.draggable = new Draggable(this);
            break;
            case "drop":
            this.draggable = new DropZone(this);
            break;
            default:
            this.draggable = {};
            break;
        }

        this.hoverOn = 'blue';
        this.hoverOff = colour;
    }

    hoverStart()
    {
        this.colour = this.hoverOn;
    }

    hoverEnd()
    {
        this.colour = this.hoverOff;
    }

    getCollider()
    {
        return {x: this.x, y: this.y, width: this.width, height:this.height};
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
      }
}