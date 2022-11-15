import {useEffect, useState} from "react";
import classNames from "classnames";
import {useRouter} from "next/router";
import PageContent from "./PageContent";
import PageH2 from "./PageH2";

export default function BottomBar({inline, onReset}: {inline?: boolean, onReset?: () => void}) {
    const router = useRouter();
    const [readList, setReadList] = useState<string[]>([]);

    useEffect(() => {
        let localReadList = JSON.parse(window.localStorage.getItem("LATreadList") || "[]");
        const thisRoute = router.route.substring(1);
        if (["covid", "pulitzers", "admissions", "undercurrents"].includes(thisRoute) && !localReadList.includes(thisRoute)) {
            localReadList.push(thisRoute);
        }
        setReadList(localReadList);
    }, []);

    useEffect(() => {
        window.localStorage.setItem("LATreadList", JSON.stringify(readList));
    }, [readList]);

    function resetReads() {
        setReadList([]);
        window.localStorage.setItem("LATreadList", "[]");
        if (onReset) onReset();
    }

    return (
        <div className={classNames(!inline && "p-4 fixed w-full bottom-0 bg-white left-0 z-5", "font-benton text-sm")}>
            <div className={classNames(!inline && "max-w-3xl mx-auto px-4")}>
                <p>You've read {readList.length} of 4 scenarios.</p>
                <div className="w-full h-4 bg-zinc-200 my-2 relative">
                    <div className={classNames("absolute h-full bg-green-500", {0: "w-2", 1: "w-1/4", 2: "w-1/2", 3: "w-3/4", 4: "w-full"}[readList.length])}></div>
                </div>
                {inline && (readList.length === 4) ? (
                    <>
                        <div className="px-4 py-2 rounded-md bg-amber-100 border-4 shadow-xl my-16">
                            <PageContent>
                                <PageH2>Give me the chance to serve LA this summer.</PageH2>
                                <p>My passion for journalism has always been rooted in community, and <b>LA is where I've found community</b> these past few years: in fellow students and journalists, in Inland Empire workers, in abolitionist and Asian American organizers.</p>
                                <img src="/Inkedfinal.jpg" alt="Compilation of photos of me interacting with sources, fellow reporters and others in California" className="my-8 p-4 bg-white rounded-md"/>
                                <p>To the <i>Times</i>, I would <b>bring the work I've already done</b> to build community connections and to <b>understand a wide range of experiences lived in LA.</b> I hope to deepen these connections and give back to the community while growing as a journalist, and cannot imagine a better place than the <i>Los Angeles Times</i> to do it this summer.</p>
                                <button className="px-6 py-2 bg-black text-white my-8 mx-auto rounded-md hover:bg-zinc-700 block" onClick={resetReads}>Reset story reads</button>
                                <img src="/irena.png" alt="Screenshot of Slack message between me and my editor, where my editor says 'one day i will learn d3 from you'" className="max-w-sm rounded-md mx-auto block"/>
                            </PageContent>
                        </div>
                    </>
                ) : (
                    <p className="text-right">Click through all four stories below to unlock my final message.</p>
                )}
            </div>
        </div>
    )
}