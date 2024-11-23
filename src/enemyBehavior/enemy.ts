import heartPickup from "../components/heartPickup";

export default function enemy(health)
{
    return {
        id: "enemy",
        health,

        healthLastFrame: health,

        add()
        {
            this.use(color());
            this.use(scale(1));
        },

        update()
        {
            if (this.healthLastFrame != this.health)
            {
                this.color = RED
                let tweeny = tween(1.25, 1, 0.2, (s) => this.scale = vec2(s), easings.easeInSine);

                tweeny.onEnd(() => {
                    this.color = null;
                });

                let texty = add([
                    text((this.healthLastFrame - this.health) + ""),
                    color(RED),
                    anchor("center"),
                    pos(this.pos.add(0, -50)),
                    opacity(1),
                ]);

                tween(texty.pos.y, texty.pos.y - 50, 1, (p) => texty.pos.y = p, easings.linear);

                tween(1, 0, 1, (o) => texty.opacity = o, easings.easeOutExpo).onEnd(() => {
                    destroy(texty);
                });
            }

            if (this.health <= 0)
            {
                if (chance(0.125))
                    add([
                        pos(this.pos),
                        heartPickup()
                    ]);
                destroy(this);
            }

            this.healthLastFrame = this.health;
        }
    }
}