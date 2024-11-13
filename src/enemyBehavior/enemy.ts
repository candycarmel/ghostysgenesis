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
            }

            if (this.health <= 0)
                destroy(this);

            this.healthLastFrame = this.health;
        }
    }
}