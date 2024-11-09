import moveTowardsPlayer from "./enemyBehavior/moveTowardsPlayer";
import shootAtPlayer from "./enemyBehavior/shootAtPlayer";

export default function levelTiles(player)
{
    return {
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

					let allGraves = get("grave", {recursive: true});

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
			"level-thing"
		],
		"b": () => [
            sprite("bones", {
                width: 64,
                height: 64
            }),
            pos(0, 0),
            area(),
            body({isStatic: true}),
            {
                add()
				{
					this.wait(rand(3, 10), () => {
						add([
							sprite("skeleton", {
                                anim: "jump"
                            }),
							anchor("center"),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
							area(),
							moveTowardsPlayer(125, player),
                            shootAtPlayer(player, () => [
                                sprite("bone", {
                                    width: 50,
                                    height: 10,
                                }),
                                area(),
                                pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
                                rotate(0),
                                anchor("center"),
                                {
                                    update()
                                    {
                                        this.angle += 360 * dt();
                                    }
                                }
                            ], 1.5, 200, false),
							z(1),
							"enemy",
						]);

						add([
							sprite(chance(0.33) ? "dirt0" : chance(0.5) ? "dirt1" : "dirt3", {
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

					let allGraves = get("grave", {recursive: true});

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
		"t": () => [
			sprite("grave", {
				width: 64,
				height: 64
			}),
			pos(0, 0),
			area(),
			body({isStatic: true}),
			timer(),
			{
				add()
				{
					this.wait(rand(3, 15), () => {
						add([
							sprite("bean"),
							anchor("center"),
							pos(this.pos.add(center().sub(12 * 64, 6 * 64))),
							area(),
							moveTowardsPlayer(125, player),
							z(1),
							"enemy",
						]);

						add([
							sprite(chance(0.33) ? "dirt0" : chance(0.5) ? "dirt1" : "dirt3", {
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