import { Link } from "react-router-dom";
import { useProducts } from "../../features/products/hooks/productsHooks";
import { Product } from "../../features/products/api";

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
          className="card min-w-[250px] shrink-0"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="scroll-row__card_img"
          />
          <p className="font-medium">{product.title}</p>
          <p className="text-brand-orange font-semibold">${product.price}</p>
        </Link>
      ))}
    </div>
  );
};
