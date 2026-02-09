import { Link } from "react-router-dom"; // client-side navigation links

interface CategoryCardProps {
  id: string;
  img: string;
  label: string;
  href: string;
}

interface Props {
  cards: CategoryCardProps[];
}

const CategoryGridCard = ({ img, label, href }: CategoryCardProps) => { // single category card
  return (
    <div className="relative group h-64 sm:h-80 overflow-hidden rounded-lg">
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover transition duration-300 group-hover:brightness-110"
        loading="lazy" // lazy-load for performance
        decoding="async" // async decode for smoother paint
      />
      <div className="absolute inset-0 bg-black/10" /> {/* soft overlay for readability */}
      <Link
        to={href}
        className="absolute left-1/2 bottom-4 -translate-x-1/2 btn btn-primary btn-sm "
      >
        {label}
      </Link>
    </div>
  );
};

const CategoryGrid = ({ cards }: Props) => ( // lays out cards in a two-column grid
  <section
    className="grid__cards grid-cols-2"
    style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }} // two equal columns
  >
    {cards.map((card) => (
      <CategoryGridCard key={card.id} {...card} />
    ))}
  </section>
);

export default CategoryGrid;
