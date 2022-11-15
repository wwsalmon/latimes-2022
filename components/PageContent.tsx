import {ReactNode} from "react";
import classNames from "classnames";

export default function PageContent({children, className}: {children: ReactNode, className?: string}) {
    return (
        <div className={classNames("content my-8", className)}>
            {children}
        </div>
    );
}