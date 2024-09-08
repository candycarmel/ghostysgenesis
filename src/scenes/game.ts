import gameLayers from "../main.ts"

import items from "../items.ts";

const CUSTOMERS = ["bag", "bean", "bobo", "btfly", "dino", "ghosty", "gigagantrum", "mark"];

export default function game()
{
    scene("game", () => {
        onClick(() => {
            addCustomer(1);
        });

        add([
            sprite("background-back", {
                width: width(),
                height: height(),
            }),
            pos(0, 0),
            z(gameLayers.BACK_BACKGROUND_LAYER)
        ]);

        add([
            sprite("background-front", {
                width: width(),
                height: height(),
            }),
            pos(0, 0),
            z(gameLayers.FRONT_BACKGROUND_LAYER)
        ]);

        add([
            sprite("shop", {
                width: width(),
                height: height(),
            }),
            pos(0, 0),
            z(gameLayers.SHOP_LAYER)
        ]);






    });
}

function addCustomer(day)
{
    let customerSprite = choose(CUSTOMERS);

    if (chance(0.4))
    {
        // customer is selling to you.

        let curIndex = randi(0, items.items.length);

        while(true)
        {
            if (chance((items.items[curIndex].rarity * day) / 100))
                break;
            curIndex = (curIndex + 1) % items.items.length;
        }

        let customer = add([
            sprite(customerSprite, {
                width: 400
            }),
            pos(width(), height() - 400),
            anchor("center"),
            z(gameLayers.BETWEEN_LAYER)
        ]);

        let charTween = tween(width(), width()/2, 1.5, (p) => customer.pos.x = p, easings.linear);

        charTween.onEnd(() => {
            add([
                sprite("speech", {
                    width: width()
                }),
                pos(0, 0),
                z(gameLayers.FRONT_LAYER)
            ]);

            let targetText = "How much would you be willing to pay for this " + items.items[curIndex].name + "?";

            let curTextIndex = 0;

            add([
                text(""),
                color(BLACK),
                z(gameLayers.FRONT_LAYER),
                anchor("center"),
                pos(width() / 2, height() / 8),
                scale(1.5),
                {
                    add()
                    {
                        let textLoop = loop(0.1, () => {
                            if (curTextIndex == targetText.length)
                            {
                                textLoop.cancel();
                                return;
                            }
                            this.text += targetText[curTextIndex++];
                            play("blip");
                        });
                    }
                }
            ])
        });
    } else {
        // you sell to customer

        let customer = add([
            sprite(customerSprite, {
                width: 400
            }),
            pos(width(), height() - 400),
            anchor("center"),
            z(gameLayers.BETWEEN_LAYER)
        ]);

        let charTween = tween(width(), width()/2, 1.5, (p) => customer.pos.x = p, easings.linear);

        charTween.onEnd(() => {
            add([
                sprite("speech", {
                    width: width()
                }),
                pos(0, 0),
                z(gameLayers.FRONT_LAYER)
            ]);

            let targetText = "I'd like to buy something.";

            let curTextIndex = 0;

            add([
                text(""),
                color(BLACK),
                z(gameLayers.FRONT_LAYER),
                anchor("center"),
                pos(width() / 2, height() / 8),
                scale(2),
                {
                    add()
                    {
                        let textLoop = loop(0.1, () => {
                            if (curTextIndex == targetText.length)
                            {
                                textLoop.cancel();
                                return;
                            }
                            this.text += targetText[curTextIndex++];
                            play("blip");
                        });
                    }
                }
            ])
        });
    }
}