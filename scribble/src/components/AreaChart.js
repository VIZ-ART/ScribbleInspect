import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  const modifiedData = data.map((item) => ({
    Score: item.normalizedScore,
    "Task Name": item.taskName,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={modifiedData} margin={{ top: 50, left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Task Name" />
        <YAxis
          allowDecimals={false}
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 10]}
          label={{
            value: "Score",
            position: "insideLeft",
            angle: -90,
          }}
        />
        <Tooltip />
        <Area type="monotone" dataKey="Score" stroke="#1e3a8a" fill="#3b82f6" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
