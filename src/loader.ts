export default loadStuffs;

function loadStuffs()
{
    loadSprite("ghosty", "ghosty-player.png", {
        sliceX: 7,

        anims: {
            "hover": {
                from: 0,
                to: 6,
                loop: true
            }
        }
    });

    loadSprite("sword", "sword.png");
    loadSprite("cooldown", "cooldown.png");

    loadSprite("coffin", "tiles/level0/coffin.png");
    loadSprite("dirt0", "tiles/level0/dirt0.png");
    loadSprite("dirt1", "tiles/level0/dirt1.png");
    loadSprite("dirt3", "tiles/level0/dirt3.png");
    loadSprite("fence", "tiles/level0/fence.png");
    loadSprite("gate", "tiles/level0/gate.png");
    loadSprite("gate-open", "tiles/level0/gate-open.png");
    loadSprite("grave", "tiles/level0/grave.png");
    loadSprite("bones", "tiles/level0/bones.png");

    loadSprite("bone", "enemies/bone.png");
    loadSprite("skeleton", "enemies/skeleton.png", {
        sliceX: 10,

        anims: {
            "jump": {
                from: 0,
                to: 9,

                loop: true
            }
        }
    });
}