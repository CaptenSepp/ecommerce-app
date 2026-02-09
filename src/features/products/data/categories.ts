export interface CategoryCard { // category card for home and nav
  id: string;
  img: string;
  label: string;
  href: string;
}

export const categoryCards: CategoryCard[] = [ // primary category cards
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

export const gridTop = categoryCards.slice(0, 2); // top row cards
export const gridMiddle = categoryCards.slice(2, 4); // middle row cards
import imgGroceries from '../../../assets/images/groceries.jpg'; // groceries image
import imgFurniture from '../../../assets/images/furniture.jpg'; // furniture image
import imgBeauty from '../../../assets/images/beauty.jpg'; // beauty image
import imgFragrances from '../../../assets/images/fragrances.jpg'; // fragrances image
