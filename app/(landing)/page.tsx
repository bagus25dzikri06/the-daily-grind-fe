import { getAllCategories } from "../services/category.service";
import { getAllMenus } from "../services/menu.service";
import CategoriesSection from "./components/home/categories";
import HeroSection from "./components/home/hero";
import MenuSection from "./components/home/menu";

export default async function Home() {
  const [categories, menus] = await Promise.all([
    getAllCategories(),
    getAllMenus()
  ])
  return <main>
    <HeroSection />
    <CategoriesSection categories={categories} />
    <MenuSection menus={menus} />
  </main>;
}
