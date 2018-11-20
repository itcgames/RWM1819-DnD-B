class Square{
    constructor(x, y, width, height, colour){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.colour = colour;
    }

    getObject()
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