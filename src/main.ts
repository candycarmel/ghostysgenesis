import kaplay from "kaplay"
import "kaplay/global"
import loadStuffs from "./loader";
import ccbody from "./components/ccbody";
import createSword from "./abilities/sword";
import createHomingOrb from "./abilities/orbs";
import moveTowardsPlayer from "./enemyBehavior/moveTowardsPlayer";
import cooldown from "./components/cooldown";
import levelTiles from "./levelTiles";
import levelPrefs from "./levelPrefs";
import collectable from "./components/collectable";
import heart from "./components/heart";
import createAxe from "./abilities/axe";
import createBow from "./abilities/bow";
import createDaggers from "./abilities/daggers";
import nextLevelTiles from "./nextLevelTiles";
import nextLevelPrefs from "./nextLevelPrefs";
import addRandomCollectable from "./addRandomCollectable";
import dialogue from "./dialogue";

kaplay({
	width: window.screen.width,
	height: window.screen.height/* standard windows titlebar size */,
});

loadStuffs();
loadBean();

let curMusic = play("music", {loop: true, volume: 0.1});

scene("frfrstart", () => {
	add([
		text("Click to start!"),
		pos(center()),
		anchor("center")
	]);

	onClick(() => {
		setFullscreen(true);
		go("start");
	})
})

scene("start", () => {

	curMusic.stop()

curMusic = play("music", {loop: true, volume: 0.1});

onUpdate(() => setCursor("default"));

	add([
		rect(width(), height()),
		color(123, 84, 128),
		pos(0, 0)
	]);

	let startText = "REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH REBIRTH";

	let normalText = "";

	for (let i = 0; i < 20; i++)
	{
		normalText += startText;
	}
	let texty = add([
		text(normalText, {
			width: width() + 100,
			// Text alignment ("left", "center", "right", default "left")
			align: "left",
			lineSpacing: 8,
			letterSpacing: 4,
			// Transform each character for special effects
			transform: (idx, ch) => ({
				color: rgb(217, 189, 200),
				pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
				scale: wave(1, 1.2, time() * 3 + idx),
				angle: wave(-9, 9, time() * 3 + idx),
			}),
		})
	]);

	let ghosty = add([
		sprite("ghosty-head"),
		scale(8),
		pos(center()),
		anchor("center"),
		spin(),
	]);

	function spin() {
	return {
		id: "spin",
		update() {
		this.scale = Math.cos(time()) * 8
		this.angle = time() * 60
		},
	}
	}


	add([
		sprite("banner"),
		scale(2),
		anchor("center"),
		// color(BLACK),
		pos(width() / 2, 100)
	]);

	let button = addButton("Start", vec2(width() / 2, height() - 100), () => {
		go("game0");
	});

	button.color = rgb(255, 255, 255);
})



