import ccbody from "../components/ccbody";

export default function createHomingOrb(player)
{
	let orb = add([
		sprite("orb", {
			width: 20,
			height: 20
		}),
		anchor("center"),
		area({collisionIgnore: ["player-collider", "level-thing"]}),
		body(),
		ccbody(),
		opacity(),
		lifespan(5, {fade: 2.5}),
		pos(player.pos.add(chance(0.5) ? 100 : -100, 0)),
		offscreen({distance: 50}),
		{
			add()
			{
				this.onCollide("enemy", (enemy) => {
					enemy.health -= 2;
					destroy(this);
				});

				this.onExitScreen(() => {
					destroy(this);
				})
			}
		}
	]);

	let orbCollider = orb.add([
		circle(300),
		anchor("center"),
		color(RED),
		area(),
		pos(0, 0),
		opacity(0),
		{
			add()
			{
				this.onCollideUpdate("enemy", (enemy) => {
					orb.acc = orb.pos.sub(enemy.pos).scale(-100 / orb.pos.sub(enemy.pos).len());
				});
			}
		}
	]);

	return orb;
}