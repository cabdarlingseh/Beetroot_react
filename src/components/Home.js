import Lottie from "lottie-react";
import Welcome from '../components/images/welcome.json';

export default function Home() {
    return (
        <div>
            <Lottie animationData={Welcome} loop={true} className="welcome" />
        </div>
    )
}