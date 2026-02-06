// src/pages/Home.tsx — composes the marketing homepage (route/view) using reusable components (UI)
import { Banner, CategoryGrid, RichText, Scrollbar, FullBleedImage } from "@/pages/Home/components";
import { gridMiddle, gridTop } from "@/features/products/data/categories";
import heroImg from "@/assets/images/fragrances-hero.jpg";

const Home = () => {
  return (
    <div className="flex-column">
      {/* hero banner at the top (component) */}
      <Banner />

      {/* section heading (typography component) */}
      <RichText>{"Fresh Picks for You"}</RichText>

      {/* grid of category cards (UI grid) */}
      <CategoryGrid cards={gridTop} />

      <RichText>{"Shop by Category"}</RichText>

      {/* full-bleed image strip (layout) */}
      <FullBleedImage src={heroImg} alt="Fragrances hero" />

      {/* horizontal product scroller with start offset 0 (offset) */}
      <Scrollbar offset={0} />

      <RichText>{"Trending Now"}</RichText>

      <CategoryGrid cards={gridMiddle} />

      <RichText>{"Top Rated Deals"}</RichText>

      {/* horizontal product scroller starting further in the list (offset) */}
      <Scrollbar offset={8} />

      <RichText>{"Fragrance Spotlight"}</RichText>

      <FullBleedImage src={heroImg} alt="Fragrances hero" />

      <RichText>{"More to Explore"}</RichText>

      <CategoryGrid cards={gridTop} />
    </div>
  );
};

export default Home;
