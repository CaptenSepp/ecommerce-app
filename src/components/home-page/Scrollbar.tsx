import SliderComponent from "./ProductScroll";

type ScrollbarProps = {
  count: number;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ count }) => {
  return (
    <div className="flex-column__grid">
      <h2 className="text-3xl">New Arrivals</h2>
      <SliderComponent offset={count} />
    </div>
  );
};

export default Scrollbar;
