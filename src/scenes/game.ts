import gameLayers from "../main.ts"

import items from "../items.ts";

const CUSTOMERS = ["bag", "bean", "bobo", "btfly", "dino", "ghosty", "gigagantrum", "mark"];

export default function game()
{
    scene("game", () => {

        let withCustomer = false;
        onClick(() => {
            if (withCustomer)
                return;
            addCustomer(1);
            withCustomer = true;
        });
        onUpdate(() => {
            setCursor("default");
        })
        onHoverUpdate("clickable", (clickable) => {
            clickable.scale = vec2(1.5);
            setCursor("pointer");
        });

        onHoverEnd("clickable", (clickable) => {
            clickable.scale = vec2(1);
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

        let arrow = add([
            sprite("arrow", {
                height: 200
            }),
            area(),
            pos(width()/2, height() / 8 * 7),
            anchor("center"),
            z(gameLayers.FRONT_LAYER),
            scale(1),
            "clickable"
        ])

        arrow.flipY = true;






    });
}

function addCustomer(day)
{
    let customerSprite = choose(CUSTOMERS);

    if (chance(1))
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
                        let textLoop = loop(0.075, () => {
                            if (curTextIndex == targetText.length)
                            {
                                let clickable = add([
                                    sprite(items.items[curIndex].sprite, {
                                        width: 150
                                    }),
                                    pos(customer.pos.add(250, 0)),
                                    anchor("center"),
                                    z(gameLayers.BETWEEN_LAYER),
                                    scale(1),
                                    area(),
                                    "clickable"
                                ]);

                                clickable.onClick(() => {
                                    displayInfoBox(items.items[curIndex], vec2(clickable.pos.x + 400, height() / 2));
                                })

                                textLoop.cancel();
                                return;
                            }
                            this.text += targetText[curTextIndex++];
                            play("blip", {volume: 0.5});
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
                            play("blip", {volume: 0.5});
                        });
                    }
                }
            ])
        });
    }
}

function displayInfoBox(item, position)
{
    let infoBox = add([
        sprite("info-box", {
            height: height()
        }),
        pos(position),
        z(gameLayers.FRONT_LAYER),
        anchor("center")
    ]);

    infoBox.add([
        text("Name: " + item.name),
        pos(30, -height() / 3),
        color(BLACK),
        scale(1.1),
        anchor("center")
    ]);

    infoBox.add([
        text("Estimated Worth: " + item.worth),
        scale(0.9),
        color(BLACK),
        pos(30, -height() / 5),
        anchor("center")
    ]);

    infoBox.add([
        text("You are paying: "),
        color(BLACK),
        pos(30, 0),
        anchor("center")
    ])

    let textInputBox = infoBox.add([
        rect(300, 100),
        color(WHITE),
        outline(20, BLACK),
        pos(30, 100),
        anchor("center"),
        area()
    ]);

    let textInputBoxTextWowThisNameIsLong = textInputBox.add([
        text("" + item.worth),
        textInput(false, 10),
        pos(0),
        anchor("center"),
        color(BLACK)
    ])

    textInputBox.onClick(() => {
        textInputBoxTextWowThisNameIsLong.hasFocus = true;
    })


}