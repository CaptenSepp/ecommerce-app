import summerEssentialsImg from "@/assets/images/summer-essentials.jpg"; // summer card image
import dailyRitualsImg from "@/assets/images/daily-rituals.jpg"; // rituals card image
import freshFindsImg from "@/assets/images/fresh-finds.jpg"; // fresh finds card image

const cards = [ // featured collections
  { title: "Summer Essentials", cta: "Shop Collection", image: summerEssentialsImg },
  { title: "Daily Rituals", cta: "Explore Set", image: dailyRitualsImg },
  { title: "Fresh Finds", cta: "Browse Picks", image: freshFindsImg },
];

const FeaturedCollectionGrid = () => ( // featured grid section
  <section className="featured-grid"> {/* section wrapper */}
    <div className="featured-grid__title">Featured Collections</div> {/* section title */}
    <div className="featured-grid__cards"> {/* cards grid */}
      {cards.map((card) => (
        <div key={card.title} className="featured-card featured-card--inactive"> {/* collection card */}
          <img src={card.image} alt={card.title} className="featured-card__image" /> {/* background image */}
          <div className="featured-card__overlay" aria-hidden="true" /> {/* gradient overlay */}
          <div className="featured-card__content"> {/* text + button */}
            <span className="featured-card__status">Demo Preview</span> {/* demo label */}
            <div className="featured-card__title">{card.title}</div> {/* collection name */}
            <button type="button" className="btn featured-card__btn" disabled aria-disabled="true">{card.cta}</button> {/* disabled CTA */}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedCollectionGrid;
