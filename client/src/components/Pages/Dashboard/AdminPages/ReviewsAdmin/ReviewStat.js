import React from "react";
import StatBox from "../UI/StatBox/StatBox";

function ReviewStat({ reviews, totalBookings }) {
  return (
    <>
      <StatBox
        feature={{
          name: "Total Reviews",
          icon: <ion-icon name="chatbubble-outline"></ion-icon>,
          color: "#bc0359",
          bgColor: "#f6cde0",
          value: reviews.data.reviews.length,
        }}
      />
      <StatBox
        feature={{
          name: "Review %",
          icon: <ion-icon name="stats-chart-outline"></ion-icon>,
          color: "#124076",
          bgColor: "#b8c6d6",
          value: `${(
            (reviews.data.reviews.length / totalBookings) *
            100
          ).toFixed(0)} %`,
        }}
      />
      <StatBox
        feature={{
          name: "Positive (>= 3)",
          icon: <ion-icon name="happy-outline"></ion-icon>,
          color: "#519234",
          bgColor: "#e0f1d9",
          value: reviews.data.reviews.reduce((sum, crr) => {
            if (crr.rating >= 3) {
              return sum + 1;
            } else {
              return sum;
            }
          }, 0),
        }}
      />
      <StatBox
        feature={{
          name: "Negative (< 3)",
          icon: <ion-icon name="sad-outline"></ion-icon>,
          color: "#c83328",
          bgColor: "#fed9d6",
          value: reviews.data.reviews.reduce((sum, crr) => {
            if (crr.rating < 3) {
              return sum + 1;
            } else {
              return sum;
            }
          }, 0),
        }}
      />
    </>
  );
}

export default ReviewStat;
