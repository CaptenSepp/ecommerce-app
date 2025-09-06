// src/pages/Home.tsx
import { Banner, CategoryGrid, RichText, Scrollbar } from "@/pages/Home/components";
import { gridMiddle, gridTop } from "@/features/products/data/categories";
import heroImg from "@/assets/images/fragrances-hero.jpg";

const Home = () => {
  return (
    <div className="flex-column">
      <Banner/>

      <RichText>{"Fresh Picks for You"}</RichText>

      <CategoryGrid cards={gridTop} />

      <RichText>{"Shop by Category"}</RichText>

      <div>
        <img
          className="flex-column__banner full-bleed"
          src={heroImg}
          alt="Fragrances hero"
        />
      </div>

      <Scrollbar count={0} />

      <RichText>{"Trending Now"}</RichText>

      <CategoryGrid cards={gridMiddle} />

      <RichText>{"Top Rated Deals"}</RichText>

      <Scrollbar count={8} />

      <RichText>{"Fragrance Spotlight"}</RichText>

      <div>
        <img
          className="flex-column__banner full-bleed"
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
