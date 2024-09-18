import Landing from "./components/Landing";
import Summary from "./components/Summary";

const App: React.FC = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <div className="app">
        <Landing />
        <Summary />
      </div>
    </main>
  );
};
export default App;
