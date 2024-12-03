import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = [
  "#006769",
  "#A594F9",
  "#FF8A8A",
  "#73EC8B",
  "#FFBA86",
  "#FFD95A",
  "#98DED9",
  "#D10363",
];

function BookingGraph({ data }) {
  const sortedData = data.sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        layout="vertical"
        width={500}
        height={300}
        data={sortedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="category" dataKey="name" tick={{ fill: "#000" }} />
        <XAxis type="number" tick={{ fill: "#000" }} />
        <Tooltip />
        <Legend wrapperStyle={{ color: "#000" }} />
        <Bar dataKey="value" label={{ position: "right" }}>
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BookingGraph;
