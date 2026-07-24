import { AppHeader } from "@/components/AppHeader";
import { FuelLogForm } from "@/components/FuelLogForm";

export default function AddFuelPage() {
  return (
    <main className="app-canvas">
      <section className="mobile-page">
        <AppHeader />
        <div className="page-intro">
          <p>Record fuel usage every time you visit a petrol station.</p>
        </div>
        <div className="page-content form-content">
          <FuelLogForm />
        </div>
      </section>
    </main>
  );
}
