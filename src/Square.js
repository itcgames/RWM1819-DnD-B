class Square{
    constructor(x, y, width, height, colour, sounds, createZones){
        this.draggable = {};
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.soundManager = sounds;
        this.colour = colour;

        switch(createZones)
        {
            case "drag":
            this.draggable = new Draggable(this);
            this.hoverOn = 'blue';
            this.hoverOff = colour;
            break;
            case "drop":
            this.draggable = new DropZone(this);
            this.hoverOn = 'green';
            this.hoverOff = colour;
            break;
            default:
            this.draggable = {};
            break;
        }
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