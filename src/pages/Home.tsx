import { Banner, CategoryGrid, RichText, Scrollbar, FullBleedImage, TrustBar, FeaturedCollectionGrid, BestSellersRow, BrandStoryMini, SocialProofSection } from "@/pages/Home/components";
import { gridMiddle, gridTop } from "@/features/products/data/categories";
import heroImg from "@/assets/images/fragrances-hero.jpg";

const Home = () => { // marketing home composed of sections
  return (
    <div className="flex-column pb-10"> {/* add space before footer */}
      {/* hero banner at the top */}
      <Banner />

      {/* new sections (easy to reorder) */}
      <FeaturedCollectionGrid /> {/* featured collections */}

      <CategoryGrid cards={gridTop} /> {/* category grid */}

      <BestSellersRow title="Best sellers this week" subtitle="Most loved picks right now" /> {/* best sellers row */}

      <BrandStoryMini /> {/* condensed story */}

      {/* existing sections */}
      <RichText>{"Fresh Picks for You"}</RichText> {/* section heading */}

      <FullBleedImage src={heroImg} alt="Fragrances hero" /> {/* full-bleed image strip */}

      <Scrollbar offset={0} title="Best picks for you" /> {/* horizontal product scroller */}

      <RichText>{"Trending Now"}</RichText>

      <CategoryGrid cards={gridMiddle} />

      <RichText>{"Top Rated Deals"}</RichText>

      <Scrollbar offset={8} title="Best sellers from your region" /> {/* horizontal product scroller (offset) */}
      
      <SocialProofSection /> {/* testimonials */}

      <RichText>{"Fragrance Spotlight"}</RichText>

      {/* <FullBleedImage src={heroImg} alt="Fragrances hero" /> */}

      {/* <RichText>{"More to Explore"}</RichText>

      <CategoryGrid cards={gridTop} /> */}

      <TrustBar /> {/* trust strip */}

      <section className="w-full py-10 contact-section"> {/* contact section above footer */}
        <div className="flex w-full flex-col gap-0 px-4 md:flex-row"> {/* split layout */}
          <div className="md:w-1/2"> {/* left image */}
            <img
              src={heroImg} // contact image
              alt="Fragrance hero"
              className="h-full w-full rounded-lg object-cover" // fill space
              loading="lazy" // keep page light
            />
          </div>
          <div className="flex flex-col items-start gap-4 md:w-1/2 contact-form-wrap"> {/* right form only */}
            <div className="text-left"> {/* copy block above form */}
              <h2 className="mb-1 u-text-white">Subscribe to our newsletter</h2> {/* main title */}
              <p className="u-text-sm u-text-white-80"> {/* supporting text */}
                Get fresh deals and product updates delivered weekly.
              </p>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}> {/* static subscribe form */}
              <input className="contact-input" type="text" placeholder="Your name" /> {/* name field */}
              <input className="contact-input" type="email" placeholder="Email address" /> {/* email field */}
              <button type="submit" className="btn btn-primary btn-sm">Subscribe</button> {/* submit button */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
