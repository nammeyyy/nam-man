"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fuel, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const fuelTypes = ["Gasohol 95", "Gasohol E20", "Gasohol E85", "Gasohol 91", "Gasohol 95 Premium", "Benzin 95", "Diesel B7", "Diesel B20", "Diesel Premium", "NGV"];

export function FuelLogForm() {
  const router = useRouter();
  const [fuelType, setFuelType] = useState("Gasohol 95");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [cost, setCost] = useState("");
  const [liters, setLiters] = useState("");
  const [odometer, setOdometer] = useState("");
  const [station, setStation] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const pricePerLiter = Number(liters) > 0 ? Number(cost) / Number(liters) : 0;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("fuel_logs").insert({
      logged_at: date,
      total_cost: Number(cost),
      liters: Number(liters),
      odometer_km: Number(odometer),
      station_brand: station || null,
      fuel_type: fuelType,
      user_id: user?.id,
    });

    if (error) {
      setStatus("error");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="fuel-form" onSubmit={handleSubmit}>
      <fieldset className="fuel-options">
        <legend>Fuel Type</legend>
        <div>
          {fuelTypes.map((type) => (
            <button type="button" key={type} className={fuelType === type ? "selected" : ""} onClick={() => setFuelType(type)}>
              {type}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="form-grid form-grid-wide">
        <label className="field"><span>Date of Fill-up</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
        <label className="field"><span>Odometer Reading (km)</span><div className="input-with-unit"><input inputMode="numeric" placeholder="124,500" value={odometer} onChange={(event) => setOdometer(event.target.value)} required /><small>km</small></div></label>
      </div>
      <div className="form-grid">
        <label className="field"><span>Total Cost</span><div className="input-with-unit"><input inputMode="decimal" placeholder="0.00" value={cost} onChange={(event) => setCost(event.target.value)} required /><small>฿</small></div></label>
        <label className="field"><span>Amount (Litres)</span><div className="input-with-unit"><input inputMode="decimal" placeholder="0.000" value={liters} onChange={(event) => setLiters(event.target.value)} required /><small>L</small></div></label>
        <label className="field"><span>Price per Unit</span><div className="input-with-unit"><input value={pricePerLiter ? pricePerLiter.toFixed(2) : "0.00"} readOnly /><small>฿/L</small></div></label>
      </div>
      <label className="field station-field"><span>Station (optional)</span><input placeholder="Station name" value={station} onChange={(event) => setStation(event.target.value)} /></label>
      <aside className="form-note"><Fuel size={20} /><span>Full Tank Fill-up?<small>Recommended for accurate consumption metrics</small></span><i aria-hidden="true" /></aside>
      {status === "error" && <p className="form-error">Couldn’t save this fill-up. Check your database columns and try again.</p>}
      <div className="form-actions"><button className="button button-primary button-wide save-button" disabled={status === "saving"}><Save size={18} /> {status === "saving" ? "Saving…" : "Save Fill-up"}</button><button type="button" className="button button-secondary">Cancel</button></div>
    </form>
  );
}
