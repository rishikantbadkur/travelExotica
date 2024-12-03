import { memo } from "react";
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

function calCountBasedOnRating(reviews, count) {
  return reviews.reduce((acc, crr) => {
    if (crr.rating === count) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
}

const colors = ["#FFD205"];

function BookingGraph({ reviews }) {
  const sortedData = [
    { name: "5 Star", value: calCountBasedOnRating(reviews, 5) },
    { name: "4 Star", value: calCountBasedOnRating(reviews, 4) },
    { name: "3 Star", value: calCountBasedOnRating(reviews, 3) },
    { name: "2 Star", value: calCountBasedOnRating(reviews, 2) },
    { name: "1 Star", value: calCountBasedOnRating(reviews, 1) },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        width={500}
        height={300}
        data={sortedData}
        margin={{ top: 16, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#000" }}
          label={{
            value: "Ratings",
            angle: -90,
            position: "insideRight",
            offset: 50,
          }}
        />
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

const areEqual = (prevProps, nextProps) => {
  return prevProps.length === nextProps.length;
};

export default memo(BookingGraph, areEqual);
