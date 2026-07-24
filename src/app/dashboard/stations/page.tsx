import { Crosshair, MapPin } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { StationCard } from "@/components/StationCard";

const stations = [
  { name: "Eco-Fuel Express", distance: "0.8 km", fuel: "Gasohol 95", price: "34.20" },
  { name: "City Center Gas", distance: "1.4 km", fuel: "Diesel B7", price: "34.90" },
  { name: "Value Stop Station", distance: "2.3 km", fuel: "Gasohol E20", price: "32.80", featured: true },
];

export default function StationsPage() {
  return (
    <main className="app-canvas">
      <section className="mobile-page">
        <AppHeader active="stations" />
        <header className="stations-hero">
          <h1>Nearby Stations</h1>
          <div><button className="button button-secondary">Sort by Price</button><button className="button button-secondary">All Filters</button></div>
        </header>
        <div className="map-panel">
          <div className="map-grid" />
          {[
            ["18%", "28%"], ["38%", "66%"], ["55%", "39%"],
            ["69%", "74%"], ["83%", "52%"], ["89%", "18%"],
          ].map(([left, top], index) => (
            <span className="map-pin" style={{ left, top }} key={index}><MapPin size={16} /></span>
          ))}
          <button type="button" className="locate-button" aria-label="Use my location"><Crosshair size={22} /></button>
        </div>
        <div className="page-content stations-content">
          <div className="filter-group">
            <span>Fuel type</span>
            <div className="chip-row">
              <button className="chip selected">95</button>
              <button className="chip">91</button>
              <button className="chip">E20</button>
              <button className="chip">B7</button>
            </div>
          </div>
          <div className="filter-group">
            <span>Distance</span>
            <div className="chip-row">
              <button className="chip selected">Within 10 km</button>
            </div>
          </div>
          <div className="filter-group">
            <span>Company</span>
            <div className="chip-row">
              <button className="chip">PTT</button>
              <button className="chip">PT</button>
              <button className="chip">Bangchak</button>
            </div>
          </div>
          <div className="section-heading station-heading"><h2>Nearby stations</h2><span>8 found</span></div>
          <div className="station-list">
            {stations.map((station) => <StationCard key={station.name} {...station} />)}
          </div>
          <p className="results-note">Showing closest results near you</p>
        </div>
      </section>
    </main>
  );
}
