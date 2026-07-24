import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  CircleGauge,
  Gauge,
  Lightbulb,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { calculateEconomy, formatDate, formatMoney, type FuelLog } from "@/lib/fuel";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("fuel_logs")
    .select("*, vehicles(name)")
    .order("logged_at", { ascending: false })
    .limit(10);

  const logs = (data ?? []) as FuelLog[];
  const economy = calculateEconomy(logs[0], logs[1]);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTotal = logs
    .filter((log) => log.logged_at.startsWith(currentMonth))
    .reduce((sum, log) => sum + Number(log.total_cost), 0);
  const tankSize = 55;
  const currentFuel = 37.4;
  const fuelPercent = Math.round((currentFuel / tankSize) * 100);

  return (
    <main className="app-canvas">
      <section className="mobile-page">
        <AppHeader active="dashboard" />
        <div className="page-content dashboard-content">
          <section className="fuel-level-card">
            <p className="eyebrow centered">Current fuel level</p>
            <div className="fuel-gauge" style={{ "--fuel": `${fuelPercent * 3.6}deg` } as React.CSSProperties}>
              <div>
                <strong>{fuelPercent}%</strong>
                <span>Full</span>
              </div>
            </div>
            <div className="tank-metrics">
              <div><span>Tank size</span><strong>{tankSize} L</strong></div>
              <div><span>Current</span><strong>{currentFuel} L</strong></div>
            </div>
          </section>

          <section className="range-card">
            <span>Estimated range</span>
            <strong>320 km</strong>
            <small>Based on current drive cycle</small>
            <Gauge className="range-art" size={96} />
          </section>

          <div className="quick-metrics">
            <article>
              <span className="metric-icon metric-icon-yellow"><CircleGauge size={20} /></span>
              <div><small>Avg economy</small><strong>{economy ? `${economy.toFixed(1)} km/L` : "—"}</strong></div>
              <TrendingUp size={19} />
            </article>
            <article>
              <span className="metric-icon"><CalendarDays size={20} /></span>
              <div><small>This month</small><strong>{formatMoney(monthlyTotal)}</strong></div>
            </article>
          </div>

          <Link href="/dashboard/add" className="button button-primary button-wide">
            <PlusCircle size={19} /> Log fuel up
          </Link>

          <aside className="fuel-tip">
            <Lightbulb size={21} />
            <div>
              <strong>Fuel efficiency tip</strong>
              <p>Smooth acceleration can increase your range. Keep a steady pace and check tire pressure often.</p>
            </div>
          </aside>

          <section className="section-block">
            <div className="section-heading">
              <h2>Recent logs</h2>
              <Link href="/dashboard/history">View all</Link>
            </div>
            <div className="recent-list">
              {logs.length === 0 ? (
                <div className="empty-state">
                  <p>Your fuel story starts here.</p>
                  <span>Log your first fill-up to see trends and range estimates.</span>
                </div>
              ) : logs.slice(0, 3).map((log) => (
                <article key={log.id}>
                  <div><strong>{formatDate(log.logged_at)}</strong><span>{log.station_brand || "Fuel station"}</span></div>
                  <div><strong>{Number(log.liters).toFixed(1)} L</strong><span>{formatMoney(log.total_cost)}</span></div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
