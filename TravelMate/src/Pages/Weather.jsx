import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchLocation = () => {
    const url = `/weather?location=${location}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  return (
    <>
      <p className="text-center mt-5 text-2xl underline font-semibold">
        Weather Forecast
      </p>
      <div className="grid gap-20 mt-16 grid-cols-1 md:grid-cols-[1fr_3fr]">
        <div className="text-center w-96 p-16">
          <label className="flex font-semibold text-xl">
            {" "}
            Enter the location:
          </label>

          <input
            className="py-5 px-6 text-lg rounded-3xl border border-primary"
            type="text"
            id="cityInput"
            placeholder="Eg: Kathmandu"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchLocation();
              }
            }}
          />
        </div>

        <div className=" flex justify-between items-center w-[600px] h-[350px]  border border-primary rounded-xl m-auto relative p-5">
          {data.weather ? (
            <div className="w-[500px] ">
              <div className="flex ">
                <div className="w-1/2  my-4 mx-auto flex justify-between items-center">
                  {/* Left side content */}
                  <div className="flex flex-col items-start justify-between ">
                    <p className="text-xl">
                      {data.name}, {data.sys.country}
                    </p>
                    <p className="text-xl mt-16">
                      {data.weather[0].description}
                      <h1 className="text-5xl font-semibold">
                        {data.main.temp.toFixed()} °C
                      </h1>
                    </p>
                  </div>
                </div>
                {/* Right side content */}
                <div className="w-1/2 my-4 mx-auto flex flex-col justify-between items-end">
                  <div className="relative">
                    <img
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png `}
                      alt=""
                      className="w-[120px]"
                    />
                  </div>
                  {data.name !== undefined ? (
                    <div className="flex flex-col justify-evenly gap-y-2 my-6 mx-auto text-sm">
                      <div className="flex justify-between gap-x-8">
                        <p>Feels Like:</p>
                        <p className="font-bold w-20">
                          {data.main.feels_like.toFixed()} °C
                        </p>
                      </div>
                      <div className="flex justify-between gap-x-8">
                        <p>Humidity:</p>
                        <p className="font-bold w-20">{data.main.humidity} %</p>
                      </div>
                      <div className="flex justify-between gap-x-8">
                        <p>Wind Speed:</p>
                        <p className="font-bold w-20">
                          {data.wind.speed.toFixed()} KM/H
                        </p>
                      </div>
                      <div className="flex justify-between gap-x-8">
                        <p>Pressure:</p>
                        <p className="font-bold w-20">
                          {data.main.pressure} hPa
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-96 h-24 text-primary"
            >
              <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
