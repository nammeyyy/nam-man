"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CircleDollarSign, Fuel, Gauge, Save, Tag } from "lucide-react";
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
      <label className="field">
        <span><CalendarDays size={18} /> Date of fill-up</span>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      </label>
      <label className="field">
        <span><CircleDollarSign size={18} /> Total cost</span>
        <div className="input-with-unit"><b>$</b><input inputMode="decimal" placeholder="0.00" value={cost} onChange={(event) => setCost(event.target.value)} required /></div>
      </label>
      <label className="field">
        <span><Fuel size={18} /> Liters</span>
        <div className="input-with-unit"><input inputMode="decimal" placeholder="0.000" value={liters} onChange={(event) => setLiters(event.target.value)} required /><small>L</small></div>
      </label>
      <label className="field">
        <span><Tag size={18} /> Price per liter</span>
        <div className="input-with-unit"><b>$</b><input value={pricePerLiter ? pricePerLiter.toFixed(3) : "0.000"} readOnly /><small>/L</small></div>
      </label>
      <label className="field">
        <span><Gauge size={18} /> Odometer reading</span>
        <div className="input-with-unit"><input inputMode="numeric" placeholder="000,000" value={odometer} onChange={(event) => setOdometer(event.target.value)} required /><small>KM</small></div>
      </label>
      <label className="field">
        <span>Station</span>
        <input placeholder="Station name (optional)" value={station} onChange={(event) => setStation(event.target.value)} />
      </label>

      <fieldset className="fuel-options">
        <legend>Fuel type</legend>
        <div>
          {fuelTypes.map((type) => (
            <button type="button" key={type} className={fuelType === type ? "selected" : ""} onClick={() => setFuelType(type)}>
              {type}
            </button>
          ))}
        </div>
      </fieldset>
      <aside className="form-note">Fill your tank completely for the most accurate fuel efficiency calculations.</aside>
      {status === "error" && <p className="form-error">Couldn’t save this fill-up. Check your database columns and try again.</p>}
      <button className="button button-primary button-wide save-button" disabled={status === "saving"}>
        <Save size={18} /> {status === "saving" ? "Saving…" : "Save fill-up"}
      </button>
    </form>
  );
}
