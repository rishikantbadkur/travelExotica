import React from "react";

import styles from "./YearMonthForm.module.css";
import stylesGeneral from "../../../../../../styles/general.module.css";

function getYearOptions(params) {
  let baseYear = 2023;

  let years = [];

  for (
    let year = baseYear;
    year <= new Date(Date.now()).getFullYear();
    year++
  ) {
    years.push(year);
  }

  return years;
}

const YEAR_OPTIONS = getYearOptions();

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function YearMonthForm({ year, month, setMonth, setYear, setPageCount }) {
  return (
    <form className={styles.form}>
      <span className={`${styles.sortby} ${stylesGeneral.body__text}`}>
        <p>year :</p>
      </span>
      <select
        className={styles.select_option}
        onChange={(e) => {
          if (e.target.value === "all") {
            setMonth("all");
          }
          if (!!setPageCount) {
            setPageCount(1);
          }
          setYear(e.target.value);
        }}
      >
        <option value="all">All time</option>
        {YEAR_OPTIONS.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      <span className={`${styles.sortby} ${stylesGeneral.body__text}`}>
        <p>month :</p>
      </span>
      <select
        className={styles.select_option}
        onChange={(e) => {
          if (!!setPageCount) {
            setPageCount(1);
          }
          setMonth(e.target.value);
        }}
        disabled={year === "all"}
        value={month}
      >
        <option value="all">- All -</option>
        {MONTHS.map((month, index) => (
          <option value={index} key={month}>
            {month}
          </option>
        ))}
      </select>
    </form>
  );
}

export default YearMonthForm;
