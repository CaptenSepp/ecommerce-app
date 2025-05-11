// Reiner Presentational-Wrapper für eine Gruppe von HomeCards
import CategoryGridCard from "./CategoryGridCard";

interface Card {
  id: string;
  img: string;
  label: string;
  href: string;
}

interface Props {
  cards: Card[];
}

const CategoryGrid = ({ cards }: Props) => (
  // vorhandene Utility-Klasse grid__cards wiederverwenden
  <section className="grid__cards">
    {cards.map((card) => (
      <CategoryGridCard
        key={card.id}
        {...card}
      />
    ))}
  </section>
);

export default CategoryGrid;
