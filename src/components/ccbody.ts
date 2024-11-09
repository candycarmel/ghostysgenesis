export default function ccbody()
{
    return {
        id: "cc-body",
        require: ["area", "body"],
        acc: vec2(0),
        update()
        {
            this.vel = this.vel.add(this.acc.scale(dt()));
            this.pos = this.pos.add(this.vel.scale(dt()));
        }
    }
}