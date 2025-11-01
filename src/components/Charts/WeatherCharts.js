import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { convertTemperature } from '../../utils/helpers';

const TemperatureChart = ({ forecastData, unit }) => {
  if (!forecastData || !forecastData.list) return null;

  const chartData = forecastData.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }),
    temperature: Math.round(convertTemperature(item.main.temp, unit)),
    feelsLike: Math.round(convertTemperature(item.main.feels_like, unit)),
  }));

  return (
    <div className="chart-container">
      <h4>🌡️ 24-Hour Temperature Forecast</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: `°${unit === 'celsius' ? 'C' : 'F'}`, angle: -90 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="feelsLike" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const HumidityPressureChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  const chartData = forecastData.list.slice(0, 6).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }),
    humidity: item.main.humidity,
    pressure: item.main.pressure,
  }));

  return (
    <div className="chart-container">
      <h4>💧 Humidity & Pressure</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="humidity" fill="#8884d8" name="Humidity %" />
          <Bar dataKey="pressure" fill="#82ca9d" name="Pressure hPa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const WindChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  const chartData = forecastData.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }),
    windSpeed: item.wind.speed,
    windGust: item.wind.gust || 0,
  }));

  return (
    <div className="chart-container">
      <h4>💨 Wind Speed</h4>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="windSpeed" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} name="Wind Speed (m/s)" />
          <Area type="monotone" dataKey="windGust" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} name="Wind Gust (m/s)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const WeatherCharts = ({ forecastData, unit }) => {
  return (
    <div className="weather-charts">
      <TemperatureChart forecastData={forecastData} unit={unit} />
      <HumidityPressureChart forecastData={forecastData} />
      <WindChart forecastData={forecastData} />
    </div>
  );
};

export default WeatherCharts;