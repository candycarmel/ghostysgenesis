import gameLayers from "../main.ts"

import items from "../items.ts";

import displayMessage from "../displayMessage.ts";

const CUSTOMERS = ["bag", "bean", "bobo", "btfly", "dino", "ghosty", "gigagantrum", "mark"];

let coinAmt;

let withCustomer = false;

let curCustomer = null;

let spaceAvailable = 6;

let inventory = [];

let squares = [];

export default function game()
{
    scene("game", () => {
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
        ]);

        arrow.onClick(() => {
            camPos(width() / 2, height() / 2 * 3);
        })

        arrow.flipY = true;


        add([
            sprite("coin", {
                width: 100,
            }),
            pos(75, 75),
            anchor("center"),
            z(gameLayers.UI_LAYER),
            fixed()
        ]);

        coinAmt = add([
            text("50"),
            pos(200, 75),
            color(BLACK),
            anchor("center"),
            z(gameLayers.UI_LAYER),
            {
                coins: 50,

                update()
                {
                    this.text = "" + this.coins;
                }
            },
            fixed()

        ]);








        let inventoryPage = add([
            pos(0, height()),
        ]);

        let otherArrow = inventoryPage.add([
            sprite("arrow", {
                height: 200
            }),
            area(),
            pos(width()/2, height() / 8),
            anchor("center"),
            z(gameLayers.FRONT_LAYER),
            scale(1),
            "clickable"
        ]);

        otherArrow.onClick(() => {
            camPos(width() / 2, height() / 2);
        })


        inventoryPage.add([
            sprite("items-background", {
                width: width()
            }),
        ])

        squares.push(inventoryPage.add([
            sprite("square", {
                width: 200,
            }),
            pos(width() / 4, height() / 3),
            anchor("center"),
        ]))

        squares.push(inventoryPage.add([
            sprite("square", {
                width: 200,
            }),
            pos(width() / 2, height() / 3),
            anchor("center"),
        ]))

        squares.push(inventoryPage.add([
            sprite("square", {
                width: 200,
            }),
            pos(width() / 4 * 3, height() / 3),
            anchor("center"),
        ]))

        squares.push(inventoryPage.add([
            sprite("square", {
                width: 200,
            }),
            pos(width() / 4, height() / 3 * 2),
            anchor("center"),
        ]))

        squares.push(inventoryPage.add([
            sprite("square", {
                width: 200,
            }),
            pos(width() / 2, height() / 3 * 2),
            anchor("center"),
        ]))

        squares.push(inventoryPage.add([
            sprite("square", {
                width: 200,
            }),
            pos(width() / 4 * 3, height() / 3 * 2),
            anchor("center"),
        ]))








    });
}

