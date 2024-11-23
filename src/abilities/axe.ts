export default function createAxe(player)
{
	
	let axe = player.add([
		sprite("axe", {
			width: 58 * 1.25, 
			height: 70 * 1.25
		}),
		anchor("bot"),
		rotate(0),
		area(),
        z(-1),
		pos(),
		{
			add()
			{
                player.PLAYER_SPEED = 100;

				this.onCollide("enemy", (enemy) => {
					enemy.health -= 1;
					play("enemyHit");
				});
			}
		}
	]);

	let axeAngle = axe.pos.angle(mousePos());

	tween(axeAngle - 180, axeAngle * 8, 3, (a) => axe.angle = a, easings.easeInOutBack).onEnd(() => {
		if (axe.exists())
			destroy(axe);

        player.PLAYER_SPEED = 150;
	});


}