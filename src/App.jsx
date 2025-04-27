import './App.css';
import SeatMap from './Components/SeatMap';
import ErrorBoundary from './Components/ErrorBoundary';
import { GlobalStylesProvider } from './contexts/GlobalStylesContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <GlobalStylesProvider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<SeatMap />} />
              <Route path="/SeatMap" element={<SeatMap />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </GlobalStylesProvider>
  );
}

export default App;
