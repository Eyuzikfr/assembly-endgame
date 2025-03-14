import Header from "./components/Header";
import { languages } from "./components/languages";
import { nanoid } from "nanoid";
import "./css/App.css";

export default function App() {
  const languageList = languages.map((lang) => (
    <div
      key={nanoid()}
      className={lang.name + " language"}
      style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
    >
      {lang.name}
    </div>
  ));

  return (
    <main>
      <div className="header-and-status">
        <Header />
        <div className="status-message">
          <h2 className="main-status">You win!</h2>
          <p className="sub-status">Well done! 🎉</p>
        </div>
      </div>
      <div className="languages-container">{languageList}</div>
    </main>
  );
}
