import {useState} from 'react';
import './App.css';
// COMPONENTS
import TripList from './TripList';

function App() {
  //STATE
  const [showTrips, setShowTrips] = useState(true);

  return (
    <div className="App">
      <button onClick={() => setShowTrips(false)}>Unmount component</button>
      {showTrips && <TripList />}
    </div>
  );
}

export default App;
