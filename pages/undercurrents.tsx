import PageContainer from "../components/PageContainer";
import PageContent from "../components/PageContent";
import PageH2 from "../components/PageH2";

export default function Undercurrents() {
    return (
        <PageContainer id="undercurrents">
            <FullImg src="/undercurrents.jpg" alt="Compilation of Claremont Undercurrents articles and posts"/>
            <PageContent>
                <PageH2>Real fights for a better Claremont, LA and world</PageH2>
                <p>In August, Pomona College dining workers entered negotiations with an unsympathetic new treasurer, reaching an impasse that resulted in a strike. LA County's Board of Supervisors began meeting in person again, dragging their feet on an ambitious decarceration plan while thousands of incarcerated Angelenos continue to face horrific conditions in overcrowded jails.</p>
                <p>Student groups have big roles to play in these fights. <b>Claremont students frequently make up more than half of JusticeLA's Board of Supervisors meeting presence</b>, while the Claremont Student Worker Alliance mobilized more than a thousand students, faculty, parents and alumni to pressure Pomona College for better worker wages — a fight with <b>ramifications for the entire Inland Empire</b>.</p>
                <p>But with a 1.5-year gap in being on campus, the only student leaders who have seen pre-COVID organizing are about to graduate, threatening a loss of historic and strategic community knowledge.</p>
                <p>This fall, I left <i>The Student Life</i> to start a <b>publication dedicated to covering campus and community activism</b>. Similar publications existed pre-COVID, but the pandemic shuttered them, leaving <i>The Student Life</i> stretched thin. The publication has already played a significant role in <b>informing and mobilizing students in support of Pomona workers' strike.</b></p>
                <FullImg src="/undercurrents-abolition.jpg" alt="Compilation of Claremont Undercurrents posts showing campus"/>
                <FullImg src="/undercurrents-strike.jpg" alt="Compilation of Claremont Undercurrents posts with interviews of workers during the strike"/>
            </PageContent>
        </PageContainer>
    )
}

function FullImg({src, alt}: {src: string, alt: string}) {
    return (
        <img src={src} alt={alt} style={{width: "calc(100vw - 64px)", left: "calc(-50vw + 50% + 32px)", maxWidth: "unset"}} className="relative block my-16"/>
    )
}