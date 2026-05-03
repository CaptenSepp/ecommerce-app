import { Leaf, RefreshCcw, ShieldCheck, Truck } from "lucide-react"; // trust icons

const items = [ // trust bar items
  { icon: Truck, title: "Fast Shipping", text: "Free over $50" },
  { icon: ShieldCheck, title: "Secure Checkout", text: "Protected payments" },
  { icon: RefreshCcw, title: "Easy Returns", text: "30-day window" },
  { icon: Leaf, title: "Clean Choices", text: "Thoughtful picks" },
];

const TrustBar = () => ( // USP strip
  <section className="trustbar"> {/* full-width strip */}
    {items.map((item) => { // render items
      const Icon = item.icon; // icon component
      return (
        <div key={item.title} className="trustbar__item"> {/* single item */}
          <Icon className="trustbar__icon" aria-hidden="true" /> {/* icon */}
          <div className="trustbar__text"> {/* text block */}
            <div className="trustbar__title">{item.title}</div> {/* bold title */}
            <div className="trustbar__sub">{item.text}</div> {/* small text */}
          </div>
        </div>
      );
    })}
  </section>
);

export default TrustBar;
