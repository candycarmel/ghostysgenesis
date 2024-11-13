export default [
    {
        // amt of enemies that should spawn / max enemies that can spawn
        enemyChance: 5 / 100, 
        spawners: ["t"], 
        spawnerChances: [1]
    },

    {
        // amt of enemies that should spawn / max enemies that can spawn
        enemyChance: 10 / 100, 
        spawners: ["t"], 
        spawnerChances: [1]
    },

    {
        enemyChance: 10 / 100,
        spawners: ["t", "b"],
        spawnerChances: [0.75, 0.25]
    },

    {
        enemyChance: 7 / 100,
        spawners: ["b"],
        spawnerChances: [1]
    },

    {
        enemyChance: 15 / 100,
        spawners: ["t", "b"],
        spawnerChances: [0.75, 0.25]
    },

    {
        enemyChance: 20 / 100,
        spawners: ["p"],
        spawnerChances: [1]
    },
]