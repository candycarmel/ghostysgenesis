import gameLayers from "./main";

export default function displayMessage(message)
{
    let textInputBox = add([
        rect(500, 200, { radius: 8 }),
        color(WHITE),
        outline(8, BLACK),
        pos(center()),
        anchor("center"),
        area(),
        opacity(1),
        lifespan(1, {fade: 0.2}),
        z(gameLayers.UI_LAYER)
    ]);

    textInputBox.add([
        text(message),
        pos(0),
        anchor("center"),
        color(BLACK),
        opacity(1),
        lifespan(1, {fade: 0.2})
    ])
    return textInputBox;
}