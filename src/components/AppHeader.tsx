import Link from "next/link";
import { CircleUserRound, Fuel, History, Languages, Search } from "lucide-react";

type AppHeaderProps = {
  active?: "dashboard" | "stations" | "history";
};

export function AppHeader({ active }: AppHeaderProps) {
  return (
    <header className="app-header">
      <Link href="/dashboard" className="brand" aria-label="FuelGuide home">
        <Fuel size={20} strokeWidth={2.2} />
        <span>FuelGuide</span>
      </Link>
      <nav className="header-actions" aria-label="Primary navigation">
        <Link
          href="/dashboard/stations"
          className={`icon-button ${active === "stations" ? "is-active" : ""}`}
          aria-label="Find stations"
        >
          <Search size={20} />
        </Link>
        <button className="icon-button" aria-label="Change language" type="button">
          <Languages size={21} />
        </button>
        <Link
          href="/dashboard/history"
          className={`icon-button ${active === "history" ? "is-active" : ""}`}
          aria-label="Fuel history"
        >
          {active === "history" ? <History size={20} /> : <CircleUserRound size={20} />}
        </Link>
      </nav>
    </header>
  );
}
