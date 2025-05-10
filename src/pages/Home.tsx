// src/pages/Home.tsx
import HomeCards from "../components/HomeCards";
import ProductScroll from "../components/ProductScroll";
import RichText from "../components/RichText";

const Home = () => {
  return (
    <div className="flex-column">
      <img
        className="home-banner"
        src="/src/assets/images/fragrances-hero.jpg"
      />

      <RichText>{"Welcome to Our Store"}</RichText>

      <div className="home-column__grid">
        <section className="grid__cards">
          <HomeCards
            id="groceries"
            img="/src/assets/images/groceries.jpg"
            label="Groceries"
            href="/products?cat=groceries"
          />
          <HomeCards
            id="furniture"
            img="/src/assets/images/furniture.jpg"
            label="Furniture"
            href="/products?cat=furniture"
          />
        </section>
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <div>
        <img
          className="home-banner"
          src="/src/assets/images/fragrances-hero.jpg"
        />
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <div className="home-column__grid">
        <h2 className="text-3xl">New Arrivals</h2>
        <ProductScroll limit={8} />
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <div className="home-column__grid">
        <section className="grid__cards">
          <HomeCards
            id="beauty"
            img="/src/assets/images/beauty.jpg"
            label="Beauty"
            href="/products?cat=beauty"
          />
          <HomeCards
            id="fragrances"
            img="/src/assets/images/fragrances.jpg"
            label="Fragrances"
            href="/products?cat=fragrances"
          />
        </section>
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <div className="home-column__grid">
        <section className="section">
          <h2 className="text-xl font-semibold">Popular Items</h2>
          <ProductScroll
            limit={8}
            offset={8}
          />
        </section>
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <div>
        <img
          className="home-banner"
          src="/src/assets/images/fragrances-hero.jpg"
        />
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <div className="home-column__grid">
        <section className="grid__cards">
          <HomeCards
            id="beauty"
            img="/src/assets/images/beauty.jpg"
            label="Beauty"
            href="/products?cat=beauty"
          />
          <HomeCards
            id="fragrances"
            img="/src/assets/images/fragrances.jpg"
            label="Fragrances"
            href="/products?cat=fragrances"
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
