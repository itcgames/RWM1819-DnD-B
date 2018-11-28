class Square{
    constructor(x, y, width, height, colour, sounds, createZones){
        this.draggable = {};
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.soundManager = sounds;
<<<<<<< HEAD
        this.colour = colour;
=======
>>>>>>> aba063dc9fa340c57ceee4607ff49861790e20c1

        switch(createZones)
        {
            case "drag":
            this.draggable = new Draggable(this);
<<<<<<< HEAD
            this.hoverOn = 'blue';
            this.hoverOff = colour;
            break;
            case "drop":
            this.draggable = new DropZone(this);
            this.hoverOn = 'green';
            this.hoverOff = colour;
=======
            break;
            case "drop":
            this.draggable = new DropZone(this);
>>>>>>> aba063dc9fa340c57ceee4607ff49861790e20c1
            break;
            default:
            this.draggable = {};
            break;
        }
<<<<<<< HEAD
=======

        this.hoverOn = 'blue';
        this.hoverOff = colour;
>>>>>>> aba063dc9fa340c57ceee4607ff49861790e20c1
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