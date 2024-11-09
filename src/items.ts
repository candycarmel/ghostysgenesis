const CACTUS = item("cactus", "cactus", 50, 50);

const ROSE = item("desert rose", "rose", 50, 20);

const MAP = item("oasis map", "oasis", 100, 20);

const SPICE = item("spices", "spice", 100, 10);

const TOTEM = item("golden totem", "totem", 200, 10);

const FOSSIL = item("fossil", "fossil", 250, 15);

const POTTERY = item("ancient pottery", "pottery", 300, 20);

const METEORITE = item("meteorite", "meteorite", 350, 5);

const GLASS = item("lightning glass", "lightning-glass", 400, 15);

const WOOD = item("petrified wood", "petrified-wood", 500, 5);

const GOLD = item("gold", "gold", 1000, 5);

const RELIC = item("\"normal\" relic", "relic", 2000, 1);

export default {CACTUS, ROSE, MAP, SPICE, TOTEM, FOSSIL, POTTERY, METEORITE, GLASS, WOOD, GOLD, RELIC, items: [CACTUS, ROSE, MAP, SPICE, TOTEM, FOSSIL, POTTERY, METEORITE, GLASS, WOOD, GOLD, RELIC]}

function item(name, sprite, worth, rarity)
{
	return {
		name,
		sprite,
		worth,
        rarity
	}
}