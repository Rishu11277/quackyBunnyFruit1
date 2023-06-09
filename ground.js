class Ground {
    constructor(x,y,w,h) {
        var options = {
            isStatic:true
        }
       this.w = w
       this.h = h
       this.image = loadImage("grass.png")
       this.body = Matter.Bodies.rectangle(x,y,this.w,this.h,options)
       World.add(world,this.body)
    }

    display() {
        var pos = this.body.position
        image(this.image,pos.x, pos.y, this.w,this.h)
        //rect(pos.x,pos.y,this.w,this.h)
      
    }

}
