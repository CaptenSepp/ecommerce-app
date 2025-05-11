// src/components/HomeCards.tsx
import { Link } from "react-router-dom";

interface Props {
  id: string;
  img: string;
  label: string;
  href: string;
}

const CategoryGridCard = ({ img, label, href }: Props) => {
  return (
    <div className="relative group h-64 sm:h-80 overflow-hidden rounded-lg">
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover transition duration-300 group-hover:brightness-110"
      />

      <div className="absolute inset-0 bg-black/10" />

      <Link
        to={href}
        className="absolute left-1/8 bottom-4 -translate-x-1/2 btn btn-primary btn-sm "
      >
        {label}
      </Link>
    </div>
  );
};

export default CategoryGridCard;
