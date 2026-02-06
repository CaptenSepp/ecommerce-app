// hero banner component for the homepage (UI) with background image (asset)
import heroImg from "@/assets/images/fragrances-hero.jpg";

const Banner = () => {
  return (
    <div className="">
      <section className="relative w-screen full-bleed">
        {/* main hero image spans full width (fits width, keeps aspect) (layout) */}
        <img
          src={heroImg}
          alt="Fragrances hero"
          className="block w-full h-auto"
        />

        {/* subtle dark overlay to improve text contrast (UI overlay) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" aria-hidden="true" />

        {/* content overlay stays left-anchored with a responsive offset (layout) */}
        <div className="absolute inset-0">
          <div className="absolute left-[clamp(1rem,3vw,4rem)] top-[clamp(2rem,8vw,10rem)]">
            <div className="max-w-prose">
              <h1>
                Everyday essentials with a
                <strong className="text-brand-orange"> bold</strong>
                
                touch
              </h1>

              <p className="mt-4 text-pretty text-brand-black">
                Discover fresh arrivals and trusted bestsellers curated for your day-to-day.
                Shop quality products, fair prices, fast delivery.
              </p>

              <div className="mt-4 flex gap-4">
                <a className="btn btn-primary" href="/products">
                  Shop Now
                </a>

                <a className="btn btn-secondary" href="/products?sale=1&sort=price-asc">
                  Explore Deals
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
