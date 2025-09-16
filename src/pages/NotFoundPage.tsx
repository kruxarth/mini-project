import { Link } from "react-router-dom";

export default function NotFoundPage(){
    return(
        <div>
            <h1>
                PAGE NOT FOUND
            </h1>
            <Link to={"/"} >GO BACK</Link>
        </div>
    )
}
