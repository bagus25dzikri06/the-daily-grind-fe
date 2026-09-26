import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return <footer className="bg-primary-alternate text-primary">
        <div className="container mx-auto flex justify-between pt-14 pb-24">
            <div className="w-105">
                <Image src="/images/the-daily-grind.png" alt="logo the daily grind footer" width={300} height={300} />
                <p className="mt-8">
                    A cashier service for the best selling coffee shop in the campus.
                </p>
            </div>
            <div className="w-105 grid grid-cols-2">
                <div className="flex gap-7 flex-col">
                    <Link href="#">Home</Link>
                    <Link href="#">Categories</Link>
                    <Link href="#">Explore Menus</Link>
                    <Link href="#">About Us</Link>
                </div>
                <div className="flex gap-7 flex-col">
                    <Link href="#">Instagram</Link>
                    <Link href="#">Facebook</Link>
                    <Link href="#">TikTok</Link>
                    <Link href="#">YouTube</Link>
                </div>
            </div>
        </div>
        <div className="border-t border-t-white/15">
            <div className="container mx-auto py-6.5 flex justify-between">
                <div>The Daily Grind © 2026 All Rights Reserved.</div>
                <div className="grid grid-cols-2 w-105">
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms & Conditions</Link>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer