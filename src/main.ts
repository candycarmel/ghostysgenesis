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
import heart from "./components/heart";
import createAxe from "./abilities/axe";
import createBow from "./abilities/bow";
import createDaggers from "./abilities/daggers";

kaplay();

loadStuffs();
loadBean();

camScale(vec2(2));

let curTop = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).y;
let curBottom = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).y;
let curLeft = center().sub(12 * 64, 6 * 64).add(center().scale(0.5)).x;
let curRight = center().add(12 * 64, 6 * 64).sub(center().scale(0.5)).x;

let levelsCleared = 0;
// debug.inspect = true;

let hearts = [];

for (let i = 0; i < 5; i++)
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

		INVINCIBLE_MAX: 1,

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
				// Apply friction or slow down vertically when no input
				this.acc.y = 0;
				this.vel.y *= 0.95;  // Adjust friction as needed
			}

			// Handle horizontal movement
			if (isKeyDown("a")) {
				this.acc.x = -this.PLAYER_ACC;
				this.vel.x = clamp(-this.PLAYER_SPEED, this.vel.x, 0);
			} else if (isKeyDown("d")) {
				this.acc.x = this.PLAYER_ACC;
				this.vel.x = clamp(0, this.vel.x, this.PLAYER_SPEED);
			} else {
				// Apply friction or slow down horizontally when no input
				this.acc.x = 0;
				this.vel.x *= 0.95;  // Adjust friction as needed
			}
		},

		hurt()
		{
			if (this.invincibleTimer > 0)
				return;

			this.invincibleTimer = this.INVINCIBLE_MAX;
			hearts.reverse();

			for (let i = 0; i < hearts.length; i++) {

				let heart = hearts[i];

				if (!heart.lost)
				{
					heart.hurt();
					break;
				}
			}
			
			hearts.reverse();
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

add([
	pos(center()),
	sprite("sword"),
	anchor("center"),
	collectable({
		itemName: "Sword",

		spriteName: "sword",

		itemDescription: "A trusty sword! Quick sweeping attack to fight your foes!"
	}, {
		time: 1,
		spriteName: "sword",
		abilityCondition: () => {return isMousePressed()},
		ability: createDaggers,
	}, player)
]);
onKeyPress("f", () => {
	homingOrbs();
})


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
	return level;
}