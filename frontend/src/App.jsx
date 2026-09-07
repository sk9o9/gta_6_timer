import CountdownTimer from "./components/CountdownTimer";
import "./App.css";

function App() {
  return (
    <div className="hero">
      <nav className="navbar">
        <span className="brand">GTA VI</span>
        <span className="tag">VICE CITY</span>
      </nav>

      <div className="hero-content">
        <p className="eyebrow">Coming</p>
        <h1 className="title">
          NOVEMBER <span className="accent">19</span>, 2026
        </h1>
        <p className="platforms">PlayStation 5 · Xbox Series X|S</p>

        <CountdownTimer />
      </div>

      <div className="scroll-hint">Vice City, USA.</div>
    </div>
  );
}

export default App;