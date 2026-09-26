"use client";

import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import Image from "next/image"
import { Category } from "@/app/types"
import { getImageUrl } from "@/app/lib/api"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type TCategoriesProps = {
    categories: Category[]
}

const CategoriesSection = ({categories}: TCategoriesProps) => {
    const settings = {
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return <section id="category-section" className="container mx-auto">
        <div className="flex justify-between">
            <h2 className="font-bold text-2xl">Browse By Categories</h2>
            <Link href="#" className="flex gap-2 text-primary font-medium">
                <span className="self-center">See All Categories</span>
                <FiArrowRight className="self-center" />
            </Link>
        </div>
        <div className="mt-8">
            <Slider {...settings}>
                {categories.map((category) => (
                    <div
                        className="mx-10"
                        key={category._id}
                    >
                        <div className="self-center rounded-lg bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] w-[75%] h-[75%] space-x-3 p-10">
                            <Image 
                                src={getImageUrl(category.imageUrl)} 
                                width={106} 
                                height={106} 
                                alt={category.name}
                                unoptimized={true}
                                className="mb-[10px] mx-auto"
                            />
                            <div className="text-primary font-medium text-2xl text-center">
                                {category.name}
                            </div>
                        </div>
                    </div>
                )
                    )
                }
            </Slider>
        </div>
    </section>
}

export default CategoriesSection