import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import projects from "../projects.json";
import { Scrollama, Step } from "react-scrollama";
import {FaTwitter} from "react-icons/fa";
import BottomBar from "../components/BottomBar";
import Link from "next/link";
import classNames from "classnames";

export const highlightedProjects = [
    {
        index: 1,
        title: "COVID data that faculty relied on in the absence of admin reporting",
        hed: "5C COVID Dashboard",
        dek: "A dashboard for COVID testing data that faculty relied on, that exposed official over-counting and that was awarded Best COVID Coverage of 2021 by the CA College Media Assoc.",
        id: "covid",
    },
    {
        index: 2,
        title: "A first-of-its-kind investigation into journalism’s top awards",
        hed: "Journalism’s influential awards lack diverse judges",
        dek: "A groundbreaking investigative through the AAJA Voices fellowship that resulted in a first-of-its kind dataset and calls for change by top news leaders.",
        id: "pulitzers",
    },
    {
        index: 3,
        title: "Explaining COVID's damage to admitted student diversity",
        hed: "The COVID effect",
        dek: "How did Pomona admit its most competitive and least diverse class in years? Because of a record number of deferrals, the data shows.",
        id: "admissions",
    },
    {
        index: 4,
        title: "Filling gaps in documentation of community activism",
        hed: "Claremont Undercurrents",
        dek: "Habada.",
        id: "undercurrents",
    },
];

const TOD = (() => {
    const currHour = new Date().getHours();
    if (currHour < 12) return "morning";
    if (currHour < 18) return "afternoon";
    return "evening";
})();

const simulation = d3.forceSimulation(projects)
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(0,0).strength(1.5))
    .force("x", d3.forceX(0).strength(0))
    .force("y", d3.forceY(0).strength(0))
    .force("collision", d3.forceCollide().radius(d => d.width / 2))
    .stop();

