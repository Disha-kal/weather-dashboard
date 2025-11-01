import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import CityDetailPage from './pages/CityDetailPage';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/city/:cityName" element={<CityDetailPage />} />
            </Routes>
          </div>
          <div className="sidebar">
            <Settings />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;