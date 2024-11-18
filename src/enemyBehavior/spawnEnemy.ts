export default function spawnEnemy(enemy, interval)
{
    return {
        id: "split-on-death",

        add()
        {
            this.use(timer());

            this.loop(interval, () => {
                add(enemy());
            });
        }
    }
}