import PageContainer from "../components/PageContainer";
import PageEmbed from "../components/PageEmbed";
import PageContent from "../components/PageContent";
import PageH2 from "../components/PageH2";

export default function Covid() {
    return (
        <PageContainer id="covid">
            <PageEmbed url="https://covid.tsl.news/"/>
            <hr className="my-12"/>
            <PageH2>Where do Claremont Colleges community members turn for COVID information? <b>Not official dashboards.</b></PageH2>
            <PageContent>
                <p>The five Claremont Colleges share a campus, and on average students cross-enroll for more than 40% of their classes.</p>
                <p>Yet official COVID testing reporting is separated by school, with five websites displaying data at different frequencies and in different formats, making it difficult to get a sense of COVID risk on campus.</p>
            </PageContent>
            <img src="/school-dashboards.png" alt="Compilation of five screenshots for each Claremont College COVID dashboard, showing varied layouts" className="my-16"/>
            <hr className="my-12"/>
            <PageH2><b>My work filled in the gaps</b> to keep the community informed and safe.</PageH2>
            <PageContent>
                <p>In September 2021, I developed the 5C COVID dashboard, a single interface collecting up-to-date and historical testing data from the five Claremont Colleges. Initially created for students, soon faculty and staff told us that they relied on the dashboard to make decisions about COVID policy for their classes.</p>
                <p>When I noticed inconsistencies in published COVID data, I developed a tool to <a
                    href="https://github.com/wwsalmon/tsl-covid-screenshotter">take a screenshot of every school
                    dashboard every day</a>. The tool <a href="https://tsl.news/shs-overcounted-covid-cases/">exposed
                    multiple over-counting errors</a> and led to a statement and correction from administrators.</p>
                <p>The dashboard also informed our coverage of campus COVID surges and policy changes. It was part of a package that was <b>awarded Best COVID Coverage of 2021 by the California College Media Association.</b></p>
            </PageContent>
            <img src="/covid1.png" alt="COVID information graphic with the title 'Positivity rate reaches 10%' and a bar graph showing case counts at each school" className="my-16"/>
            <img src="/covid2.png" alt="Compilation of six COVID information graphics showing a spike in case counts and policy changes across the Claremont Colleges" className="my-16"/>
        </PageContainer>
    )
}