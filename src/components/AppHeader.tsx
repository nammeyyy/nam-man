import Link from "next/link";
import {
  Bell, CircleHelp, Fuel, Gauge, History, MapPinned, PlusCircle,
  Search, Settings, UserRound,
} from "lucide-react";

type AppHeaderProps = {
  active?: "dashboard" | "stations" | "history" | "add";
};

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge, key: "dashboard" },
  { href: "/dashboard/history", label: "Fuel Logs History", icon: History, key: "history" },
  { href: "/dashboard/add", label: "Add Fuel", icon: PlusCircle, key: "add" },
  { href: "/dashboard/stations", label: "Nearby Stations", icon: MapPinned, key: "stations" },
] as const;

export function AppHeader({ active }: AppHeaderProps) {
  return (
    <>
      <aside className="sidebar">
        <Link href="/dashboard" className="brand" aria-label="Nam-man home">
          <span className="brand-mark"><Fuel size={24} /></span>
          <span><b>Nam-man</b><small>Fuel-tracker for my fam</small></span>
        </Link>
        <nav className="sidebar-nav" aria-label="Primary navigation">
          {navigation.map(({ href, label, icon: Icon, key }) => (
            <Link key={key} href={href} className={active === key ? "is-active" : ""}>
              <Icon size={20} /><span>{label}</span>
            </Link>
          ))}
          <span className="nav-disabled"><Settings size={20} />Vehicle Settings</span>
        </nav>
        <div className="sidebar-footer">
          <Link href="/dashboard/add" className="button button-primary"><PlusCircle size={18} /> New Entry</Link>
          <div className="user-card"><span><UserRound size={19} /></span><div><b>User Profile</b><small>Fleet Driver</small></div></div>
        </div>
      </aside>
      <header className="topbar">
        <label className="global-search"><Search size={19} /><input aria-label="Search" placeholder="Search fuel logs or stations..." /></label>
        <nav className="topbar-actions" aria-label="Utilities">
          <button aria-label="Notifications"><Bell size={20} /></button>
          <button aria-label="Help"><CircleHelp size={20} /></button>
          <button aria-label="Settings"><Settings size={21} /></button>
        </nav>
      </header>
      <header className="mobile-header">
        <Link href="/dashboard" className="brand"><span className="brand-mark"><Fuel size={20} /></span><b>Nam-man</b></Link>
        <nav>{navigation.map(({ href, label, icon: Icon, key }) => <Link key={key} href={href} aria-label={label} className={active === key ? "is-active" : ""}><Icon size={20} /></Link>)}</nav>
      </header>
    </>
  );
}
