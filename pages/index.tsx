import {useEffect, useRef} from "react";
import * as d3 from "d3";
import projects from "../projects.json";

const TOD = (() => {
    const currHour = new Date().getHours();
    if (currHour < 12) return "morning";
    if (currHour < 18) return "afternoon";
    return "evening";
})();

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
            .force("center", d3.forceCenter(width / 2, height / 2).strength(1.5))
            .force("collision", d3.forceCollide().radius(d => d.width / 2))
            // .force("centerY", d3.forceY(height / 2))
            // .force("centerX", d3.forceX(d => Math.min(Math.max(d.score * width, 0), width - 100)))
            .on("tick", tick);

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "#222");

        const screen = d3.select("body").append("div")
            .attr("class", "screen");

        function tick() {
            div.selectAll("img.story")
                .data(projects.filter(d => !("hed" in d)))
                .join(
                    enter => {
                        enter.append("img")
                            .attr("class", "story")
                            .attr("src", d => "/cloud/" + d.img)
                            .style("width", d => d.width + "px")
                            .style("position", "absolute")
                            .style("border-radius", 4 + "px")
                            .style("left", d => Math.min(Math.max(d.x, 0), width - d.width) + "px")
                            .style("top", d => {
                                return Math.max(d.y, 0) + "px"
                            })
                            .on("mouseover", () => screen.style("display", "block").style("opacity", 1))
                            .on("mouseout", () => screen.style("display", "none").style("opacity", 0));
                    },
                    update => {
                        const heights = update._groups[0].map(d => d.offsetHeight);

                        update
                            .style("left", d => Math.min(Math.max(d.x, 0), width - d.width) + "px")
                            .style("top", (d, i) => Math.min(Math.max(d.y, 0), height - heights[i]) + "px");
                    }
                );


            div.selectAll("div.story")
                .data(projects.filter(d => "hed" in d))
                .join(
                    enter => {
                        const thisDiv = enter
                            .append("div")
                            .attr("class", "story")
                            .style("position", "absolute")
                            .style("left", d => Math.min(Math.max(d.x, 0), width - 386) + "px")
                            .style("top", d => {
                                return Math.max(d.y, 0) + "px";
                            })
                            .style("display", "flex")
                            .style("align-items", "center")
                            .on("mouseover", () => screen.style("display", "block").style("opacity", 1))
                            .on("mouseout", () => screen.style("display", "none").style("opacity", 0));

                        thisDiv.append("img")
                            .attr("class", "storyImg")
                            .style("width", "150px")
                            .style("height", "100px")
                            .attr("src", d => "/cloud/" + d.img)
                            .style("object-fit", "cover");
                            // .style("background-position", "center center")
                            // .style("background-size", "cover")
                            // .style("background-image", d => `url("/cloud/${d.img}")`);

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
                        const heights = update._groups[0].map(d => d.offsetHeight);

                        update
                            .style("left", d => Math.min(Math.max(d.x, 0), width - 386) + "px")
                            .style("top", (d, i) => Math.min(Math.max(d.y, 0), height - heights[i]) + "px");
                    }
                )

            // const root = d3.select("#d3root");
            //
            // const zoom = d3.zoom()
            //     .scaleExtent([0.5, 2])
            //     .translateExtent([[-1.5 * width, -1.5 * height], [1.5 * width, 1.5 * height]])
            //     .on("zoom", zoomed);
            //
            // root.call(zoom);
            //
            // function zoomed({transform}) {
            //     div.style("transform", "translate(" + transform.x + "px," + transform.y + "px) scale(" + transform.k + ")").style("transform-origin","0 0");
            // }
        }
    }, []);

    return (
        <div className="relative" id="d3root">
            <svg ref={svgRef}/>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden" ref={divRef}></div>
            <div className="p-12 bg-white bg-opacity-80 rounded-md border border-box w-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                <h1 className="font-tn font-bold text-4xl">Good {TOD}, LA Times.<br/>My name is Samson Zhang.</h1>
                <ul className="font-benton list-disc pl-4">
                    <li className="mt-6">I’m applying to be a data and graphics intern this summer.</li>
                    <li className="mt-6">This is an interactive portfolio showcasing how I’ve <b>served communities as a data journalist, designer and reporter.</b></li>
                </ul>
            </div>
        </div>
    );
}