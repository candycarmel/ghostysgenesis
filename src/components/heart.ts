import ccbody from "./ccbody";

export default function heart()
{
    return {
        id: "heart",

        lost: false,

        add()
        {
            this.use(sprite("heart", {
                width: 39 * 2,
                height: 34 * 2,
            }));
            this.use(anchor("center"));
            this.use(fixed());
            this.use(z(3));

            let position = vec2((get("heart").length - 1) * (39 * 2 + 20 * 2) + 39 * 2 + 20 * 2, 34 * 2 + 20 * 2);
            this.pos = position;
            
        },


        hurt()
        {
            this.lost = true;

            this.use(sprite("empty-heart", {
                width: 39 * 2,
                height: 34 * 2
            }));

            add([
                pos(this.pos),
                anchor("right"),
                sprite("heart-half-left", {
                    width: 19 * 2,
                    height: 34 * 2
                }),
                area({collisionIgnore: ["*"]}),
                fixed(),
                body(),
                rotate(0),
                ccbody(),
                z(3),
                offscreen({destroy: true}),
                {
                    add()
                    {
                        this.vel.y = -randi(150, 300);

                        this.acc.y = 500;
                        
                        this.vel.x = -60;
                    },

                    update()
                    {
                        this.angle -= 120 * dt();
                    }
                }
            ]);

            add([
                pos(this.pos),
                anchor("left"),
                sprite("heart-half-right", {
                    width: 20 * 2,
                    height: 34 * 2
                }),
                area({collisionIgnore: ["*"]}),
                fixed(),
                body(),
                rotate(0),
                ccbody(),
                z(3),
                offscreen({destroy: true}),
                {
                    add()
                    {   
                        this.vel.y = -randi(150, 300);

                        this.acc.y = 500;
                        
                        this.vel.x = 60;
                    },

                    update()
                    {
                        this.angle += 120 * dt();
                    }
                }
            ]);
        },


        heal()
        {
            this.lost = false;

            this.use(sprite("heart", {
                width: 39 * 2,
                height: 34 * 2,
            }));
        }
    }
}