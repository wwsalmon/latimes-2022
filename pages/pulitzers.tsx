import PageContainer from "../components/PageContainer";
import PageEmbed from "../components/PageEmbed";
import TweetEmbed from "react-tweet-embed";
import PageH2 from "../components/PageH2";
import PageContent from "../components/PageContent";

export default function Pulitzers() {
    return (
        <PageContainer id="pulitzers">
            <div className="grid grid-cols-4 gap-x-4 my-16 relative" style={{
                width: "calc(100vw - 64px)",
                left: "calc(-50vw + 50% + 32px)"
            }}>
                <TweetEmbed tweetId="1553580536248930304"/>
                <TweetEmbed tweetId="1553766124680101888"/>
                <TweetEmbed tweetId="1553785560002490369"/>
                <TweetEmbed tweetId="1553755909976776711"/>
            </div>
            <PageH2>Judges of color still find themselves the only member of their race or ethnicity in the room.</PageH2>
            <Embed url="https://wwsalmon.github.io/aaja-voices-vis/demographics/hispanic" height={450}/>
            <Embed url="https://wwsalmon.github.io/aaja-voices-vis/demographics/asian" height={480}/>
            <Embed url="https://wwsalmon.github.io/aaja-voices-vis/demographics/black" height={450}/>
            <PageContent>
                <p>In April 2022, OpenNews published an open letter to the Pulitzer Prize board, calling for the prize to play a bigger part in pushing for diversity in the news industry, in which <a href="https://www.pewresearch.org/fact-tank/2018/11/02/newsroom-employees-are-less-diverse-than-u-s-workers-overall/">77% of newsroom workers</a> are still non-Hispanic white.</p>
                <p>That got the Asian American Journalists Association Voices program investigative team thinking: what does diversity look like on the prize boards themselves?</p>
                <p>We were shocked to find that, <b>in its 104-year history, the Pulitzer Prizes has only had one Asian American voting judge</b> — who wasn't appointed until 2020.</p>
                <p>We embarked on two months of tireless outreach to collect a first-of-its-kind dataset on the racial and ethnic identities of top prize judges, as well as conducting in-depth interviews with news leaders and prize administrators.</p>
                <img src="/aaja-wip.png" alt="Screenshot of spreadsheet used in the outreach process, showing rows of judges, outreach status and other information" className="my-16 rounded-md border-4 shadow-lg"/>
                <p>I <a href="https://github.com/wwsalmon/aaja-voices-scraping">created a web scraper</a> to get initial data across four prize boards. I handled outreach and interviews for the Livingston Awards, and <b>created all interactive graphics</b> in the final piece.</p>
                <Embed url="https://aaja-voices-table.vercel.app/"/>
                <p>The final piece was <a href="https://objectivejournalism.org/2022/08/journalism-awards-lack-diverse-judges/">republished by <b>The Objective</b>.</a></p>
                <img src="/aaja-pub.png" alt="Screenshot of piece re-published in The Objective" className="my-16 rounded-md border-4 shadow-lg"/>
            </PageContent>
        </PageContainer>
    )
}

function Embed({url, height}: { url: string, height?: number }) {
    return (
        <iframe
            src={url}
            className="relative border-4 rounded-lg shadow-2xl my-16"
            style={{height: height || 800, width: "calc(1200px)", left: "calc(-600px + 50%)"}}
        ></iframe>
    )
}