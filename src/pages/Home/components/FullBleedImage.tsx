// full-bleed image section (layout) with optional lazy loading (performance)
type Props = {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
};

const FullBleedImage: React.FC<Props> = ({ src, alt, loading = 'lazy' }) => (
  <div className="full-bleed">
    {/* edge-to-edge banner image (layout) */}
    <img className="flex-column__banner w-full h-auto" src={src} alt={alt} loading={loading} />
  </div>
);

export default FullBleedImage;
