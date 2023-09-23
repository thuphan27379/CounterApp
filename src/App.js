import React, { useState, useEffect } from "react";

const api = {
  key: "1acde3f7d0c9db2f0b808ca933d86888",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [seachCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  //
  useEffect(() => {
    //fetch data
    const fetchWeatherData = async () => {
      if (!seachCity) return;
      // process
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${seachCity}&units=metric&appid=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            `City: ${data.name}, ${data.sys.country}. Weather: ${data.weather[0].description}. Temparature: ${data.main.temp} degree.`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
      //
    };
    fetchWeatherData();
  }, [seachCity]);
  //

  return (
    <>
      <h1>Fetch Data with useEffect</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
