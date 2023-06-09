class Link {
  constructor(object1, object2) {
    var lastLink = object1.body.bodies.length - 2

    this.link = Constraint.create({
        bodyA: object1.body.bodies[lastLink],
        pointA: {x:0,y:0}, 
        bodyB: object2,
        pointB:{x:0,y:0}, 
        length:-10, 
        stiffness: 1
    })

    

    World.add(engine.world, this.link)
  }

  detach() {
    World.remove(engine.world, this.link)
  }
}