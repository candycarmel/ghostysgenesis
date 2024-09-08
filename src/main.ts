import kaplay from "kaplay"
import "kaplay/global"

const UI_LAYER = 100;

const FRONT_LAYER = 50;

const SHOP_LAYER = 10;

const BETWEEN_LAYER = 5;

const FRONT_BACKGROUND_LAYER = 1;
const BACK_BACKGROUND_LAYER = 0;

export default {UI_LAYER, FRONT_LAYER, SHOP_LAYER, BETWEEN_LAYER, FRONT_BACKGROUND_LAYER, BACK_BACKGROUND_LAYER};

import game from "./scenes/game";

import load from "./load";

kaplay({
	width: 1920,
	height: 1080,
	stretch: true,
	letterbox: true,
});

load();
game();

go("game");