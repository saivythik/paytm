import {Link} from "react-router-dom";

export function BottomWarning({label, buttonLabel, link}) {
    return (
        <div className="text-black text-sm pt-1 px-2 justify-center flex">
            <div>{label}</div>
            <Link to={link} className="text-black underline pl-1 hover:underline-offset-0">{buttonLabel}</Link>
        </div>
    )
}