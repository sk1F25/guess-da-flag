import "./App.css";
import { US, RU, CN, JP, GB } from "country-flag-icons/react/3x2";

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <div className="flex h-12 mt-5">
        <US /> <RU /> <CN /> <JP /> <GB />
      </div>
    </>
  );
}
export default App;
