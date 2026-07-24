import { Info, Navigation } from "lucide-react";

type StationCardProps = {
  name: string;
  distance: string;
  fuel: string;
  price: string;
  featured?: boolean;
};

export function StationCard({ name, distance, fuel, price, featured }: StationCardProps) {
  return (
    <article className={`station-card ${featured ? "station-card-featured" : ""}`}>
      <div className="station-card-top">
        <div>
          <h3>{name}</h3>
          <p><Navigation size={14} /> {distance} away</p>
        </div>
        {featured && <span className="best-price">Best<br />price</span>}
        <div className="price-badge">
          <small>{fuel}</small>
          <strong>${price}</strong>
        </div>
      </div>
      <div className="station-actions">
        <button type="button" className="button button-secondary">
          <Info size={18} /> Details
        </button>
        <button type="button" className="button button-primary">
          <Navigation size={18} /> Navigate
        </button>
      </div>
    </article>
  );
}
