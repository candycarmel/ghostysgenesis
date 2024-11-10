import cooldown from "./cooldown";

export default function collectable(info, ability, player)
{
    return {
        id: "collectable",

        add()
        {
            let collectable = this;


            this.onKeyPress("e", () => {
                // player.add([
                //     pos(0),
                //     cooldown(1, "sword", () => {return isMousePressed()}, createSword, player)
                // ]);

                // player.add([
                //     pos(0),
                //     cooldown(2, "sword", () => {return isMousePressed()}, createSword, player)
                // ]);

                // player.add([
                //     pos(0),
                //     cooldown(3, "bean", () => {return isKeyPressed("f")}, homingOrbs, player)
                // ]);

                if (player.selectedCollectable != collectable || player.currentlyCollecting)
                    return;

                player.currentlyCollecting = true;
                

                let background = add([
                    sprite("collect", {
                        width: 800,
                        height: 1000
                    }),
                    anchor("center"),
                    pos(center()),
                    z(2),
                    fixed(),
                    scale(0.01)
                ]);


                background.add([
                    text(info.itemName),
                    pos(0, -400),
                    color(BLACK),
                    anchor("center"),
                    scale(3)
                ]);


                background.add([
                    sprite(info.spriteName, {
                        height: 250
                    }),
                    pos(0, -100),
                    anchor("center"),
                ]);


                background.add([
                    text(info.itemDescription, {
                        align: "center",
                        width: 800
                    }),
                    color(BLACK),
                    pos(0, 200),
                    anchor("center")
                ]);

                background.add([
                    text("lmb to continue"),
                    color(BLACK),
                    pos(0, 475),
                    anchor("bot")
                ]);

                let onClickBackground = onClick(() => {
                    destroy(background);
                    destroy(this);

                    player.add([
                        cooldown(ability.time, ability.spriteName, ability.abilityCondition, ability.ability, player)
                    ]);

                    destroyAll("collect-text");

                    onClickBackground.cancel();
                });

                tween(0.01, 1, 1, (s) => background.scale = vec2(s), easings.easeOutBack);
            });
            this.add([
                rect(100, 100),
                pos(0, 0),
                anchor("center"),
                area(),
                opacity(0),
                {
                    add()
                    {
                        this.onCollide("player-collider", () => {
                            destroyAll("collect-text");

                            add([
                                text("Press E to pick up!"),
                                pos(collectable.pos.sub(0, 50)),
                                anchor("center"),
                                color(BLACK),
                                scale(0.5),
                                z(1),
                                "collect-text"
                            ]);

                            player.selectedCollectable = collectable;
                        });


                        this.onCollideEnd("player-collider", () => {
                            destroyAll("collect-text");
                        });
                    }
                }
            ]);
        }
    }
}