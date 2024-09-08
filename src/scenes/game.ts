import gameLayers from "../main.ts"

export default function game()
{
    scene("game", () => {

        let beany = add([
            sprite("bean", {
                width: 400,
            }),
            pos(width(), height() - 400),
            anchor("center"),
            z(gameLayers.BETWEEN_LAYER)
        ]);
        onClick(() => {
            let charTween = tween(width(), width()/2, 1.5, (p) => beany.pos.x = p, easings.linear);

            charTween.onEnd(() => {
                add([
                    sprite("speech", {
                        width: width()
                    }),
                    pos(0, 0),
                    z(gameLayers.FRONT_LAYER)
                ])
            });
        })

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