import PageContainer from "../components/PageContainer";
import PageContent from "../components/PageContent";
import PageH2 from "../components/PageH2";

export default function Admissions() {
    return (
        <PageContainer id="admissions">
            <iframe
                src="https://idyll.pub/post/tsl-pomona-admissions-2025-37d26b9ee85d2445bd19a155/"
                className="relative my-16"
                style={{
                    width: "calc(100vw + 24px)",
                    left: "calc(-50vw + 50% - 12px)",
                    height: "calc(100vh - 128px)"
                }}
                loading="lazy"
            />
            <PageContent>
                <PageH2>A troubling trend, or something else?</PageH2>
                <p>At a faculty meeting, <i>The Student Life</i> got a tip that the <b>class of 2025 had significantly fewer Black and first generation/low income students</b> than previous years — months before such data was released publicly. There was a buzz in the community: was Pomona slacking on its commitment to diversity and inclusivity?</p>
                <p>After interviewing the Dean of Admissions and examining the data, <b>we found another explanation</b>: the 83 students from the class of 2024 who deferred due to the pandemic — none of whom were first generation or low income.</p>
                <p>This data story visually explained COVID's effect on the composition of the Pomona student body. It's one of the first data stories I worked on for <i>The Student Life</i>, and it remains among my favorite.</p>
                <p>This piece was awarded <b>Best Interactive Graphic of 2021</b> by the California College Media Association.</p>
            </PageContent>
        </PageContainer>
    )
}