export default function Home() {
    const [readList, setReadList] = useState<string[]>([]);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const didMount = useRef<boolean>(false);

    useEffect(() => {
        if (!didMount) return;
        let localReadList = JSON.parse(window.localStorage.getItem("LATreadList"));
        setReadList(localReadList);
    }, [didMount.current]);

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

        simulation.force("center").x(width / 2).y(height / 2);
        simulation.alpha(1).restart().on("tick", tick);

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "#222");

        const categories = ["Graphics and multimedia", "Data journalism", "Investigative and solutions", "Breaking news and features"];

        svg.selectAll("line.categoryLine")
            .data(categories)
            .enter()
            .append("line")
            .attr("class", "categoryLine")
            .attr("x1", (d, i) => (i + 1) / 4 * width)
            .attr("x2", (d, i) => (i + 1) / 4 * width)
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke", "white")
            .attr("stroke-width", 2)

        svg.selectAll("text.categoryLabel")
            .data(categories)
            .enter()
            .append("text")
            .text(d => d)
            .attr("class", "categoryLabel")
            .attr("x", (d, i) => (i + 0.5) / 4 * width)
            .attr("y", 32)
            .attr("text-anchor", "middle")
            .style("font-family", "FB")
            .style("text-transform", "uppercase")
            .attr("fill", "white");

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
                            // .on("mouseover", () => screen.style("display", "block").style("opacity", 1))
                            // .on("mouseout", () => screen.style("display", "none").style("opacity", 0));
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
                            // .on("mouseover", () => screen.style("display", "block").style("opacity", 1))
                            // .on("mouseout", () => screen.style("display", "none").style("opacity", 0));

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

    function scrollUpdate({data, direction}) {
        const height = window.innerHeight;
        const width = window.innerWidth;

        if (data === 2) {
            d3.selectAll("line.categoryLine").style("opacity", 0.25);
            d3.selectAll("text.categoryLabel").style("opacity", 0.8);

            simulation.force("center").strength(0);
            simulation.force("x").x(d => (0.5 + d.category) / 4 * width - (d.width || 386) / 2).strength(1);
            simulation.force("y").y(height / 2).strength(0.2);
        } else {
            d3.selectAll("line.categoryLine, text.categoryLabel").style("opacity", 0);

            simulation.force("x").strength(0);
            simulation.force("y").strength(0);
            simulation.force("center").strength(1.5);
        }

        simulation.alpha(1).restart();
    }

    return (
        <>
            <Scrollama onStepEnter={scrollUpdate}>
                <Step data={1}>
                    <div className="h-screen relative z-10">
                        <div className="p-12 bg-white bg-opacity-90 rounded-md border border-box w-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                            <h1 className="font-tn font-bold text-4xl">Good {TOD}, LA Times.<br/>Welcome to my portfolio.</h1>
                            <ul className="font-benton list-disc pl-4">
                                <li className="mt-6">I’m a student journalist at Pomona College in LA applying to be a data and graphics intern this summer.</li>
                                <li className="mt-6">This is an interactive portfolio showcasing how I’ve <b>served communities as a data journalist, designer and reporter.</b></li>
                            </ul>
                            <div className="flex items-center pt-6 mt-6 border-t border-neutral-400">
                                <img src="/profile.jpg" alt="Headshot of Samson Zhang" className="w-12 h-12 rounded-full"/>
                                <div className="ml-4">
                                    <p className="font-tn text-xl">Samson Zhang</p>
                                    <a href="https://twitter.com/wwsalmon" className="mt-1 text-neutral-600 text-xs flex items-center font-medium font-benton">
                                        <FaTwitter/>
                                        <span className="ml-1">Twitter</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Step>
                <Step data={2}>
                    <div className="h-screen relative z-10">
                        <div className="p-12 bg-white bg-opacity-90 rounded-md border border-box w-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                            <h1 className="font-benton text-2xl">I've worked the whole range, from <b>software engineer</b> at a startup to <b>breaking news reporter</b> at a non-profit newsroom and everything in-between.</h1>
                            <ul className="font-benton list-disc pl-4">
                                <li className="mt-6">2020-22: <b>covered California AAPI activism and politics</b> for <img src="/yappie.png" alt="Logo of The Yappie" className="w-5 h-5 inline"/> <a href="http://theyappie.com/" className="text-link underline"><i>The Yappie</i></a>, an AAJA-sponsored non-profit newsroom read by members of Congress, white house staff and advocacy leaders</li>
                                <li className="mt-6">2021-22: data pieces I produced at my school paper, <img src="/tsl.jpg" alt="Logo of The Student Life" className="w-5 h-5 inline"/> <a href="https://tsl.news/author/samson-zhang/" className="text-link underline"><i>The Student Life</i></a>, have been awarded <b>"Best Interactive Graphic" and "Best COVID Reporting" of 2021</b> by the California College Media Association.</li>
                                <li className="mt-6">2021: a blogging <b>startup I founded</b> was selected to interview for <img src="/ycombinator.png" alt="Logo of Y Combinator" className="w-5 h-5 inline"/> <a href="https://www.ycombinator.com/" className="text-link underline">Y Combinator</a>, the <b>incubator behind Doordash, Dropbox and Reddit</b>. More than a million words have been published on my platform to date.</li>
                            </ul>
                        </div>
                    </div>
                </Step>
            </Scrollama>
            <div className="sticky left-0 bottom-0 w-full h-screen">
                <svg ref={svgRef}/>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden" ref={divRef}></div>
            </div>
            <div className="max-w-4xl mx-auto my-20 px-4" id="featured">
                <h1 className="text-tn leading-tight text-4xl max-w-2xl mb-8">Here are four selected projects that show what I'm all about.</h1>
                <p className="text-lg text-neutral-600">Click through the four scenarios below to unlock my final message!</p>
                <hr className="my-12"/>
                <BottomBar inline={true} onReset={() => setReadList([])}/>
                <div className="grid grid-cols-2 gap-x-4 text-white my-24">
                    {highlightedProjects.map((d, i) => (
                        <Card index={i + 1} title={d.title} read={readList.includes(d.id)} key={d.id} id={d.id}/>
                    ))}
                </div>
            </div>
        </>
    );
}

function Card({index, title, read, id}: {index: number, title: string, read: boolean, id: string}) {
    return (
        <Link href={`/${id}`} className={classNames(read ? "bg-zinc-400 hover:scale-[1.02] hover:shadow-lg" : "bg-zinc-800 hover:scale-105 hover:shadow-xl", "p-4 rounded-md mb-4 flex flex-col justify-between relative card transform transition")}>
            {read && (
                <p className="absolute top-4 right-4 font-bold font-fb uppercase tracking-wide">READ</p>
            )}
            <h2 className="font-benton text-2xl font-bold mb-8">{index}.</h2>
            <p className="text-3xl font-tn">{title}</p>
        </Link>
    )
}