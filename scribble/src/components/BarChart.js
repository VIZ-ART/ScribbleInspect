import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
  const modifiedData = data.map((item) => ({
    Score: item.normalizedScore,
    "Task Name": item.taskName,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={modifiedData} margin={{ top: 50, left: 30 }}>
        <CartesianGrid strokeDasharray="10 10 " />
        <XAxis dataKey="Task Name" />
        <YAxis
          allowDecimals={false}
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 10]}
          label={{
            value: "Score",
            position: "insideLeft",
            angle: -90,
            // offset: -10,
          }}
        />
        <Tooltip />
        <Bar dataKey="Score" fill="#3b82f6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
