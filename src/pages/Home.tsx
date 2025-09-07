// src/pages/Home.tsx
import { Banner, CategoryGrid, RichText, Scrollbar } from "@/pages/Home/components";
import { gridMiddle, gridTop } from "@/features/products/data/categories";
import heroImg from "@/assets/images/fragrances-hero.jpg";

const Home = () => {
  return (
    <div className="flex-column">
      <Banner />

      <RichText>{"Fresh Picks for You"}</RichText>

      <CategoryGrid cards={gridTop} />

      <RichText>{"Shop by Category"}</RichText>

      {/* NEW: Make banner truly edge-to-edge (full-bleed) */}
      <div className="full-bleed">
        <img
          className="flex-column__banner w-full h-auto"
          src={heroImg}
          alt="Fragrances hero"
        />
      </div>
      <div>
      // scrollbar controller buttons
      </div>
      <Scrollbar count={0} />

      <RichText>{"Trending Now"}</RichText>

      <CategoryGrid cards={gridMiddle} />

      <RichText>{"Top Rated Deals"}</RichText>

      <Scrollbar count={8} />

      <RichText>{"Fragrance Spotlight"}</RichText>

      {/* NEW: Make banner truly edge-to-edge (full-bleed) */}
      <div className="full-bleed">
        <img
          className="flex-column__banner w-full h-auto"
          src={heroImg}
          alt="Fragrances hero"
        />
      </div>

      <RichText>{"More to Explore"}</RichText>

      <CategoryGrid cards={gridTop} />
    </div>
  );
};

export default Home;
