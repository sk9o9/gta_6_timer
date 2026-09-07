import CountdownTimer from "./components/CountdownTimer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="title">GTA VI</h1>
      <p className="subtitle">Vice City — November 19, 2026</p>
      <CountdownTimer />
    </div>
  );
}

export default App;