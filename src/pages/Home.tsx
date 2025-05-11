// src/pages/Home.tsx
import CategoryGrid from "../components/home-page/CategoryGrid";
import RichText from "../components/home-page/RichText";
import Scrollbar from "../components/home-page/Scrollbar";
import { gridMiddle, gridTop } from "../data/categories";

const Home = () => {
  return (
    <div className="flex-column">
      <img
        className="flex-column__banner"
        src="/src/assets/images/fragrances-hero.jpg"
      />

      <RichText>{"Welcome to Our Store"}</RichText>

      <CategoryGrid cards={gridTop} />

      <RichText>{"Welcome to Our Store"}</RichText>

      <div>
        <img
          className="flex-column__banner"
          src="/src/assets/images/fragrances-hero.jpg"
        />
      </div>

      <Scrollbar count={0} />

      <RichText>{"Welcome to Our Store"}</RichText>

      <CategoryGrid cards={gridMiddle} />

      <RichText>{"Welcome to Our Store"}</RichText>

      <Scrollbar count={8} />

      <RichText>{"Welcome to Our Store"}</RichText>

      <div>
        <img
          className="flex-column__banner"
          src="/src/assets/images/fragrances-hero.jpg"
        />
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <CategoryGrid cards={gridTop} />
    </div>
  );
};

export default Home;
