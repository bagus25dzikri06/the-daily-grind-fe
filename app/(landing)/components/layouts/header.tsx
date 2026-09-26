'use client';

import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMenuOrder } from "@/app/hooks/use-menu-order";

const navLinks = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Category',
        href: '#'
    },
    {
        name: 'Explore Menus',
        href: '#'
    }
]

const Header = () => {
    const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false)
    const pathname = usePathname()
    const {items} = useMenuOrder()

    return <header className="fixed w-full z-20 backdrop-blur-xl bg-white/50">
        <div className="flex justify-between gap-10 container mx-auto py-7">
            <Link href="/">
                <Image 
                    src="/images/the-daily-grind.png"
                    alt="SportOn logo"
                    width={300}
                    height={300}
                />
            </Link>
            <nav className="flex gap-24 font-medium">
                {
                    navLinks.map((link) => {
                        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
                        return (
                            <Link 
                                className={isActive ? `relative 
                                after:content-[''] 
                                after:block 
                                after:bg-primary 
                                after:rounded-full 
                                after:h-[3px] 
                                after:w-1/2 
                                after:absolute 
                                after:left-1/2 
                                after:-translate-x-1/2 
                                after:translate-y-1` : `relative 
                                after:content-[''] 
                                after:block  
                                after:rounded-full 
                                after:h-[3px] 
                                after:w-1/2 
                                after:absolute 
                                after:left-1/2 
                                after:-translate-x-1/2 
                                after:translate-y-1`}
                                href={link.href} 
                                key={link.name}>
                                {link.name}
                            </Link>
                        )
                    })
                }
            </nav>
            <div className="relative flex gap-10">
                <FiSearch size={24} />
                <button className="relative cursor-pointer" onClick={() => setIsOrderPopupOpen(!isOrderPopupOpen)}>
                    <FiShoppingBag size={24} />
                    {
                        items.length ? (
                            <div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-white text-center">
                                {items.length}
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </button>
                {isOrderPopupOpen && <CartPopup />}
            </div>
        </div>
    </header>;
}

export default Header;