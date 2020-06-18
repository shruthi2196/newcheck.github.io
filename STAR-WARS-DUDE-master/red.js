class Bird {
    constructor(x,y){
        var options ={
            restitution:1,
            friction:1.0
        }
        this.body = Bodies.rectangle(x,y,100,100,options);
        this.width = 110;
        this.height = 100;
        this.image = loadImage("red_play.png");
        World.add(world,this.body)
        //this.body.scale(this.body,5,5);
    }
    display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}