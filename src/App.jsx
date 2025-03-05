import { Header } from "./components/header/header";
import { Game } from "./components/game/game";

function App() {
  return (
    <div className="w-full flex justify-center flex-col">
      <Header />
      <Game className="mx-auto mt-20" />
    </div>
  );
}
export default App;
