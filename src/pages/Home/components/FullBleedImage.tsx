type Props = {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
};

const FullBleedImage: React.FC<Props> = ({ src, alt, loading = 'lazy' }) => ( // full-bleed image section
  <div className="full-bleed">
    <img className="flex-column__banner w-full h-auto" src={src} alt={alt} loading={loading} /> {/* edge-to-edge banner */}
  </div>
);

export default FullBleedImage;
