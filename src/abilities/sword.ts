export default function createSword(player)
{
	
	let sword = add([
		sprite("sword", {
			width: 30, 
			height: 100
		}),
		anchor("bot"),
		rotate(0),
		area(),
		pos(player.pos),
		{
			add()
			{
				this.onCollide("enemy", (enemy) => {
					enemy.health -= 1;
				});
			}
		}
	]);

	let swordAngle = sword.pos.angle(mousePos());

	tween(swordAngle - 180, swordAngle, 1, (a) => sword.angle = a, easings.easeInOutBack).onEnd(() => {
		if (sword.exists())
			destroy(sword);
	});


}