function addCustomer(day)
{
    let customerSprite = choose(CUSTOMERS);

    if (chance(0.4) || spaceAvailable == 6)
    {
        // customer is selling to you.

        let curIndex = randi(0, items.items.length);

        while(true)
        {
            if (chance((items.items[curIndex].rarity + (items.items[curIndex].rarity * day * 0.2)) / 100))
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

        curCustomer = customer;

        let charTween = tween(width(), width()/2, 1.5, (p) => customer.pos.x = p, easings.linear);

        charTween.onEnd(() => {
            let speechSprite = add([
                sprite("speech", {
                    width: width()
                }),
                pos(0, 0),
                z(gameLayers.FRONT_LAYER)
            ]);

            let targetText = "How much would you be willing to pay for this " + items.items[curIndex].name + "?";

            let curTextIndex = 0;

            let speechText = add([
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
                                    "clickable",
                                    "item-sprite",
                                    {
                                        clickBehavior: null
                                    }
                                ]);

                                clickable.clickBehavior = () => {
                                    let info = displayInfoBox(items.items[curIndex], vec2(clickable.pos.x + 400, height() / 2), false, true);
                                    customer.on("resolve-customer", (rigged, payed) => {
                                        if (!withCustomer)
                                            return;
                                        if (rigged == 0)
                                        {
                                            withCustomer = false;
                                            coinAmt.coins -= payed;
                                            destroy(info);
                                            destroy(speechSprite);

                                            if (payed > 0 && spaceAvailable > 0)
                                            {
                                                inventory.push(add([
                                                    sprite(items.items[curIndex].sprite, {
                                                        width: 150,
                                                    }),
                                                    pos(squares[inventory.length].pos),
                                                    anchor("center"),
                                                    area(),
                                                    "clickable",
                                                    {
                                                        add()
                                                        {
                                                            this.onClick(() => {
                                                                displayInfoBox(items.items[curIndex], vec2(this.pos.x + 400, height() / 2), inventory.length < 4, false);
                                                            });
                                                        }
                                                    }
                                                ]));
                                            }
                                            let charTween = tween(width() / 2, -800, 1, (p) => customer.pos.x = p, easings.linear);

                                            charTween.onEnd(() => {
                                                destroy(customer);
                                            });
                                            destroy(speechText);
                                            destroy(clickable);
                                        } else if (rigged == 2) {
                                            withCustomer = false;
                                            destroy(info);
                                            speechText.text = "You're practically scamming me!";
                                            let charTween = tween(width() / 2, -800, 1, (p) => customer.pos.x = p, easings.linear);

                                            charTween.onEnd(() => {
                                                destroy(customer);
                                                destroy(speechText);
                                                destroy(speechSprite);
                                            });
                                            destroy(clickable);
                                        } else {
                                            withCustomer = false;
                                            destroy(info);
                                            coinAmt.coins -= payed;
                                            speechText.text = "LETS GOOO";
                                            let charTween = tween(width() / 2, -800, 1, (p) => customer.pos.x = p, easings.linear);

                                            charTween.onEnd(() => {
                                                destroy(customer);
                                                destroy(speechText);
                                                destroy(speechSprite);
                                            });
                                            destroy(clickable);
                                        }
                                    });
                                };

                                textLoop.cancel();
                                return;
                            }
                            this.text += targetText[curTextIndex++];
                            play("blip", {volume: 0.5});
                        });

                        onClick("item-sprite", (itemSprite) => {
                            if (!itemSprite.clickBehavior)
                                return;
                            itemSprite.clickBehavior();
                        })
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

function displayInfoBox(item, position, flipY, buy)
{
    if (buy)
    {
        let infoBox = add([
            sprite("info-box", {
                height: height()
            }),
            pos(position),
            z(gameLayers.FRONT_LAYER),
            anchor("center")
        ]);

        infoBox.flipY = flipY;

        infoBox.add([
            text("Name: " + item.name),
            pos(30, -height() / 3),
            color(BLACK),
            scale(1),
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
            scale(0.9),
            color(BLACK),
            pos(30, 0),
            anchor("center")
        ])

        let textInputBox = infoBox.add([
            rect(300, 100, { radius: 8 }),
            color(WHITE),
            outline(4, BLACK),
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
        ]);

        textInputBox.onClick(() => {
            textInputBoxTextWowThisNameIsLong.hasFocus = true;
        });

        infoBox.add(addButton("submit", vec2(30, 300), () => {
            let value = parseInt(textInputBoxTextWowThisNameIsLong.text);
            let rigged = 0;
            if (!value)
                return;

            if (spaceAvailable == 0)
            {
                displayMessage("Not enough space.");
                return;
            }

            if (value > coinAmt.coins)
            {
                displayMessage("Not enough money.");
                return;
            }

            if (value > item.worth + item.worth * 0.1)
            {
                rigged = 1;
            } else if (value < item.worth - item.worth * 0.1)
            {
                rigged = 2;
            }
            curCustomer.trigger("resolve-customer", rigged, value);
        }));

        infoBox.add(addButton("don\'t want it", vec2(30, 400), () => {
            curCustomer.trigger("resolve-customer", 0, 0);
        }));

        return infoBox;
    } else {
        let infoBox = add([
            sprite("info-box", {
                height: height()
            }),
            pos(position),
            z(gameLayers.FRONT_LAYER),
            anchor("center")
        ]);

        infoBox.flipY = flipY;

        infoBox.add([
            text("Name: " + item.name),
            pos(30, -height() / 3),
            color(BLACK),
            scale(1),
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
            scale(0.9),
            color(BLACK),
            pos(30, 0),
            anchor("center")
        ])

        let textInputBox = infoBox.add([
            rect(300, 100, { radius: 8 }),
            color(WHITE),
            outline(4, BLACK),
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
        ]);

        textInputBox.onClick(() => {
            textInputBoxTextWowThisNameIsLong.hasFocus = true;
        });

        infoBox.add(addButton("sell", vec2(30, 300), () => {
            
        }));

        return infoBox;
    }
}

function addButton(txt, p, f) {
    // add a parent background object
    const btn = make([
        rect(300, 80, { radius: 8 }),
        pos(p),
        area(),
        scale(1),
        color(WHITE),
        anchor("center"),
        outline(4),
    ]);

    // add a child object that displays the text
    btn.add([
        text(txt),
        anchor("center"),
        color(0, 0, 0),
    ]);

    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    btn.onHoverUpdate(() => {
        const t = time() * 10;
        btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7);
        btn.scale = vec2(1.2);
        setCursor("pointer");
    });

    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    btn.onHoverEnd(() => {
        btn.scale = vec2(1);
        btn.color = rgb();
    });

    // onClick() comes from area() component
    // it runs once when the object is clicked
    btn.onClick(f);

    return btn;
}