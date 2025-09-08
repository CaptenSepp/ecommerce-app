// src/pages/Home.tsx
import { Banner, CategoryGrid, RichText, Scrollbar, FullBleedImage } from "@/pages/Home/components";
import { gridMiddle, gridTop } from "@/features/products/data/categories";
import heroImg from "@/assets/images/fragrances-hero.jpg";

const Home = () => {
  return (
    <div className="flex-column">
      <Banner />

      <RichText>{"Fresh Picks for You"}</RichText>

      <CategoryGrid cards={gridTop} />

      <RichText>{"Shop by Category"}</RichText>

      <FullBleedImage src={heroImg} alt="Fragrances hero" />

      <Scrollbar offset={0} />

      <RichText>{"Trending Now"}</RichText>

      <CategoryGrid cards={gridMiddle} />

      <RichText>{"Top Rated Deals"}</RichText>

      <Scrollbar offset={8} />

      <RichText>{"Fragrance Spotlight"}</RichText>

      <FullBleedImage src={heroImg} alt="Fragrances hero" />

      <RichText>{"More to Explore"}</RichText>

      <CategoryGrid cards={gridTop} />
    </div>
  );
};

export default Home;
