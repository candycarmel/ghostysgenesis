export default function dialogue(texty, spritey)
{
    let curIndex = 0;
    let back = add([
        sprite("cooldown", {
            width: width() - 100,
            height: 100
        }),
        pos(width() / 2, height() - 50),
        anchor("center"),
        fixed()
    ]);


    back.add([
        sprite(spritey, {
            height: 64
        }),
        pos(-width() / 2 + 150, 0),
        anchor("center"),
    ]);

    let textyy = back.add([
        text(""),

        pos(-width() / 2 + 200, 0),
        anchor("left"),
        timer(),
        color(BLACK)
    ]);

    let loopy = textyy.loop(0.1, () => {
        if (texty.length == curIndex)
        {
            loopy.cancel();
            wait(texty.length / 20, () => {
                destroy(back);
            })
            return;
        }
        textyy.text += texty[curIndex++];
    });

    return texty.length * 0.1 + texty.length / 20;
}