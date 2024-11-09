export default function cooldown(time, spriteName, abilityCondition, ability, player)
{
    return {
        id: "cooldown",
        cooldownTime: time,
        waitTime: 0,
        cooldownObj: null,

        update()
        {
            if (abilityCondition() && this.waitTime == 0)
            {
                ability(player);
                this.waitTime = this.cooldownTime;
            }

            if (this.waitTime > 0)
            {
                if (this.cooldownObj == null)
                {
                    let totalHeight = get("cooldown-popup").length * 80 + 80;
                    let cooldownBack = add([
                        sprite("cooldown", {
                            height: 60,
                            width: 280
                        }),
                        pos(20, height() - totalHeight),
                        z(10),
                        fixed(),
                        "cooldown-popup",
                        {
                            cooldownOrder: get("cooldown-popup").length
                        }
                    ]);

                    cooldownBack.on("cooldown-done", (opts) => {
                        if (cooldownBack.cooldownOrder >= opts.cooldownOrder)
                        {
                            cooldownBack.cooldownOrder--;
                            cooldownBack.pos.y += 80;
                        }
                    });

                    cooldownBack.add([
                        sprite(spriteName, {
                            height: 60
                        }),
                        pos(60, 30),
                        anchor("center"),
                    ]);

                    cooldownBack.add([
                        rect(120, 35, {radius: 20}),
                        pos(140, 30),
                        anchor("left"),
                        "cooldown-rect"
                    ]);

                    this.cooldownObj = cooldownBack;
                } else {
                    this.cooldownObj.get("cooldown-rect")[0].width = map(this.waitTime, 0, this.cooldownTime, 0.01, 120);
                }
                this.waitTime -= dt();
            } else {
                this.waitTime = 0;
                if (this.cooldownObj != null)
                {
                    let cooldownBack = this.cooldownObj;
                    destroy(this.cooldownObj);  

                    get("cooldown-popup").forEach((thing) => {
                        thing.trigger("cooldown-done", {cooldownOrder: cooldownBack.cooldownOrder});
                    });
                    this.cooldownObj = null;
                }
            }
        }
    }
}