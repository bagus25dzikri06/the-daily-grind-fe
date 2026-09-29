import { FiFastForward } from "react-icons/fi"
import Button from "../ui/button"
import Image from "next/image"

const HeroSection = () => {
    return <section id="hero-section" className="container mx-auto h-screen flex">
        <div className="relative self-center">
            <div className="relative ml-40 w-full">
                <div className="text-primary italic">Friday Sale, 50%</div>
                <h1 className="font-extrabold text-[80px] italic bg-gradient-to-b leading-tight from-black to-[#979797] bg-clip-text text-transparent">
                    UNAS&apos; FIRST <br /> POINT OF SALE BASED <br /> COFFEE SHOP
                </h1>
                <p className="w-1/2 mt-10 leading-loose">
                    A cashier service for the best selling coffee shop in the campus.
                </p>
                <div className="flex gap-5 mt-14">
                    <Button className="rounded-lg">Explore More <FiFastForward /></Button>
                    <Button variant="ghost" className="rounded-lg">
                        Watch Video <Image 
                            src="/images/icon-play-video.svg" 
                            alt="icon playvideo" 
                            width={29}
                            height={29}
                        />
                    </Button>
                </div>
            </div>
            <Image 
            src="/images/clipart906923.png" 
            width={400} 
            height={400} 
            alt="image the daily grind hero"
            className="absolute -right-70 top-1/2 -translate-y-1/2" />
        </div>
    </section>
}

export default HeroSection