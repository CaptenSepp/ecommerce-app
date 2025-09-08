import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  img: string;
  label: string;
  href: string;
}

interface Props {
  cards: CategoryCardProps[];
}

const CategoryGridCard = ({ img, label, href }: CategoryCardProps) => {
  return (
    <div className="relative group h-64 sm:h-80 overflow-hidden rounded-lg">
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover transition duration-300 group-hover:brightness-110"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/10" />
      <Link
        to={href}
        className="absolute left-1/2 bottom-4 -translate-x-1/2 btn btn-primary btn-sm "
      >
        {label}
      </Link>
    </div>
  );
};

const CategoryGrid = ({ cards }: Props) => (
  <section
    className="grid__cards grid-cols-2"
    style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
  >
    {cards.map((card) => (
      <CategoryGridCard key={card.id} {...card} />
    ))}
  </section>
);

export default CategoryGrid;
