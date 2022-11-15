import { Scrollama, Step } from 'react-scrollama';


export default function Test() {
    function onStepEnter(d) {
        console.log(d);
    }

    return (
        <Scrollama onStepEnter={onStepEnter}>
            <Step data={1}>
                <div className="h-screen">step1</div>
            </Step>
            <Step data={2}>
                <div className="h-screen">step2</div>
            </Step>
        </Scrollama>
    )
}