import Image from "next/image";
import MenuActions from "../../components/menu-detail/menu-action";
import PriceFormatter from "@/app/utils/price-formatter";
import { getMenuDetail } from "@/app/services/menu.service";
import { getImageUrl } from "@/app/lib/api";

export type TPageProps = {
    params: Promise<{id : string}>
}

const MenuDetail = async ({params}: TPageProps) => {
    const {id} = await params
    const menu = await getMenuDetail(id)

    return (
        <main className="container mx-auto py-20 flex gap-12">
            <div className="bg-primary-alternate aspect-square min-w-140 justify-center items-center">
                <Image 
                src={getImageUrl(menu.imageUrl)}
                width={550} 
                height={550} 
                alt={menu.name} 
                unoptimized={true}
                className="aspect-square object-contain w-full"/>
            </div>
            <div className="w-full py-7">
                <h1 className="font-bold text-5xl mb-4">{menu.name}</h1>
                <div className="bg-primary-alternate rounded-full text-primary py-2 px-6 w-fit mb-5">{menu.category?.name}</div>
                <p className="leading-loose mb-8">{menu.description}</p>
                <div className="text-primary text-[32px] font-semibold mb-12">{PriceFormatter(menu.price)}</div>
                <MenuActions menu={menu} />
            </div>
        </main>
    )
}

export default MenuDetail;