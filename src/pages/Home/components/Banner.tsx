import topBannerImg from "@/assets/images/Banner-top.png"; // top banner image

const Banner = () => { // hero banner section
  return (
    <div className=""> {/* keep wrapper for layout consistency */}
      <section className="relative w-screen full-bleed overflow-hidden"> {/* frame matches image size */}
        <img src={topBannerImg} alt="Top banner" className="block w-full h-auto" /> {/* full-width hero image */}

        <div className="banner__overlay" aria-hidden="true" /> {/* contrast overlay */}

        <div className="absolute inset-0 flex items-center justify-center text-center"> {/* content overlay */}
          <div className="px-6"> {/* safe padding on small screens */}
            <div className="max-w-prose"> {/* keep readable line length */}
              <h1 className="banner__title"> {/* hero headline */}
                Everyday essentials with a
                <strong className="banner__accent"> BOLD </strong>
                
                touch
              </h1>

              <p className="banner__subcopy mt-4 hidden text-pretty md:block"> {/* hide long subcopy on phones so CTA buttons stay visible */}
                Discover fresh arrivals and trusted bestsellers curated for your day-to-day.
                Shop quality products, fair prices, fast delivery.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-4"> {/* center buttons */}
                <a className="btn btn-primary" href="/products"> {/* primary CTA */}
                  Shop Now
                </a>

                <a className="btn btn-secondary" href="/products?sale=1&sort=price-asc"> {/* secondary CTA */}
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
