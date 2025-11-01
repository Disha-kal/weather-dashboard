import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureUnit, setTheme } from '../../store/slices/preferencesSlice';
import './Settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const { temperatureUnit, theme } = useSelector(state => state.preferences);

  return (
    <div className="settings-panel">
      <h3>Settings</h3>
      
      <div className="setting-group">
        <label>Temperature Unit:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="celsius"
              checked={temperatureUnit === 'celsius'}
              onChange={(e) => dispatch(setTemperatureUnit(e.target.value))}
            />
            Celsius (°C)
          </label>
          <label>
            <input
              type="radio"
              value="fahrenheit"
              checked={temperatureUnit === 'fahrenheit'}
              onChange={(e) => dispatch(setTemperatureUnit(e.target.value))}
            />
            Fahrenheit (°F)
          </label>
        </div>
      </div>

      <div className="setting-group">
        <label>Theme:</label>
        <select 
          value={theme} 
          onChange={(e) => dispatch(setTheme(e.target.value))}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;