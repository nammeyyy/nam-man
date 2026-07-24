import { Fuel, Gauge, MapPinned } from "lucide-react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="login-canvas">
      <section className="login-panel">
        <div className="login-brand"><Fuel size={24} /><span>FuelGuide</span></div>
        <div className="login-copy">
          <span className="login-mark"><Gauge size={30} /></span>
          <p className="eyebrow">Drive smarter</p>
          <h1>Every fill-up,<br />made useful.</h1>
          <p>Track efficiency, understand your spending, and find better fuel stops along the way.</p>
          <div className="login-feature"><MapPinned size={19} /> Your fuel data, all in one calm place.</div>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
