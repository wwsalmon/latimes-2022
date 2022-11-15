import {ReactNode} from "react";
import classNames from "classnames";

export default function PageH2({children, className}: {children: ReactNode, className?: string}) {
    return (
        <h2 className={classNames("font-tn text-4xl", className)}>{children}</h2>
    )
}