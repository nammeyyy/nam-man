import { redirect } from "next/navigation";
import { Download, Gauge, Leaf, MapPin, TrendingDown, WandSparkles } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { calculateEconomy, formatDate, formatMoney, type FuelLog } from "@/lib/fuel";
import { createClient } from "@/lib/supabase/server";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data } = await supabase.from("fuel_logs").select("*, vehicles(name)").order("logged_at", { ascending: false });
  const logs = (data ?? []) as FuelLog[];

  const groups = logs.reduce<Record<string, FuelLog[]>>((result, log) => {
    const label = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" })
      .format(new Date(`${log.logged_at}T00:00:00`));
    (result[label] ??= []).push(log);
    return result;
  }, {});

  return (
    <main className="app-canvas">
      <section className="mobile-page">
        <AppHeader active="history" />
        <div className="page-content history-content">
          <header className="history-hero">
            <h1>Fuel history</h1>
            <p>Review your past fill-ups and trends.</p>
            <div>
              <button className="button button-secondary"><WandSparkles size={18} /> Summary</button>
              <button className="button button-primary"><Download size={18} /> Export</button>
            </div>
          </header>

          {logs.length === 0 ? (
            <div className="empty-state history-empty"><p>No fill-ups yet.</p><span>Your saved entries will appear here.</span></div>
          ) : Object.entries(groups).map(([month, monthLogs]) => (
            <section className="history-group" key={month}>
              <h2>{month}</h2>
              {monthLogs.map((log, index) => {
                const economy = calculateEconomy(log, logs[logs.indexOf(log) + 1]);
                return (
                  <article className={`history-card ${index === monthLogs.length - 1 && economy && economy < 10 ? "warning" : ""}`} key={log.id}>
                    <div className="history-card-head">
                      <div><h3>{formatDate(log.logged_at)}</h3><p><MapPin size={15} /> {log.station_brand || "Fuel station"}</p></div>
                      <div className="history-price"><span>Total cost</span><strong>{formatMoney(log.total_cost)}</strong></div>
                    </div>
                    <div className="history-stats">
                      <div><span><Gauge size={19} /></span><p><small>Mileage</small><strong>{Number(log.odometer_km).toLocaleString()} km</strong></p></div>
                      <div><span><Leaf size={19} /></span><p><small>Economy</small><strong>{economy ? `${economy.toFixed(1)} km/L` : "—"}</strong></p></div>
                    </div>
                    {economy && economy < 10 && <div className="efficiency-warning"><TrendingDown size={19} /> Efficiency is lower than your recent average.</div>}
                  </article>
                );
              })}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
