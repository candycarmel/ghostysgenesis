export default function shootAtPlayer(player, projectile, interval, speed, homing = false)
{
    return {
        id: "shoot-at-player",

        require: ["timer"],

        add()
        {
            let enemy = this;

            enemy.loop(interval, () => {
                if (!homing)
                    add([
                        ...projectile(),
                        move(player.pos.angle(enemy.pos), speed)
                    ]);
                else
                    add([
                        ...projectile(),
                        {
                            update()
                            {
                                this.pos = this.pos.add(Vec2.fromAngle(player.pos.angle(enemy.pos)).scale(speed * dt()));
                            }
                        }
                    ]);
            })
        }
    }
}