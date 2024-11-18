

import dialogue from "./dialogue";
import enemy from "./enemyBehavior/enemy";
import moveTowardsPlayer from "./enemyBehavior/moveTowardsPlayer";
import shootAtPlayer from "./enemyBehavior/shootAtPlayer";
import spawnEnemy from "./enemyBehavior/spawnEnemy";

export default [
    {
        // amt of enemies that should spawn / max enemies that can spawn
        enemyChance: 5 / 100, 
        spawners: ["t"], 
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
			sprite("fence-next", {
				width: 64,
				height: 64
			}),
			pos(0, 0),
			area(),
			body({isStatic: true}),
			"level-thing"
		],


		"g": () => [
			sprite("gate-next", {
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
						this.use(sprite("gate-open-next", {
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
			sprite("gate-next", {
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

					if ((allEnemies.length == 0 && allGraves.length == 0 && !this.alreadyOpened))
					{
						this.alreadyOpened = true;
						// this.sprite = "gate-open";
						this.use(sprite("gate-open-next", {
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


		"d": () => [
			sprite(chance(0.33) ? "dirt0-next" : chance(0.5) ? "dirt1-next" : "dirt3-next", {
				width: 64,
				height: 64
			}),
			pos(0, 0),
			"level-thing"
		],

            "b": () => [
                sprite("skeleton-thing", {
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
                        dialogue("maybe death isn't so bad after all", "ghosty-head");

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
                sprite("fence-next", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                area(),
                body({isStatic: true}),
                "level-thing"
            ],

            "d": () => [
                sprite(chance(0.33) ? "dirt0-next" : chance(0.5) ? "dirt1-next" : "dirt3-next", {
                    width: 64,
                    height: 64
                }),
                pos(0, 0),
                "level-thing"
            ],


            "g": () => [
                sprite("gate-next", {
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

                        if (!this.alreadyOpened)
                        {
                            this.alreadyOpened = true;
                            // this.sprite = "gate-open";
                            this.use(sprite("gate-open-next", {
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
                sprite("gate-next", {
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

                        if (!this.alreadyOpened)
                        {
                            this.alreadyOpened = true;
                            // this.sprite = "gate-open";
                            this.use(sprite("gate-open-next", {
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
                sprite("amulet", {
                    width: 128,
                    height: 128
                }),
                pos(0, 64),
                anchor("botleft"),
                area(),
                z(1),
                "spawner",
                {
                    add()
                    {
                        add([
                            sprite("church-next", {
                                width: 128,
                                height: 224
                            }),
                            pos(center().sub(0, 5 * 64)),
                            anchor("bot"),
                            z(2)
                        ]);
                        wait(dialogue("you know, maybe I'm dead for a reason. there is beauty everywhere, even in death.", "ghosty-head") + 0.5, () => {
                            dialogue("It's time for me to move on.", "ghosty-head");
                        });
                        
                    }
                },
                "level-thing",
            ]
        }
    },
]