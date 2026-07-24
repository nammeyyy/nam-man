import { AppHeader } from "@/components/AppHeader";
import { FuelLogForm } from "@/components/FuelLogForm";

export default function AddFuelPage() {
  return (
    <main className="app-canvas">
      <section className="mobile-page">
        <AppHeader active="add" />
        <div className="page-intro">
          <h1>Record New Fill-up</h1>
          <p>Keep your fuel efficiency tracked with precision.</p>
        </div>
        <div className="page-content form-content">
          <FuelLogForm />
        </div>
      </section>
    </main>
  );
}
