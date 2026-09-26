import { FiFastForward } from "react-icons/fi"
import Button from "../ui/button"
import Image from "next/image"

const HeroSection = () => {
    return <section id="hero-section" className="container mx-auto h-screen flex">
        <div className="relative self-center">
            <Image 
            src="/images/clipart906923.png" 
            width={465} 
            height={465} 
            alt="image the daily grind" 
            className="grayscale absolute left-20 -top-10" />
            <div className="relative ml-40 w-full">
                <div className="text-primary italic">Friday Sale, 50%</div>
                <h1 className="font-extrabold text-[95px] italic bg-gradient-to-b leading-tight from-black to-[#979797] bg-clip-text text-transparent">
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
            src="/images/products/product-3.png" 
            width={600} 
            height={850} 
            alt="image sporton hero"
            className="absolute -right-13 top-1/2 -translate-y-1/2" />
        </div>
        <Image 
        src="/images/img-ornament-hero.png" 
        width={185} 
        height={185} 
        alt="image sporton" 
        className="absolute -right-[40px] top-1/2 -translate-y-1/2"/>
    </section>
}

export default HeroSection