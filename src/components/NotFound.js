import { Link } from "react-router-dom";
import { useEffect } from "react";
import '../components/assets/NotFound.scss';
import Lottie from "lottie-react";
import notFoundAnimation from './images/page_not_found.json';


export default function NotFound() {
    useEffect(() => {
        document.body.classList.add('not_found-page');
        return () => {
            document.body.classList.remove('not_found-page');
        };
    }, []);

    return (
        <div className="not_found">
            <Lottie animationData={notFoundAnimation} loop={true} className="not_found-animation" />
            <Link to='/' className="go_home">Go Home</Link>
        </div>
    )
}

