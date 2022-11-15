import {useEffect, useState} from "react";
import classNames from "classnames";
import {useRouter} from "next/router";

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
            <div className={classNames(!inline && "max-w-2xl mx-auto px-4")}>
                <p>You've read {readList.length} of 4 scenarios.</p>
                <div className="w-full h-4 bg-zinc-200 my-2 relative">
                    <div className={classNames("absolute h-full bg-green-500", {1: "w-1/4", 2: "w-1/2", 3: "w-3/4", 4: "w-full"}[readList.length])}></div>
                </div>
                {inline && (readList.length === 4) ? (
                    <>
                        <div className="px-4 py-2 rounded-md bg-amber-100 border-4 shadow-xl">
                            <p>I hope this portfolio gave you a sense of my technical and reporting skills. You might be interested to know that <a href="https://github.com/wwsalmon/seattle-times-2022">this site itself was built from scratch</a> using React, or that I spent a gap year <a href="https://www.samsonzhang.com/building">working as a software engineer</a> at several venture-backed startups, or that I even <a href="https://webdevformakers.vercel.app/">teach a web development class</a> at my college.</p>
                            <p>But the core of my passion for journalism has always centered on people. Ever since I wrote a piece about a <a
                                href="https://theyappie.com/author/samsonzhang/">decade of California anti-ICE organizing</a>, solutions journalism has been far and away my favorite form of journalism -- a form that <a
                                href="https://www.seattletimes.com/education-lab/">The Seattle Times helped to pioneer</a>.</p>
                            <p>I'll never forget stumbling into a rally in San Francisco Chinatown, abandoning my plans to get interviews and making it my <a
                                href="https://theyappie.com/aapi-activists-rising-above-hate/">first ever non-student paper pitch</a>.</p>
                            <p>I would love to continue my human-driven and technical journalism journeys at The Seattle Times this summer.</p>
                            <img src="/people.jpg" alt=""/>
                            <p>Thank you for taking the time to read and consider my application!</p>
                            <button className="px-6 py-2 bg-black text-white my-8 mx-auto rounded-md hover:bg-zinc-700 block" onClick={resetReads}>Reset story reads</button>
                        </div>
                    </>
                ) : (
                    <p className="text-right">Click through all four stories below to unlock my final message.</p>
                )}
            </div>
        </div>
    )
}