scene("game0", () => {
	curMusic.stop()

curMusic = play("music", {loop: true, volume: 0.1});
	setCursor("default");
	camScale(vec2(2));

	let curTop = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).y;
	let curBottom = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).y;
	let curLeft = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).x;
	let curRight = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).x;

	let levelsCleared = 0;

	let hearts = [];
	 let player = add([
		sprite("ghosty", {
			anim: "hover",
			width: 60 /* original size */ * 0.75,
			height: 70 /* original size */ * 0.75
		}),
		pos(center()),
		area(),
		opacity(0.9),
		body(),
		anchor("center"),
		ccbody(),
		z(1),
		"player-collider",
		{
			PLAYER_SPEED: 150,

			PLAYER_ACC: 1500,
			
			selectedCollectable: null,

			currentlyCollecting: false,

			invincibleTimer: 0,

			INVINCIBLE_MAX: 2.5,

			update()
			{
				this.invincibleTimer = clamp(this.invincibleTimer - dt(), 0, 1);
				tween(camPos(), this.pos, 1, (p) => {camPos(clamp(p.x, curLeft, curRight), clamp(p.y, curTop, curBottom));}, easings.easeOutBack);
				// Handle vertical movement

				if (isKeyDown("w")) {
					this.acc.y = -this.PLAYER_ACC;
					this.vel.y = clamp(-this.PLAYER_SPEED, this.vel.y, 0);
				} else if (isKeyDown("s")) {
					this.acc.y = this.PLAYER_ACC;
					this.vel.y = clamp(0, this.vel.y, this.PLAYER_SPEED);
				} else {
					this.acc.y = 0;
					this.vel.y *= Math.pow(0.05, dt());
				}

				// Handle horizontal movement
				if (isKeyDown("a")) {
					this.acc.x = -this.PLAYER_ACC;
					this.vel.x = clamp(-this.PLAYER_SPEED, this.vel.x, 0);
				} else if (isKeyDown("d")) {
					this.acc.x = this.PLAYER_ACC;
					this.vel.x = clamp(0, this.vel.x, this.PLAYER_SPEED);
				} else {
					this.acc.x = 0;
					this.vel.x *= Math.pow(0.05, dt());
				}
			},

			hurt()
			{
				if (this.invincibleTimer > 0)
					return;

				let hurt = false;

				this.invincibleTimer = this.INVINCIBLE_MAX;
				hearts.reverse();

				for (let i = 0; i < hearts.length; i++) {

					let heart = hearts[i];

					if (!heart.lost)
					{
						play("hit");
						heart.hurt();
						hurt = true;
						break;
					}
				}

				if (!hurt)
				{
					go("end", "Game Over!");
				}
				
				hearts.reverse();
			},

			heal()
			{
				for (let i = 0; i < hearts.length; i++)
				{
					let heart = hearts[i];

					if (heart.lost)
					{
						play("heal");
						heart.heal();
						break;
					}
				}
			}
		}
	]);

	player.hidden = true;

	player.paused = true;

	let coffin = add([
		sprite("coffin", {
			anim: "open"
		}),
		pos(center()),
		area(),
		body(),
		z(1),
	]);

	let stopIt = add([
		"enemy"
	])

	coffin.onAnimEnd((anim) => {
		if (anim != "open")
			return;
		addRandomCollectable(player);
		destroy(stopIt);

		for (let i = 0; i < 5; i++)
			hearts.push(add([
				pos(0, 0),
				heart(),
			]));

		player.paused = false;
		player.hidden = false;

		coffin.play("stay");
	})
	let curLevel = addLevel(generateLevel(levelPrefs[0]).level, {
		pos: center().sub(12 * 64, 6 * 64),

		tileWidth: 64,
		tileHeight: 64,

		tiles: levelTiles(player)
	});

	player.onCollideEnd("gate", (gate) => {
		if (player.pos.y < center().sub(12 * 64, 6 * 64).y)
		{
			if (levelsCleared == 10)
			{
				go("cutscene0");
				return;
			} else if (levelsCleared == 9)
			{
				curMusic.stop()

				curMusic = play("boss", {loop: true, volume: 0.1});
			}

			if (coffin.exists())
				destroy(coffin);
			destroy(curLevel);

			player.pos = center();

			let generatedLevel = generateLevel(levelPrefs[++levelsCleared]);
			curLevel = addLevel(generatedLevel.level, {
				pos: center().sub(12 * 64, 6 * 64),

				tileWidth: 64,
				tileHeight: 64,

				tiles: generatedLevel.special ? levelPrefs[levelsCleared].tiles : levelTiles(player)
			});
		}
	});


	// add([
	// 	pos(center()),
	// 	sprite("axe"),
	// 	anchor("center"),
	// 	collectable({
	// 		itemName: "Axe",

	// 		spriteName: "axe",

	// 		itemDescription: "A heavy axe! Low damage, but swings many times to deal massive damage to multiple enemies!"
	// 	}, {
	// 		time: 4,
	// 		spriteName: "axe",
	// 		abilityCondition: () => {return isMousePressed()},
	// 		ability: createAxe,
	// 	}, player)
	// ]);


	// f is fence, g is gate, h is right gate, d is dirt, t is grave
});


// MARK: NEXT LEVEL

