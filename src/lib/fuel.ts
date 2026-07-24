export type FuelLog = {
  id: string | number;
  logged_at: string;
  liters: number | string;
  odometer_km: number | string;
  total_cost: number | string;
  station_brand?: string | null;
  vehicles?: { name?: string } | null;
};

export function formatMoney(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function calculateEconomy(current?: FuelLog, previous?: FuelLog) {
  if (!current || !previous || !Number(current.liters)) return null;
  return (Number(current.odometer_km) - Number(previous.odometer_km)) / Number(current.liters);
}
