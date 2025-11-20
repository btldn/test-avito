import "./App.css";
import { Link } from "react-router-dom";
import { AppRouter } from "./router";

function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/list">Список объявлений</Link>
          <Link to="/stats">Статистика</Link>
        </nav>
      </header>

      <main>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
