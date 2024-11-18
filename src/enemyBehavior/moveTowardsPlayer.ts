export default function moveTowardsPlayer(speed, player, cooldown = 0)
{
	return {
		id: "move-to-player",

		cooldownCount: 0,
		onCooldown: true,

		add()
		{

		},

		update()
		{
			if (this.onCooldown)
			{
				this.cooldownCount += dt();
				if (this.cooldownCount > cooldown)
				{
					this.onCooldown = false;
				}
			} else {
				this.cooldownCount -= dt();
				this.pos = this.pos.add(this.pos.sub(player.pos).unit().scale(-speed).scale(dt()));

				if (this.cooldownCount < 0)
				{
					this.onCooldown = true;
				}
			}
		}
	}
}