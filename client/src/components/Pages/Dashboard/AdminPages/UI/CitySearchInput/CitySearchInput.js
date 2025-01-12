import React, { useEffect, useState } from "react";
import styles from "./CitySearchInput.module.css";

import axios from "axios";

function CitySearchInput({ defaultCity, search, setSearch, setCityChange }) {
  const [cityResponse, setCityResponse] = useState([]);
  const [searchCity, setSearchCity] = useState(defaultCity ? defaultCity : "");
  const [error, setError] = useState(null);

  async function searchCityResults(searchCity) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${process.env.REACT_APP_CITY_COORDINATES_KEY}`
      );

      setError(null);
      setCityResponse(response.data);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    if (searchCity.length < 3) {
      return;
    }
    const handler = setTimeout(() => {
      searchCityResults(searchCity);
    }, 100);

    return () => clearTimeout(handler);
  }, [searchCity]);

  return (
    <div className={styles.input_ctn}>
      <input
        type="text"
        placeholder="Search for a city"
        onChange={(e) => {
          setSearch(true);
          setSearchCity(e.target.value);
        }}
        className={`${styles.enquiry_form_fields}`}
        value={searchCity}
      />
      {error && (
        <p className={styles.error}>
          Something went wrong while searching for the city
        </p>
      )}
      {search && cityResponse.length > 0 && !error && (
        <ul className={styles.city_list}>
          {cityResponse.map((cityData) => (
            <li
              key={cityData.lat}
              className={styles.city_item}
              value={cityData.name}
              onClick={() => {
                setSearchCity(`${cityData.name}, ${cityData.state}`);
                setCityChange(cityData);
                setCityResponse([]);
                setSearch(false);
              }}
            >
              <p className={styles.city_text}>
                {cityData.name}, {cityData.state}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CitySearchInput;
