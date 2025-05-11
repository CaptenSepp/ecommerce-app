import { Link } from "react-router-dom";
import { useProducts } from "../../features/products/hooks/productsHooks";
import { Product } from "../../features/products/api";


interface Props {
  limit?: number;
  offset?: number;
}

const SliderComponent = ({ limit = 8, offset = 0 }: Props) => {
  const { data: products = [] } = useProducts();
  const visible = products.slice(offset, offset + limit);

  return (
    <div className="scroll-row__card">
      {visible.map((p: Product) => (
        <Link
          to={`/products/${p.id}`}
          key={p.id}
          className="card min-w-[250px] shrink-0"
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            className="scroll-row__card__img"
          />
          <p className="font-medium">{p.title}</p>
          <p className="text-brand-orange font-semibold">${p.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default SliderComponent;
