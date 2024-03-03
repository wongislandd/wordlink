import './App.css';
import Game from './Game';
import HowToPlay from './HowToPlay';
import SidePanel from './SidePanel';

function App() {
  return (
    <div className="App">
      <div className='container'>
      <div className='side-panel'>
        <SidePanel/>
      </div>
      <div className="main-content-wrapper">
        <div className="main-content">
          <Game/>
        </div>
      </div>
      <div className='side-panel'>
        <HowToPlay/>
      </div>
    </div>
    </div>
  );
}

export default App;
