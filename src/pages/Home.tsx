import { gridMiddle, gridTop } from "@/features/products/data/categories"
import middleBannerImg from "@/assets/images/Banner-middle.png"
import {
  Banner,
  BestSellersRow,
  BrandStoryMini,
  CategoryGrid,
  FeaturedCollectionGrid,
  FullBleedImage,
  NewsletterSignupSection,
  RichText,
  Scrollbar,
  SocialProofSection,
  TrustBar,
} from "@/pages/Home/components"
import { HOME_SECTION_TITLES } from "@/pages/Home/components/HomeSections"

const Home = () => {
  return (
    <div className="flex-column pb-10">
      <Banner />
      <FeaturedCollectionGrid />
      <CategoryGrid cards={gridTop} />

      <BestSellersRow
        title="Best sellers this week"
        subtitle="Most loved picks right now"
      />

      <BrandStoryMini />

      <RichText>{HOME_SECTION_TITLES.freshPicks}</RichText>
      <FullBleedImage src={middleBannerImg} alt="Middle banner" />
      <Scrollbar offset={0} title="Best picks for you" />

      <RichText>{HOME_SECTION_TITLES.trendingNow}</RichText>
      <CategoryGrid cards={gridMiddle} />

      <RichText>{HOME_SECTION_TITLES.topRatedDeals}</RichText>
      <Scrollbar offset={8} title="Best sellers from your region" />

      <SocialProofSection />

      <RichText>{HOME_SECTION_TITLES.fragranceSpotlight}</RichText>
      <TrustBar />
      <NewsletterSignupSection />
    </div>
  )
}

export default Home
