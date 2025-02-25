export default function createDaggers(player)
{
  let toMouseAngle = toWorld(mousePos()).angle(player.pos);
  
  for (let i = -5; i <= 5; i += 5)
  {
    add([
      sprite("knife", {
        width: 40, 
        height: 10
      }),
      pos(player.pos),
      anchor("center"),
      area(),
      rotate(toMouseAngle + i),
      move(toMouseAngle + i, 500),
      
      {
        health: 2,

        add()
        {
            this.onCollide("enemy", (enemy) => {
                enemy.health -= 0.5;
                this.health--;
                play("enemyHit");

                if (this.health == 0)
                  destroy(this);
            });
        }
      }
    ]);
  }
}