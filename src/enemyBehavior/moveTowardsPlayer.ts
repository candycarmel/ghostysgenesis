export default function moveTowardsPlayer(speed, player)
{
	return {
		id: "move-to-player",

		add()
		{

		},

		update()
		{
			this.pos = this.pos.add(this.pos.sub(player.pos).unit().scale(-speed).scale(dt()));
		}
	}
}