export interface CategoryCard {
  id: string;
  img: string;
  label: string;
  href: string;
}

export const categoryCards: CategoryCard[] = [
  {
    id: "groceries",
    img: "/src/assets/images/groceries.jpg",
    label: "Groceries",
    href: "/products?cat=groceries",
  },
  {
    id: "furniture",
    img: "/src/assets/images/furniture.jpg",
    label: "Furniture",
    href: "/products?cat=furniture",
  },
  {
    id: "beauty",
    img: "/src/assets/images/beauty.jpg",
    label: "Beauty",
    href: "/products?cat=beauty",
  },
  {
    id: "fragrances",
    img: "/src/assets/images/fragrances.jpg",
    label: "Fragrances",
    href: "/products?cat=fragrances",
  },
];

export const gridTop = categoryCards.slice(0, 2);
export const gridMiddle = categoryCards.slice(2, 4);
