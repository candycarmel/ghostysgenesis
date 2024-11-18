export default function splitOnDeath(amount, enemy)
{
    return {
        id: "split-on-death",

        destroy()
        {
            for (let i = 0; i < amount; i++)
                add(enemy(this.pos));
        }
    }
}