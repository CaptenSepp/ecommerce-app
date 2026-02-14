import heroImg from "@/assets/images/fragrances-hero.jpg"; // placeholder image

const cards = [ // featured collections
  { title: "Summer Essentials", cta: "Shop Collection" },
  { title: "Daily Rituals", cta: "Explore Set" },
  { title: "Fresh Finds", cta: "Browse Picks" },
];

const FeaturedCollectionGrid = () => ( // featured grid section
  <section className="featured-grid"> {/* section wrapper */}
    <div className="featured-grid__title">Featured Collections</div> {/* section title */}
    <div className="featured-grid__cards"> {/* cards grid */}
      {cards.map((card) => (
        <div key={card.title} className="featured-card"> {/* collection card */}
          <img src={heroImg} alt={card.title} className="featured-card__image" /> {/* background image */}
          <div className="featured-card__overlay" aria-hidden="true" /> {/* gradient overlay */}
          <div className="featured-card__content"> {/* text + button */}
            <div className="featured-card__title">{card.title}</div> {/* collection name */}
            <button type="button" className="btn btn-primary">{card.cta}</button> {/* CTA */}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedCollectionGrid;
