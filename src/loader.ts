export default loadStuffs;

function loadStuffs()
{
    loadSprite("bow", "bow.png");
    loadSprite("arrow", "arrow.png");
    loadSprite("knife", "knife.png");
    loadSprite("fountain", "fountain.png");
    loadSprite("gigagantrum", "enemies/gigagantrum.png");
    loadSprite("rock", "enemies/rock.png");
    loadSprite("ghosty-head", "ghosty-head.png");
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

    loadSprite("coffin", "tiles/level0/coffin.png", {
        sliceX: 9,

        anims: {
            "open": {
                from: 0,
                to: 6
            },

            "stay": {
                from: 7,
                to: 8,

                loop: true
            }
        }
    });
    loadSprite("dirt0", "tiles/level0/dirt0.png");
    loadSprite("dirt1", "tiles/level0/dirt1.png");
    loadSprite("dirt3", "tiles/level0/dirt3.png");
    loadSprite("fence", "tiles/level0/fence.png");
    loadSprite("gate", "tiles/level0/gate.png");
    loadSprite("gate-next", "tiles/level1/gate.png");
    loadSprite("gate-open", "tiles/level0/gate-open.png");
    loadSprite("gate-open-next", "tiles/level1/gate-open.png");
    loadSprite("grave", "tiles/level0/grave.png");
    loadSprite("grave-next", "tiles/level1/grave.png");
    loadSprite("bones", "tiles/level0/bones.png");
    loadSprite("bones-next", "tiles/level1/bones.png");
    loadSprite("collect", "collect.png");

    loadSprite("heart", "heart.png");

    loadSprite("heart-half-right", "heart-half-right.png");
    loadSprite("heart-half-left", "heart-half-left.png");
    loadSprite("empty-heart", "empty-heart.png");
    loadSprite("axe", "axe.png");
    loadSprite("hole", "tiles/level0/hole.png");
    loadSprite("hole-next", "tiles/level1/hole.png");


    loadSprite("bats", "enemies/batsog.png", {
        sliceX: 15,

        anims: {
            
            "bats": {
                from: 0,
                to: 14,

                loop: true
            }
        }
    });

    loadSprite("bats-next", "enemies/batsog.png", {
        sliceX: 15,

        anims: {
            
            "bats": {
                from: 0,
                to: 14,

                loop: true
            }
        }
    });

    loadSprite("bat", "enemies/bat.png", {
        sliceX: 9,

        anims: {
            
            "bat": {
                from: 0,
                to: 8,

                loop: true
            }
        }
    });

    loadSprite("bat-next", "enemies/bat.png", {
        sliceX: 9,

        anims: {
            
            "bat": {
                from: 0,
                to: 8,

                loop: true
            }
        }
    });

    loadSprite("zombean", "enemies/zombean.png");

    loadSprite("bone", "enemies/boneog.png");
    loadSprite("skeleton", "enemies/skeletonog.png", {
        sliceX: 10,

        anims: {
            "jump": {
                from: 0,
                to: 9,

                loop: true
            }
        }
    });
    loadSprite("rat", "enemies/karatog.png");
    loadSprite("pile", "tiles/level0/pile.png");
    loadSprite("pile-next", "tiles/level1/pile.png");


    loadSprite("bone-next", "enemies/bone.png");
    loadSprite("karat-next", "enemies/karat.png");
    loadSprite("skeleton-next", "enemies/skeleton.png", {
        sliceX: 10,

        anims: {
            "jump": {
                from: 0,
                to: 9,

                loop: true
            }
        }
    });

    loadSprite("dirt0-next", "tiles/level1/tiled0.png");
    loadSprite("dirt1-next", "tiles/level1/tiled1.png");
    loadSprite("dirt3-next", "tiles/level1/tiled2.png");
    loadSprite("fence-next", "tiles/level1/brick.png");

    loadSprite("orb", "orb.png");

    loadSprite("church", "church.png");

    loadSprite("cutscene0", "cutscene1.png");
    loadSprite("bean-pope", "bean-pope.png");

    loadSprite("skeleton-thing", "skullthing.png");

    loadSprite("amulet", "amulet.png");

    loadSprite("church-next", "church-next.png");

    loadSprite("endscreen", "endscreen.png");

    // loadSprite("coffin", "tiles/level0/coffin.png")

    loadSprite("startscreen", "startscreen.png");

    loadSprite("banner", "banner.png");

    loadSound("music", "music.mp3");
    loadSound("boss", "boss.mp3");

    loadSound("gate", "gate.mp3");

    loadSound("hit", "hitHurt.wav");

    loadSound("enemyHit", "enemyHit.wav");

    loadSound("heal", "heal.wav");
}