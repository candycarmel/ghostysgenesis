import createAxe from "./abilities/axe";
import createBow from "./abilities/bow";
import createDaggers from "./abilities/daggers";
import createHomingOrb from "./abilities/orbs";
import createSword from "./abilities/sword";

import collectable from "./components/collectable";
export default function addRandomCollectable(player)
{
    let random = randi(0, 5);

    switch(random)
    {
        case 0:
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
                    ability: createSword,
                }, player)
            ]);
            break;
        case 1:
            add([
                pos(center()),
                sprite("axe"),
                anchor("center"),
                collectable({
                    itemName: "Axe",

                    spriteName: "axe",

                    itemDescription: "A sturdy axe! Quick spin attack to damage enemies multiple times!"
                }, {
                    time: 3,
                    spriteName: "axe",
                    abilityCondition: () => {return isMousePressed()},
                    ability: createAxe,
                }, player)
            ]);
            break;
        case 2:
            add([
                pos(center()),
                sprite("bow"),
                anchor("center"),
                collectable({
                    itemName: "Bow",

                    spriteName: "bow",

                    itemDescription: "A bow you can charge up to deal MASSIVE piercing damage!"
                }, {
                    time: 1,
                    spriteName: "bow",
                    abilityCondition: () => {return isMousePressed()},
                    ability: createBow,
                }, player)
            ]);
            break;
        case 3:
            add([
                pos(center()),
                sprite("knife"),
                anchor("center"),
                collectable({
                    itemName: "Daggers",

                    spriteName: "knife",

                    itemDescription: "Throwing daggers to kill enemies from a long range!"
                }, {
                    time: 0.5,
                    spriteName: "knife",
                    abilityCondition: () => {return isMousePressed()},
                    ability: createDaggers,
                }, player)
            ]);
            break;
        case 4:
            add([
                pos(center()),
                sprite("orb"),
                anchor("center"),
                collectable({
                    itemName: "Spirit orbs",

                    spriteName: "orb",

                    itemDescription: "Homing spirit orbs to kill enemies from afar!"
                }, {
                    time: 0.5,
                    spriteName: "orb",
                    abilityCondition: () => {return isMousePressed()},
                    ability: createHomingOrb,
                }, player)
            ]);
            break;
    }
}