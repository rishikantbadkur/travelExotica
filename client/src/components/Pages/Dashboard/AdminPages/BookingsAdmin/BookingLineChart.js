import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BookingLineChart({ graphData, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={graphData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis
          yAxisId="left"
          label={{
            value: "Bookings",
            angle: -90,
            position: "insideLeft",
            offset: 25,
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "Revenue",
            angle: -90,
            position: "insideRight",
            offset: 5,
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="bookings"
          stroke="#000"
          name="Total Bookings"
          yAxisId="left"
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#06D001"
          name="Total Revenue"
          yAxisId="right"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default BookingLineChart;
