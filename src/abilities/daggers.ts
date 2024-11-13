export default function createDaggers(player)
{
  let toMouseAngle = mousePos().angle(player.pos);
  
  for (let i = -10; i <= 10; i += 10)
  {
    add([
      sprite("knife", {
        width: 80, 
        height: 20
      }),
      pos(player.pos),
      anchor("center"),
      area(),
      rotate(toMouseAngle + i),
      move(toMouseAngle + i, 1000),
      
      {
        add()
        {
            this.onCollide("enemy", (enemy) => {
                enemy.health--;
            });
        }
      }
    ]);
  }
}