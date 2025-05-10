// src/components/HeroBanner.tsx
import { Link } from "react-router-dom";

interface Props {
  id: string;
  img: string;
  label: string;
  href: string;
}

const HomeCards = ({ img, label, href }: Props) => {
  return (
    <div className="relative group h-64 sm:h-80 overflow-hidden rounded-lg">
      {/* Static image background */}
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover transition duration-300 group-hover:brightness-110"
      />

      {/* Overlay for darker readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Navigation button only clickable element */}
      <Link
        to={href}
        className="absolute left-1/8 bottom-4 -translate-x-1/2 btn btn-primary btn-sm "
      >
        {label}
      </Link>
    </div>
  );
};

export default HomeCards;

//    <Link
//       to={href}
//       className="relative group h-64 sm:h-80 overflow-hidden"
//     >
//       <img
//         src={img}
//         alt={label}
//         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//       />
//       <span className="absolute inset-0 bg-black/30" />
//       <span className="absolute inset-x-0 bottom-4 text-center text-xl font-semibold text-brand-white">
//         {label}
//       </span>
//     </Link>
