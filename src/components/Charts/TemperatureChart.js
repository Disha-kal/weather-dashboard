import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { convertTemperature } from '../../utils/helpers';

const TemperatureChart = ({ forecastData, unit }) => {
  if (!forecastData || !forecastData.list) {
    return <div>No forecast data available</div>;
  }

  const chartData = forecastData.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: convertTemperature(item.main.temp, unit),
    feelsLike: convertTemperature(item.main.feels_like, unit),
  }));

  return (
    <div className="chart-container">
      <h3>24-Hour Temperature Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis 
            label={{ 
              value: `Temperature (°${unit === 'celsius' ? 'C' : 'F'})`, 
              angle: -90, 
              position: 'insideLeft' 
            }} 
          />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#8884d8" 
            name={`Temp (°${unit === 'celsius' ? 'C' : 'F'})`}
          />
          <Line 
            type="monotone" 
            dataKey="feelsLike" 
            stroke="#82ca9d" 
            name={`Feels Like (°${unit === 'celsius' ? 'C' : 'F'})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;