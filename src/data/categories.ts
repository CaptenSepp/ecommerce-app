export interface CategoryCard {
  id: string;
  img: string;
  label: string;
  href: string;
}

export const categoryCards: CategoryCard[] = [
  {
    id: "groceries",
    img: imgGroceries,
    label: "Groceries",
    href: "/products?cat=groceries",
  },
  {
    id: "furniture",
    img: imgFurniture,
    label: "Furniture",
    href: "/products?cat=furniture",
  },
  {
    id: "beauty",
    img: imgBeauty,
    label: "Beauty",
    href: "/products?cat=beauty",
  },
  {
    id: "fragrances",
    img: imgFragrances,
    label: "Fragrances",
    href: "/products?cat=fragrances",
  },
];

export const gridTop = categoryCards.slice(0, 2);
export const gridMiddle = categoryCards.slice(2, 4);
import imgGroceries from '../assets/images/groceries.jpg';
import imgFurniture from '../assets/images/furniture.jpg';
import imgBeauty from '../assets/images/beauty.jpg';
import imgFragrances from '../assets/images/fragrances.jpg';