scene("game1", () => {
	curMusic.stop()

curMusic = play("music", {loop: true, volume: 0.1});
	camScale(vec2(2));

	let curTop = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).y;
	let curBottom = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).y;
	let curLeft = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).x;
	let curRight = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).x;

	let levelsCleared = 0;

	let hearts = [];

	for (let i = 0; i < 8; i++)
		hearts.push(add([
			pos(0, 0),
			heart(),
		]));
	 let player = add([
		sprite("ghosty", {
			anim: "hover",
			width: 60 /* original size */ * 0.75,
			height: 70 /* original size */ * 0.75
		}),
		pos(center()),
		area(),
		opacity(0.9),
		body(),
		anchor("center"),
		ccbody(),
		z(1),
		"player-collider",
		{
			PLAYER_SPEED: 150,

			PLAYER_ACC: 1500,
			
			selectedCollectable: null,

			currentlyCollecting: false,

			invincibleTimer: 0,

			INVINCIBLE_MAX: 2.5,

			update()
			{
				this.invincibleTimer = clamp(this.invincibleTimer - dt(), 0, 1);
				tween(camPos(), this.pos, 1, (p) => {camPos(clamp(p.x, curLeft, curRight), clamp(p.y, curTop, curBottom));}, easings.easeOutBack);
				// Handle vertical movement

				if (isKeyDown("w")) {
					this.acc.y = -this.PLAYER_ACC;
					this.vel.y = clamp(-this.PLAYER_SPEED, this.vel.y, 0);
				} else if (isKeyDown("s")) {
					this.acc.y = this.PLAYER_ACC;
					this.vel.y = clamp(0, this.vel.y, this.PLAYER_SPEED);
				} else {
					this.acc.y = 0;
					this.vel.y *= Math.pow(0.05, dt());
				}

				// Handle horizontal movement
				if (isKeyDown("a")) {
					this.acc.x = -this.PLAYER_ACC;
					this.vel.x = clamp(-this.PLAYER_SPEED, this.vel.x, 0);
				} else if (isKeyDown("d")) {
					this.acc.x = this.PLAYER_ACC;
					this.vel.x = clamp(0, this.vel.x, this.PLAYER_SPEED);
				} else {
					this.acc.x = 0;
					this.vel.x *= Math.pow(0.05, dt()); 
				}
			},

			hurt()
			{
				if (this.invincibleTimer > 0)
					return;

				let hurt = false;

				this.invincibleTimer = this.INVINCIBLE_MAX;
				hearts.reverse();

				for (let i = 0; i < hearts.length; i++) {

					let heart = hearts[i];

					if (!heart.lost)
					{
						play("hit");
						heart.hurt();
						hurt = true;
						break;
					}
				}

				if (!hurt)
				{
					go("end", "Game Over!");
				}
				
				hearts.reverse();
			},

			heal()
			{
				for (let i = 0; i < hearts.length; i++)
				{
					let heart = hearts[i];

					if (heart.lost)
					{
						play("heal");
						heart.heal();
						break;
					}
				}
			}
		}
	]);
	let curLevel = addLevel(generateLevel(nextLevelPrefs[0]).level, {
		pos: center().sub(12 * 64, 6 * 64),

		tileWidth: 64,
		tileHeight: 64,

		tiles: nextLevelTiles(player)
	});

	player.onCollideEnd("gate", (gate) => {
		if (player.pos.y < center().sub(12 * 64, 6 * 64).y)
		{
			destroy(curLevel);
			if (levelsCleared == 10)
			{
				go("cutscene1");
				return;
			} 

			player.pos = center();

			let generatedLevel = generateLevel(levelPrefs[++levelsCleared]);
			curLevel = addLevel(generatedLevel.level, {
				pos: center().sub(12 * 64, 6 * 64),

				tileWidth: 64,
				tileHeight: 64,

				tiles: generatedLevel.special ? nextLevelPrefs[levelsCleared].tiles : nextLevelTiles(player)
			});
		}
	});

	addRandomCollectable(player);
});




scene("cutscene0", () => {
	curMusic.stop()

curMusic = play("music", {loop: true, volume: 0.1});
	let background = add([
		sprite("cutscene0", {
			height: height() * 1.1,
			width: width() * 1.1,
		}),
		pos(0, height()),
		anchor("botleft")
	]);

	tween(camPos(), camPos().add(width() / 10, -height() / 10), 10, (p) => {
		camPos(p);
	}, easings.linear);

	wait(dialogue("Priest, I want to be rebirthed", "ghosty-head") + 0.5, () => {
		wait(dialogue("Okay ghosty, you must get the ruby of rebirth from the catacombs", "bean-pope") + 0.5, () => {
			wait(dialogue("Ok. See you soon priest", "ghosty-head") + 0.5, () => {
				go("game1");
			})
		});
	});




})

