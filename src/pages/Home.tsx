import { Banner, CategoryGrid, RichText, Scrollbar, FullBleedImage } from "@/pages/Home/components";
import { gridMiddle, gridTop } from "@/features/products/data/categories";
import heroImg from "@/assets/images/fragrances-hero.jpg";

const Home = () => { // marketing home composed of sections
  return (
    <div className="flex-column">
      {/* hero banner at the top */}
      <Banner />

      <RichText>{"Fresh Picks for You"}</RichText> {/* section heading */}

      <CategoryGrid cards={gridTop} /> {/* grid of category cards */}

      <RichText>{"Shop by Category"}</RichText>

      <FullBleedImage src={heroImg} alt="Fragrances hero" /> {/* full-bleed image strip */}

      <Scrollbar offset={0} /> {/* horizontal product scroller */}

      <RichText>{"Trending Now"}</RichText>

      <CategoryGrid cards={gridMiddle} />

      <RichText>{"Top Rated Deals"}</RichText>

      <Scrollbar offset={8} /> {/* horizontal product scroller (offset) */}

      <RichText>{"Fragrance Spotlight"}</RichText>

      <FullBleedImage src={heroImg} alt="Fragrances hero" />

      <RichText>{"More to Explore"}</RichText>

      <CategoryGrid cards={gridTop} />
    </div>
  );
};

export default Home;
