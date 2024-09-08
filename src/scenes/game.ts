import gameLayers from "../main.ts"

export default function game()
{
    scene("game", () => {

        let bean = add([
            sprite("bean", {
                width: 100,
                height: 100,
            }),
            pos(width(), height() - 200),
            anchor("center"),
            z(gameLayers.BETWEEN_LAYER)
        ]);

        tween(width(), 0, 2, (p) => bean.pos.x = p, easings.linear);

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