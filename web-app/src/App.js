import './App.css';
import GuessInput from './GuessInput';
import History from './History'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GuessInput/>
        <History/>
      </header>
    </div>
  );
}

export default App;