scene("cutscene1", () => {
	curMusic.stop()

curMusic = play("music", {loop: true, volume: 0.1});
	let background = add([
		sprite("cutscene0", {
			height: height() * 1.1,
			width: width() * 1.1,
		}),
		pos(0, height()),
		anchor("botleft")
	]);

	tween(camPos(), camPos().add(width() / 10, -height() / 10), 10, (p) => {
		camPos(p);
	}, easings.linear);

	wait(dialogue("Okay ghosty, do you have the ruby?", "bean-pope") + 0.5, () => {
		wait(dialogue("No, I've decided that I will move on.", "ghosty-head") + 0.5, () => {
			wait(dialogue("That's a good idea ghosty. Good luck!", "bean-pope") + 0.5, () => {
				go("end", "You win!");
			});
		});
	});




})




scene("end", (textyyy) => {
	curMusic.stop()

curMusic = play("boss", {loop: true, volume: 0.1});
	onUpdate(() => setCursor("default"));

	add([
		sprite("endscreen", {
			width: width(),
			height: height()
		}),
		pos (0, 0)
	]);

	add([
		text(textyyy),
		scale(2),
		anchor("center"),
		color(BLACK),
		pos(width() / 2, 100)
	]);

	add([
		text("A game by CandyAndCarmel"),
		scale(2),
		anchor("center"),
		color(BLACK),
		pos(width() / 2, height() - 100)
	]);

	let button = addButton("restart", vec2(width() / 2, height() - 200), () => {
		go("game0");
	});

	button.color = rgb(255, 255, 255);
})




go("frfrstart");
// MARK: NORMAL STUFF











function generateLevel(levelPrefs)
	{
		if (levelPrefs.specialRoom == false)
		{
			let enemyChance = levelPrefs.enemyChance;
			let spawners = levelPrefs.spawners;
			let spawnerChances = levelPrefs.spawnerChances;

			
			let level: string[] = [];

			let chances = 0;
			spawnerChances.forEach((spawnerChance) => {
				chances += spawnerChance; 
			});

			if (chances > 1)
				throw new Error("total spawner chance exceeds 100%");
			
			let possibleEnemies = 0;

			main: for (let i = 0; i < 12; i++)
			{
				let row = "";

				if (i == 0)
				{
					for (let i = 0; i < 24; i++)
					{
						if (i == 11)
						{
							row += "g"; // gate
							row += "h"; // right gate
							i++;
						}
						else
							row += "f"; // fence
					}
					level.push(row);
					continue main;
				}
				else if (i == 11)
				{
					for (let i = 0; i < 24; i++)
						row += "f"; // fence
					level.push(row);
					continue main;
				}
				if (i % 2 == 1)
				{
					for (let i = 0; i < 24; i++)
					{
						if (i == 0 || i == 23)
							row += "f"
						else
							row += "d"; // dirt
					}
					level.push(row);
					continue main;
				} else {
					for (let i = 0; i < 24; i++)
					{
						if (i == 11 || i == 12)
							row += "d"; // dirt
						else if (i == 0 || i == 23)
							row += "f"
						else 
						{
							possibleEnemies++;
							if (chance(enemyChance))
							{
								let enemyIndex = -1;

								while (enemyIndex === -1) {
									let currentChance = rand();
									let curChance = 0;

									for (let i = 0; i < spawnerChances.length; i++) {
										let spawnerChance = spawnerChances[i];
										curChance += spawnerChance;

										if (currentChance < curChance) {
											enemyIndex = i;
											break;
										}
									}
								}

								row += spawners[enemyIndex]; // grave
							} else {
								row += "d"; // dirt
							}
						}
					}
					level.push(row);
					continue main;
				}
			}
			return {level: level, special: false};
		}
		return {level: levelPrefs.level, special: true};
	}



// Function that adds a button to the game with a given text, position and function
function addButton(
    txt = "start game",
    p = vec2(200, 100),
    f = () => debug.log("hello"),
) {
    // add a parent background object
    const btn = add([
        rect(240, 80, { radius: 8 }),
        pos(p),
        area(),
        scale(1),
        anchor("center"),
        outline(4),
        color(0, 0, 0),
    ]);

    // add a child object that displays the text
    btn.add([
        text(txt),
        anchor("center"),
        color(0, 0, 0),
    ]);

    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    btn.onHoverUpdate(() => {
        const t = time() * 10;
        btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7);
        btn.scale = vec2(1.2);
        setCursor("pointer");
    });

    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    btn.onHoverEnd(() => {
        btn.scale = vec2(1);
        btn.color = rgb();
    });

    // onClick() comes from area() component
    // it runs once when the object is clicked
    btn.onClick(f);

    return btn;
}