import { Link } from "react-router-dom";
import { useProducts } from "../../../features/products/hooks";
import { Product } from "../../../features/products/services";

type ScrollbarProps = {
  count: number;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ count }) => {
  return (
    <div className="flex-column__grid">
      <h2 className="text-3xl">New Arrivals</h2>
      <ProductScroll offset={count} />
    </div>
  );
};

export default Scrollbar;

type ProductScrollProps = {
  limit?: number;
  offset?: number;
};

const ProductScroll = ({ limit = 8, offset = 0 }: ProductScrollProps) => {
  const { data: products = [] } = useProducts();
  const visibleProducts = products.slice(offset, offset + limit);

  return (
    <div className="scroll-row__card">
      {visibleProducts.map((product: Product) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="relative shrink-0 rounded-lg overflow-hidden min-w-[250px] min-h-[180px] bg-cover bg-center"
          style={{ backgroundImage: `url(${product.thumbnail})` }}
          aria-label={`View ${product.title}`}
        >
          <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
          <div className="relative p-3 text-white">
            <p className="font-semibold line-clamp-2">{product.title}</p>
            <p className="text-brand-orange font-bold">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
