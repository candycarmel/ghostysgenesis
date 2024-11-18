// @ts-nocheck

import dialogue from "./dialogue";
import enemy from "./enemyBehavior/enemy";
import moveTowardsPlayer from "./enemyBehavior/moveTowardsPlayer";
import shootAtPlayer from "./enemyBehavior/shootAtPlayer";
import spawnEnemy from "./enemyBehavior/spawnEnemy";

export default [
    {
        // amt of enemies that should spawn / max enemies that can spawn
        enemyChance: 5 / 100, 
        spawners: ["d"], 
        spawnerChances: [1],

        specialRoom: false
    },

    {
        // amt of enemies that should spawn / max enemies that can spawn
        enemyChance: 10 / 100, 
        spawners: ["t"], 
        spawnerChances: [1],

        specialRoom: false
    },

    {
        enemyChance: 10 / 100,
        spawners: ["t", "b"],
        spawnerChances: [0.75, 0.25],

        specialRoom: false
    },

    {
        specialRoom: true,

        // 12 high, 24 side to side
        level: [
            "fffffffffffghfffffffffff",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddb ddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "ffffffffffffffffffffffff"
        ],

        tiles: {
            "f": () => [
                sprite("fence", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                area(),
                body({isStatic: true}),
                "level-thing"
            ],

            "d": () => [
                sprite(chance(0.33) ? "dirt0" : chance(0.5) ? "dirt1" : "dirt3", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                "level-thing"
            ],


            "g": () => [
                sprite("gate", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                area(),
                body({isStatic: true}),
                {
                    alreadyOpened: false,

                    update()
                    {
                        if (!this.alreadyOpened)
                        {
                            this.alreadyOpened = true;
                            // this.sprite = "gate-open";
                            this.use(sprite("gate-open", {
                                width: 64,
                                height: 64
                            }));
                            this.unuse("body");
                        }
                    }
                },
                "level-thing",
                "gate"
            ],

            "h": () => [
                sprite("gate", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                area(),
                body({isStatic: true}),
                {
                    alreadyOpened: false,

                    add()
                    {
                        this.flipX = true;
                    },
                    update()
                    {
                        if (!this.alreadyOpened)
                        {
                            this.alreadyOpened = true;
                            // this.sprite = "gate-open";
                            this.use(sprite("gate-open", {
                                width: 64,
                                height: 64
                            }));
                            this.flipX = true;
                            this.unuse("body");
                        }
                    }
                },
                "level-thing",
                "gate"
            ],

            "b": () => [
                sprite("fountain", {
                    width: 128,
                    height: 256
                }),
                pos(0, 64),
                anchor("botleft"),
                area(),
                body({isStatic: true}),

                {
                    add()
                    {
                        dialogue("this is disgusting", "ghosty-head");
                    }
                }
            ]
        }
    },

    {
        enemyChance: 7 / 100,
        spawners: ["b"],
        spawnerChances: [1],

        specialRoom: false
    },

    {
        enemyChance: 15 / 100,
        spawners: ["t", "b"],
        spawnerChances: [0.75, 0.25],

        specialRoom: false
    },

    {
        enemyChance: 20 / 100,
        spawners: ["p"],
        spawnerChances: [1],

        specialRoom: false
    },

    {
        enemyChance: 16 / 100,
        spawners: ["t", "b", "p", "o"],
        spawnerChances: [0.25, 0.25, 0.25, 0.25],

        specialRoom: false  
    },

    {
        enemyChance: 20 / 100,

        spawners: ["o", "b"],
        
        spawnerChances: [0.75, 0.25],

        specialRoom: false
    },

    {
        enemyChance: 50 / 100,

        spawners: ["t"],

        spawnerChances: [1],

        specialRoom: false,
    },

    {
        specialRoom: true,

        // 12 high, 24 side to side
        level: [
            "fffffffffffghfffffffffff",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddbdddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "fddddddddddddddddddddddf",
            "ffffffffffffffffffffffff"
        ],

        tiles: {
            "f": () => [
                sprite("fence", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                area(),
                body({isStatic: true}),
                "level-thing"
            ],

            "d": () => [
                sprite(chance(0.33) ? "dirt0" : chance(0.5) ? "dirt1" : "dirt3", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                "level-thing"
            ],


            "g": () => [
                sprite("gate", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                area(),
                body({isStatic: true}),
                {
                    alreadyOpened: false,

                    update()
                    {
                        let allEnemies = get("enemy", {recursive: true});

                        let allGraves = get("spawner", {recursive: true});

                        if (allEnemies.length == 0 && allGraves.length == 0 && !this.alreadyOpened)
                        {
                            this.alreadyOpened = true;
                            // this.sprite = "gate-open";
                            this.use(sprite("gate-open", {
                                width: 64,
                                height: 64
                            }));
                            this.unuse("body");
                        }
                    }
                },
                "level-thing",
                "gate"
            ],

            "h": () => [
                sprite("gate", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                area(),
                body({isStatic: true}),
                {
                    alreadyOpened: false,

                    add()
                    {
                        this.flipX = true;
                    },
                    update()
                    {
                        let allEnemies = get("enemy", {recursive: true});

                        let allGraves = get("spawner", {recursive: true});

                        if (allEnemies.length == 0 && allGraves.length == 0 && !this.alreadyOpened)
                        {
                            this.alreadyOpened = true;
                            // this.sprite = "gate-open";
                            this.use(sprite("gate-open", {
                                width: 64,
                                height: 64
                            }));
                            this.flipX = true;
                            this.unuse("body");
                        }
                    }
                },
                "level-thing",
                "gate"
            ],

            "b": () => [
                sprite("gigagantrum", {
                    width: 128,
                    height: 128
                }),
                pos(0, 64),
                anchor("botleft"),
                area(),
                z(1),
                body({isStatic: true}),
                timer(),
                "spawner",
                {
                    add()
                    {
                        add([
                            sprite("church", {
                                width: 128,
                                height: 224
                            }),
                            pos(center().sub(0, 5 * 64)),
                            anchor("bot"),
                            z(2)
                        ]);
                        dialogue("finally, its the church. but there is a a gargoyle?", "ghosty-head");
                        
                        this.wait(7, () => {
                            let giga = add([
                                sprite("gigagantrum", {
                                    width: 128,
                                    height: 128
                                }),
                                anchor("center"),
                                z(1),
                                pos(this.pos.add(center().sub(12 * 64, 6 * 64).sub(0, 64))),
                                area({scale: 0.8}),
                                enemy(20),
                                moveTowardsPlayer(100, get("player-collider")[0], 1),
                                spawnEnemy(() => {

                                    let skeleton = [
                                        sprite("skeleton", {
                                        anim: "jump",
                                        width: 64
                                    }),
                                    enemy(2),
                                    anchor("center"),
                                    pos(giga.pos),
                                    area({scale: 0.5}),
                                    timer(),
                                    moveTowardsPlayer(125, get("player-collider")[0]),
                                    shootAtPlayer(get("player-collider")[0], () => [
                                        sprite("bone", {
                                            width: 50,
                                            height: 20,
                                        }),
                                        area({scale: 0.5}),
                                        pos(skeleton[3].pos),
                                        rotate(0),
                                        anchor("center"),
                                        {
                                            add()
                                            {
                                                this.onCollideUpdate("player-collider", () => {
                                                    get("player-collider")[0].hurt();
                                                });
                                            },
                                            
                                            update()
                                            {
                                                this.angle += 360 * dt();
                                            }
                                        }
                                    ], 3, 200, false),
                                    z(1),
                                    {
                                        add()
                                        {
                                            this.onCollideUpdate("player-collider", () => {
                                                get("player-collider")[0].hurt();
                                            });
                                        }
                                    }
                                    ]

                                    return skeleton;
                                }   , 5),
                                shootAtPlayer(get("player-collider")[0], () => [
                                    sprite("rock", {
                                        width: 100,
                                        height: 100,
                                    }),
                                    area({scale: 0.5}),
                                    pos(giga.pos),
                                    rotate(0),
                                    anchor("center"),
                                    {
                                        add()
                                        {
                                            this.onCollideUpdate("player-collider", () => {
                                                get("player-collider")[0].hurt();
                                            });
                                        },
                                        
                                        update()
                                        {
                                            this.angle += 360 * dt();
                                        }
                                    }
                                ], 1.5, 400),
                            ]);

                            add([
                                sprite(chance(0.33) ? "dirt0" : chance(0.5) ? "dirt1" : "dirt3", {
                                    width: 64,
                                    height: 64
                                }),
                                pos(this.pos.add(center().sub(12 * 64, 6 * 64).sub(0, 64))),
                                z(-1),
                                "level-thing"
                            ]);

                            destroy(this);
                        });
                    }
                },
                "level-thing",
            ]
        }
    },
]