import moveTowardsPlayer from "./enemyBehavior/moveTowardsPlayer";
import shootAtPlayer from "./enemyBehavior/shootAtPlayer";
import enemy from "./enemyBehavior/enemy";
import splitOnDeath from "./enemyBehavior/splitOnDeath";

export default function nextLevelTiles(player)
{
    return {


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
						play("gate");
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


		"b": () => [
            sprite("bones-next", {
                width: 64,
                height: 64
            }),
            pos(0, 0),
            area(),
            timer(),
			"spawner",
            body({isStatic: true}),
            {
                add()
				{
					this.wait(rand(3, 10), () => {

                        let position = this.pos.add(center().sub(12 * 64, 6 * 64));
						let skeleton = add([
							sprite("skeleton-next", {
                                anim: "jump",
                                width: 64
                            }),
							enemy(2),
							anchor("center"),
							pos(position),
							area({scale: 0.5}),
                            timer(),
							moveTowardsPlayer(125, player),
                            shootAtPlayer(player, () => [
                                sprite("bone-next", {
                                    width: 50,
                                    height: 20,
                                }),
                                area({scale: 0.5}),
                                pos(skeleton.pos),
                                rotate(0),
                                anchor("center"),
                                {
									add()
									{
										this.onCollideUpdate("player-collider", () => {
											player.hurt();
										});
									},
									
                                    update()
                                    {
                                        this.angle += 360 * dt();
                                    }
                                }
                            ], 3, 200, true),
							z(1),
							{
								add()
								{
									this.onCollideUpdate("player-collider", () => {
										player.hurt();
									});
								}
							}
						]);

						add([
							sprite(chance(0.33) ? "dirt0-next" : chance(0.5) ? "dirt1-next" : "dirt3-next", {
								width: 64,
								height: 64
							}),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
                            z(-1),
							"level-thing"
						]);

						destroy(this);
					});
				}
            },
            "bones",
            "level-thing"
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


		"t": () => [
			sprite("grave-next", {
				width: 64,
				height: 64
			}),
			pos(0, 0),
			area(),
			body({isStatic: true}),
			timer(),
			"spawner",
			{
				add()
				{
					this.wait(rand(3, 15), () => {
						add([
							sprite("bean", {
                                width: 64
                            }),
							enemy(5),
							anchor("center"),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
							area({scale: 0.5}),
							moveTowardsPlayer(200, player, 2),
							z(1),
							{
								add()
								{
									this.onCollideUpdate("player-collider", () => {
										player.hurt();
									});
								}
							},
						]);

						add([
							sprite(chance(0.33) ? "dirt0-next" : chance(0.5) ? "dirt1-next" : "dirt3-next", {
								width: 64,
								height: 64
							}),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
                            z(-1),
							"level-thing"
						]);

						destroy(this);
					});
				}
			},
			"level-thing",
			"grave"
		],


		"p": () => [
			sprite("pile-next", {
				width: 64,
				height: 64
			}),
			pos(0, 0),
			area(),
			body({isStatic: true}),
			timer(),
			"spawner",
			{
				add()
				{
					this.wait(rand(3, 15), () => {
						add([
							sprite("karat-next", {
                                width: 32
                            }),
							enemy(1),
							anchor("center"),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
							area({scale: 0.5}),
							moveTowardsPlayer(600, player, 0.5),
							z(1),
							{
								add()
								{
									this.onCollideUpdate("player-collider", () => {
										player.hurt();
									});
								}
							},
						]);

						add([
							sprite(chance(0.33) ? "dirt0-next" : chance(0.5) ? "dirt1-next" : "dirt3-next", {
								width: 64,
								height: 64
							}),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
                            z(-1),
							"level-thing"
						]);

						destroy(this);
					});
				}
			},
			"level-thing",
			"grave"
		],


		"o": () => [
			sprite("hole-next", {
				width: 64,
				height: 64
			}),
			pos(0, 0),
			area(),
			body({isStatic: true}),
			timer(),
			"spawner",
			{
				add()
				{
					this.wait(rand(3, 15), () => {
						add([
							sprite("bats-next", {
                                width: 64,
								anim: "bats"
                            }),
							enemy(3),
							anchor("center"),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
							area({scale: 0.5}),
							body(),
							moveTowardsPlayer(100, player),
							splitOnDeath(6, (position) => [
								sprite("bat-next", {
									width: 20,
									anim: "bat"
								}),
								pos(position),
								area({scale: 0.5}),
								enemy(1),
								moveTowardsPlayer(200, player, 1),
							]),
							z(1),
							{
								add()
								{
									this.onCollideUpdate("player-collider", () => {
										player.hurt();
									});
								}
							},
						]);

						add([
							sprite(chance(0.33) ? "dirt0-next" : chance(0.5) ? "dirt1-next" : "dirt3-next", {
								width: 64,
								height: 64
							}),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
                            z(-1),
							"level-thing"
						]);

						destroy(this);
					});
				}
			},
			"level-thing",
			"grave"
		],


	}
}