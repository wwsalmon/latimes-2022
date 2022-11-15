import {ReactNode} from "react";
import BottomBar from "./BottomBar";
import Link from "next/link";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Head from "next/head";
import {highlightedProjects} from "../pages";

export default function PageContainer({children, id}: { children: ReactNode, id: string }) {
    const thisProject = highlightedProjects.find(d => d.id === id);

    return (
        <div className="mx-auto px-4 max-w-3xl my-16 pb-32">
            <Head>
                <title>{thisProject.hed} | Samson's interactive portfolio</title>
            </Head>
            <p className="uppercase font-fb tracking-wide uppercase font-bold mb-4 text-center">Project {thisProject.index}</p>
            <h1 className="text-center text-6xl max-w-2xl mx-auto font-tn font-bold text-center mb-10">{thisProject.hed}</h1>
            <p className="max-w-2xl text-lg text-center mx-auto font-benton text-neutral-500">{thisProject.dek}</p>
            {children}
            <Link href="/#featured"  className="px-8 mx-auto block flex items-center justify-center border border-black bg-zinc-100 hover:bg-zinc-200 my-4 p-4 rounded-md font-benton text-sm">
                <FiArrowLeft/><span className="ml-2">Back home</span>
            </Link>
            {thisProject.index < 4 && (
                <Link href={`/${highlightedProjects[thisProject.index].id}`}  className="px-8 mx-auto block flex items-center justify-center bg-black hover:bg-zinc-800 text-white p-4 rounded-md font-benton text-sm">
                    <span className="mr-2">Next: {highlightedProjects[thisProject.index].hed}</span><FiArrowRight/>
                </Link>
            )}
            {thisProject.index === 4 && (
                <Link href="/#featured" className="px-8 mx-auto block flex items-center justify-center bg-black hover:bg-zinc-800 text-white p-4 rounded-md font-benton text-sm">
                    <span className="mr-2">Read my final message</span><FiArrowRight/>
                </Link>
            )}
            <BottomBar/>
        </div>
    )
}