// src/pages/Home.tsx
import Banner from "../components/home-page/Banner";
import CategoryGrid from "../components/home-page/CategoryGrid";
import RichText from "../components/home-page/RichText";
import Scrollbar from "../components/home-page/Scrollbar";
import { gridMiddle, gridTop } from "../data/categories";
import heroImg from "../assets/images/fragrances-hero.jpg";

const Home = () => {
  return (
    <div className="flex-column">
      <Banner/>

      <RichText>{"Welcome to Our Store"}</RichText>

      <CategoryGrid cards={gridTop} />

      <RichText>{"Welcome to Our Store"}</RichText>

      <div>
        <img
          className="flex-column__banner full-bleed"
          src={heroImg}
          alt="Fragrances hero"
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
          className="flex-column__banner full-bleed"
          src={heroImg}
          alt="Fragrances hero"
        />
      </div>

      <RichText>{"Welcome to Our Store"}</RichText>

      <CategoryGrid cards={gridTop} />
    </div>
  );
};

export default Home;
