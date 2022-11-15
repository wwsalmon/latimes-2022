import {useEffect, useRef} from "react";
import * as d3 from "d3";
import projects from "../projects.json";

export default function Home() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const didMount = useRef<boolean>(false);

    useEffect(() => {
        if (!svgRef.current || !divRef.current || !window || didMount.current) return;

        didMount.current = true;

        const height = window.innerHeight;
        const width = window.innerWidth;
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewbox", `0 0 ${width} ${height}`);
        const div = d3.select(divRef.current);

        const simulation = d3.forceSimulation(projects)
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2))
            // .force("centerY", d3.forceY(height / 2))
            // .force("centerX", d3.forceX(d => Math.min(Math.max(d.score * width, 0), width - 100)))
            .on("tick", tick);

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "#222");

        function tick() {
            div.selectAll("img")
                .data(projects.filter(d => !("hed" in d)))
                .join("img")
                .attr("src", d => "/cloud/" + d.img)
                .style("width", d => d.width + "px")
                .style("position", "absolute")
                .style("border-radius", 4 + "px")
                .style("left", d => d.x + "px")
                .style("top", d => d.y + "px");

            div.selectAll("div.story")
                .data(projects.filter(d => "hed" in d))
                .join(
                    enter => {
                        const thisDiv = enter
                            .append("div")
                            .attr("class", "story")
                            .style("position", "absolute")
                            .style("left", d => d.x + "px")
                            .style("top", d => d.y + "px")
                            .style("display", "flex")
                            .style("align-items", "center");

                        thisDiv.append("div")
                            .attr("class", "storyImg")
                            .style("width", "150px")
                            .style("height", "100px")
                            .style("background-position", "center center")
                            .style("background-size", "cover")
                            .style("background-image", d => `url("/cloud/${d.img}")`);

                        const contentDiv = thisDiv.append("div")
                            .style("margin-left", "16px")
                            .style("width", "220px")
                            .style("color", "white");

                        contentDiv.append("h3")
                            .text(d => d.pub)
                            .attr("class", "uppercase font-fb")
                            .style("font-size", "10px")
                            .style("margin-bottom", "6px");

                        contentDiv.append("h2")
                            .text(d => d.hed)
                            .attr("class", "font-tn font-bold leading-tight")
                            .style("font-size", "16px")
                            .style("margin-bottom", "6px");

                        contentDiv.append("h2")
                            .text(d => d.dek)
                            .attr("class", "font-georgia")
                            .style("color", "#ddd")
                            .style("font-size", "10px");
                    },
                    update => {
                        update.style("left", d => d.x + "px").style("top", d => d.y + "px");
                    }
                )
        }
    }, []);

    return (
        <div className="relative">
            <svg ref={svgRef}/>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden" ref={divRef}></div>
        </div>
    );
}