import BookingLineChart from "./BookingLineChart";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function BookingLineChartDisplay({ data }) {
  if (data.period === "all time") {
    let allTimeBookingData = [
      { year: 2022, bookings: 0, revenue: 0 },
      { year: 2023, bookings: 0, revenue: 0 },
    ];
    for (const el of data.bookingsGraphData) {
      allTimeBookingData.push({
        year: el._id.year,
        bookings: el.totalBookings,
        revenue: el.totalRevenue,
      });
    }

    return <BookingLineChart graphData={allTimeBookingData} dataKey="year" />;
  }

  if (!!data.period.year && data.period.month === null) {
    let yearlyBookingData = [
      { month: "Jan", bookings: 0, revenue: 0 },
      { month: "Feb", bookings: 0, revenue: 0 },
      { month: "Mar", bookings: 0, revenue: 0 },
      { month: "Apr", bookings: 0, revenue: 0 },
      { month: "May", bookings: 0, revenue: 0 },
      { month: "Jun", bookings: 0, revenue: 0 },
      { month: "Jul", bookings: 0, revenue: 0 },
      { month: "Aug", bookings: 0, revenue: 0 },
      { month: "Sep", bookings: 0, revenue: 0 },
      { month: "Oct", bookings: 0, revenue: 0 },
      { month: "Nov", bookings: 0, revenue: 0 },
      { month: "Dec", bookings: 0, revenue: 0 },
    ];
    for (const element of data.bookingsGraphData) {
      yearlyBookingData[element._id.month - 1].bookings = element.totalBookings;
      yearlyBookingData[element._id.month - 1].revenue = element.totalRevenue;
    }
    return <BookingLineChart graphData={yearlyBookingData} dataKey="month" />;
  }

  if (
    typeof data.period.year === typeof 1 &&
    typeof data.period.month === typeof 1
  ) {
    const numDays = getDaysInMonth(data.period.year, data.period.month);
    let monthlyBookingData = Array.from({ length: numDays }, (_, index) => ({
      day: index + 1,
      bookings: 0,
      revenue: 0,
    }));

    for (const element of data.bookingsGraphData) {
      monthlyBookingData[element._id.day - 1].bookings = element.totalBookings;
      monthlyBookingData[element._id.day - 1].revenue = element.totalRevenue;
    }

    return <BookingLineChart graphData={monthlyBookingData} dataKey="day" />;
  }
}

export default BookingLineChartDisplay;
