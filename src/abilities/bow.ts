export default function createBow(player)
{
  let heldFor = 0;
  
  
  let scaleRect = add([
    rect(100, 20, {
      radius: 15,
    }),
    anchor("center"),
    pos(player.pos),
    rotate(0),
    color(BLACK),
    opacity(1),
    scale(),
  ]);
  
  let scaledRect = scaleRect.add([
    rect(5, 10, {
      radius: 15,
    }),
    anchor("left"),
    pos(-45, 0),
    color(YELLOW),
    opacity(1),
  ]);

  let bow = add([
    sprite("bow", {
        width: 10,
        height: 50
    }),
    pos(player.pos),
    rotate(0),
    anchor("center"),
  ])
  
  let updateThing = onUpdate(() => {
    
    let toMouseAngle = mousePos().angle(player.pos);

    bow.pos = player.pos.add(Vec2.fromAngle(toMouseAngle).scale(30));
    bow.angle = toMouseAngle;
    
    debug.log(toMouseAngle);
    
    scaleRect.pos = player.pos.add(Vec2.fromAngle(toMouseAngle).normal().scale(35 * ((toMouseAngle < -90 && toMouseAngle > -180) || (toMouseAngle < 180 && toMouseAngle > 90) ? -1 : 1)).add(Vec2.fromAngle(toMouseAngle).scale(50)));
    
    scaleRect.angle = toMouseAngle;
    
    if (isMouseDown())
    {
      heldFor += dt();
      heldFor = clamp(heldFor, 0, 1.5);
      scaledRect.width = map(heldFor, 0, 1.5, 5, 90);
    } else {

      destroy(bow);

      tween(1, 1.5, 0.5, (s) => {
        scaleRect.scale = vec2(s);
      }, easings.easeOutCubic);
      
      tween(1, 0, 0.5, (o) => {
        scaleRect.opacity = o;
        scaledRect.opacity = o;
      }, easings.easeOutCubic);
      
      wait(0.5, () => {
        destroy(scaleRect);
      });
      
      add([
        sprite("arrow", {
            width: 40, 
            height: 5
        }),
        pos(player.pos),
        anchor("center"),
        area(),
        rotate(toMouseAngle),
        {
          speed: heldFor * 1200,
          
          update()
          {
            this.speed -= 800 * dt();
            
            this.pos = this.pos.add(Vec2.fromAngle(toMouseAngle).scale(this.speed * dt()));
            
            if (this.speed < 0)
            {
                destroy(this);
            }
          },


          add()
          {
            this.onCollide("enemy", (enemy) => {
                let damageDone = Math.floor(this.speed / 800);

                enemy.health -= damageDone;

                this.speed -= 300;
            });
          }
        }
      ]);
      
      updateThing.cancel();
    }
  });
  
}