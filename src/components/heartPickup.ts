export default function heartPickup()
{
    return {
        id: "heart-pickup",

        add()
        {
            this.use(sprite("heart", {
                width: 39 * 0.75,
                height: 34 * 0.75
            }));

            this.use(area());

            this.use(body());

            this.use(anchor("center"))

            this.onCollide("player-collider", (player) => {
                player.heal();
                destroy(this);
            })
        }
    }
}