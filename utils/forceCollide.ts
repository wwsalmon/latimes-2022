import * as d3 from "d3";

// from https://observablehq.com/@roblallier/rectangle-collision-force

const padding = 4;

export default function forceCollide() {
    let nodes;

    function force(alpha) {
        const quad = d3.quadtree(nodes, d => d.x, d => d.y);

        console.log(quad);

        for (const d of nodes) {
            quad.visit((q, x1, y1, x2, y2) => {
                let updated = false;
                if(q.data && q.data !== d){
                    let x = d.x - q.data.x,
                        y = d.y - q.data.y,
                        xSpacing = padding + (q.data.width + d.width) / 2,
                        ySpacing = padding + (q.data.height + d.height) / 2,
                        absX = Math.abs(x),
                        absY = Math.abs(y),
                        l,
                        lx,
                        ly;

                    if (absX < xSpacing && absY < ySpacing) {
                        l = Math.sqrt(x * x + y * y);

                        lx = (absX - xSpacing) / l;
                        ly = (absY - ySpacing) / l;

                        // the one that's barely within the bounds probably triggered the collision
                        if (Math.abs(lx) > Math.abs(ly)) {
                            lx = 0;
                        } else {
                            ly = 0;
                        }
                        d.x -= x *= lx;
                        d.y -= y *= ly;
                        q.data.x += x;
                        q.data.y += y;

                        updated = true;
                    }
                }
                return updated;
            });
        }
    }

    force.initialize = _ => nodes = _;

    return force;
}