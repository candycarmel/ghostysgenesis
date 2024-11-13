export default loadStuffs;

function loadStuffs()
{
    loadSprite("bow", "bow.png");
    loadSprite("arrow", "arrow.png");
    loadSprite("knife", "knife.png");
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
    loadSprite("collect", "collect.png");

    loadSprite("heart", "heart.png");

    loadSprite("heart-half-right", "heart-half-right.png");
    loadSprite("heart-half-left", "heart-half-left.png");
    loadSprite("empty-heart", "empty-heart.png");
    loadSprite("axe", "axe.png");
    loadSprite("hole", "tiles/level0/hole.png");


    loadSprite("bats", "enemies/bats.png", {
        sliceX: 15,

        anims: {
            
            "bats": {
                from: 0,
                to: 14
            }
        }
    });

    loadSprite("bat", "enemies/bat.png", {
        sliceX: 9,

        anims: {
            
            "bat": {
                from: 0,
                to: 8
            }
        }
    });

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
    loadSprite("rat", "enemies/karat.png");
    loadSprite("pile", "tiles/level0/pile.png");
}