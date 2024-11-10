import kaplay, { Vec2 } from "kaplay"
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

kaplay();

loadStuffs();
loadBean();

camScale(vec2(2));

const PLAYER_SPEED = 150;

const PLAYER_ACC = 1500;

let curTop = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).y;
let curBottom = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).y;
let curLeft = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).x;
let curRight = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).x;

let levelsCleared = 0;
// debug.inspect = true;

let player = add([
	sprite("ghosty", {
		anim: "hover",
		width: 60 /* original size */ * 0.75,
		height: 70 /* original size */ * 0.75
	}),
	pos(center()),
	area(),
	body(),
	anchor("center"),
	ccbody(),
	z(1),
	"player-collider",
	{
		selectedCollectable: null,

		currentlyCollecting: false,

		update()
		{
			tween(camPos(), this.pos, 1, (p) => {camPos(clamp(p.x, curLeft, curRight), clamp(p.y, curTop, curBottom));}, easings.easeOutBack);
			// Handle vertical movement

			if (isKeyDown("w")) {
				this.acc.y = -PLAYER_ACC;
				this.vel.y = clamp(-PLAYER_SPEED, this.vel.y, 0);
			} else if (isKeyDown("s")) {
				this.acc.y = PLAYER_ACC;
				this.vel.y = clamp(0, this.vel.y, PLAYER_SPEED);
			} else {
				// Apply friction or slow down vertically when no input
				this.acc.y = 0;
				this.vel.y *= 0.95;  // Adjust friction as needed
			}

			// Handle horizontal movement
			if (isKeyDown("a")) {
				this.acc.x = -PLAYER_ACC;
				this.vel.x = clamp(-PLAYER_SPEED, this.vel.x, 0);
			} else if (isKeyDown("d")) {
				this.acc.x = PLAYER_ACC;
				this.vel.x = clamp(0, this.vel.x, PLAYER_SPEED);
			} else {
				// Apply friction or slow down horizontally when no input
				this.acc.x = 0;
				this.vel.x *= 0.95;  // Adjust friction as needed
			}
		}
	}
]);

let curLevel = addLevel(generateLevel(levelPrefs[0]), {
	pos: center().sub(12 * 64, 6 * 64),

	tileWidth: 64,
	tileHeight: 64,

	tiles: levelTiles(player)
});
let homingOrbs = () => {
	createHomingOrb(player);
	createHomingOrb(player);
}

player.onCollideEnd("gate", (gate) => {
	if (player.pos.y < center().sub(12 * 64, 6 * 64).y)
	{
		destroy(curLevel);

		player.pos = center();
		curLevel = addLevel(generateLevel(levelPrefs[++levelsCleared]), {
			pos: center().sub(12 * 64, 6 * 64),

			tileWidth: 64,
			tileHeight: 64,

			tiles: levelTiles(player)
		});
	}
});


add([
	pos(center()),
	sprite("sword"),
	anchor("center"),
	collectable({
		itemName: "Sword",

		spriteName: "sword",

		itemDescription: "A trusty sword! Press lmb to fight your foes!"
	}, {
		time: 1,
		spriteName: "sword",
		abilityCondition: () => {return isMousePressed()},
		ability: createSword,
	}, player)
])

// onKeyPress("f", () => {
// 	homingOrbs();
// })


// f is fence, g is gate, h is right gate, d is dirt, t is grave
function generateLevel(levelPrefs)
{

	let enemyChance = levelPrefs.enemyChance;
	let spawners = levelPrefs.spawners;
	let spawnerChances = levelPrefs.spawnerChances;

	
	let level = [];

	let chances = 0;
	spawnerChances.forEach((spawnerChance) => {
		chances += spawnerChance; 
	});

	if (chances > 1)
		throw new Error("total spawner chance exceeds 100%");

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

	return level;
}