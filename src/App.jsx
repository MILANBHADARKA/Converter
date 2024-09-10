import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("area");

  const [selectedUnit1, setSelectedUnit1] = useState("cm2");
  const [selectedUnit2, setSelectedUnit2] = useState("cm2");

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const unitOptions = {
    length: ["cm", "m", "inch", "mm", "mile", "foot", "km"],
    area: ["cm2", "m2", "inch2", "mm2", "mile2", "foot2", "km2"],
    mass: ["g", "kg", "mg", "ton"],
    temperature: ["C", "F", "K"],
    time: ["sec", "min", "hour", "day", "week", "month", "year"],
    volume: ["ml", "l", "cm3", "m3"],
    speed: ["m/s", "km/h"],
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedUnit1(unitOptions[e.target.value][0]);
    setSelectedUnit2(unitOptions[e.target.value][0]);

    
  };

  const handleSelectedUnit1 = (e) => {
    setSelectedUnit1(e.target.value);
  };

  const handleSelectedUnit2 = (e) => {
    setSelectedUnit2(e.target.value);
  };


  const conversionFactors = {
    length: {
      cm: { cm: 1, m: 0.01, inch: 1 / 2.54, mm: 10, mile: 1 / 160934, foot: 1 / 30.48, km: 1 / 100000 },
      m: { cm: 100, m: 1, inch: 39.37, mm: 1000, mile: 1 / 1609, foot: 3.281, km: 1 / 1000 },
      inch: { cm: 2.54, m: 1 / 39.37, inch: 1, mm: 25.4, mile: 1 / 63360, foot: 1 / 12, km: 1 / 39370 },
      mm: { cm: 0.1, m: 1 / 1000, inch: 1 / 25.4, mm: 1, mile: 1 / 1609340, foot: 1 / 304.8, km: 1 / 1000000 },
      mile: { cm: 160934, m: 1609, inch: 63360, mm: 1609340, mile: 1, foot: 5280, km: 1.609 },
      foot: { cm: 30.48, m: 1 / 3.281, inch: 12, mm: 304.8, mile: 1 / 5280, foot: 1, km: 1 / 3281 },
      km: { cm: 100000, m: 1000, inch: 39370, mm: 1000000, mile: 1 / 1.609, foot: 3281, km: 1 }
    },
    area: {
      cm2: { cm2: 1, m2: 1 / 10000, inch2: 1 / 6.452, mm2: 100, mile2: 1 / 2.59e10, foot2: 1 / 929, km2: 1 / 1e10 },
      m2: { cm2: 10000, m2: 1, inch2: 1550, mm2: 1e6, mile2: 1 / 2.59e6, foot2: 10.764, km2: 1 / 1e6 },
      inch2: { cm2: 6.452, m2: 1 / 1550, inch2: 1, mm2: 645.16, mile2: 1 / 4e9, foot2: 1 / 144, km2: 1 / 1.55e7 },
      mm2: { cm2: 1 / 100, m2: 1 / 1e6, inch2: 1 / 645.16, mm2: 1, mile2: 1 / 2.59e9, foot2: 1 / 92903, km2: 1 / 1e12 },
      mile2: { cm2: 2.59e10, m2: 2.59e6, inch2: 4e9, mm2: 2.59e9, mile2: 1, foot2: 2.79e7, km2: 2.59 },
      foot2: { cm2: 929, m2: 1 / 10.764, inch2: 144, mm2: 92903, mile2: 1 / 2.79e7, foot2: 1, km2: 1 / 107639 },
      km2: { cm2: 1e10, m2: 1e6, inch2: 1.55e7, mm2: 1e12, mile2: 1 / 2.59, foot2: 107639, km2: 1 }
    },
    mass: {
      g: { g: 1, kg: 1 / 1000, mg: 1000, ton: 1 / 1e6 },
      kg: { g: 1000, kg: 1, mg: 1e6, ton: 1 / 1000 },
      mg: { g: 1 / 1000, kg: 1 / 1e6, mg: 1, ton: 1 / 1e9 },
      ton: { g: 1e6, kg: 1000, mg: 1e9, ton: 1 }
    },
    temperature: {
      C: { C: (v) => v, F: (v) => (v * 9) / 5 + 32, K: (v) => v + 273.15 },
      F: { C: (v) => ((v - 32) * 5) / 9, F: (v) => v, K: (v) => ((v - 32) * 5) / 9 + 273.15 },
      K: { C: (v) => v - 273.15, F: (v) => ((v - 273.15) * 9) / 5 + 32, K: (v) => v }
    },
    time: {
      sec: { sec: 1, min: 1 / 60, hour: 1 / 3600, day: 1 / 86400, week: 1 / 604800, month: 1 / 2.628e6, year: 1 / 3.154e7 },
      min: { sec: 60, min: 1, hour: 1 / 60, day: 1 / 1440, week: 1 / 10080, month: 1 / 43800, year: 1 / 525600 },
      hour: { sec: 3600, min: 60, hour: 1, day: 1 / 24, week: 1 / 168, month: 1 / 730, year: 1 / 8760 },
      day: { sec: 86400, min: 1440, hour: 24, day: 1, week: 1 / 7, month: 1 / 30.417, year: 1 / 365 },
      week: { sec: 604800, min: 10080, hour: 168, day: 7, week: 1, month: 1 / 4.345, year: 1 / 52.143 },
      month: { sec: 2.628e6, min: 43800, hour: 730, day: 30.417, week: 4.345, month: 1, year: 1 / 12 },
      year: { sec: 3.154e7, min: 525600, hour: 8760, day: 365, week: 52.143, month: 12, year: 1 }
    },
    volume: {
      ml: { ml: 1, l: 1 / 1000, cm3: 1, m3: 1 / 1e6 },
      l: { ml: 1000, l: 1, cm3: 1000, m3: 1 / 1000 },
      cm3: { ml: 1, l: 1 / 1000, cm3: 1, m3: 1 / 1e6 },
      m3: { ml: 1e6, l: 1000, cm3: 1e6, m3: 1 }
    },
    speed: {
      "m/s": { "m/s": 1, "km/h": 3.6 },
      "km/h": { "m/s": 1 / 3.6, "km/h": 1 }
    }
  };

  const handleConvert = (e) => {
    const value = e.target.value; 
    setInputValue1(value);
  
    if (selectedCategory === "temperature") {
      const ans = conversionFactors.temperature[selectedUnit1][selectedUnit2](value);
      setInputValue2(ans.toFixed(2)); // Optional: rounding off for readability
    } else {
      const conversionFactor = conversionFactors[selectedCategory][selectedUnit1][selectedUnit2];
      const ans = value * conversionFactor;
      setInputValue2(ans.toFixed(2));
    }
  };



  return (
    <>
      <div className="w-80 h-80  flex-row-reverse justify-center items-center border-2 border-zinc-600 bg-custom-black rounded-3xl ml-auto mr-auto mb-auto mt-40 ">
        <div className="units m-10 mb-10">
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            name="units"
            id="units"
            className="border-2 border-zinc-600 rounded-md w-44 bg-custom-black-2 text-white"
          >
            <option value="length">length</option>
            <option value="area">area</option>
            <option value="mass">mass</option>
            <option value="temperature">temperature</option>
            <option value="time">time</option>
            <option value="volume">volume</option>
            <option value="speed">speed</option>
          </select>
        </div>

        <div className="w-full h-screen flex-row-reverse mt-10 ">
          <div className="Textfields flex gap-4 justify-center items-center mb-6">
            <input
              onChange={handleConvert}
              value={inputValue1}
              type="text"
              className="border-2 border-zinc-600 rounded-md"
            />

            <select
              onChange={handleSelectedUnit1}
              value={selectedUnit1}
              name="unit"
              id="unit"
              className="border-2 border-zinc-600 rounded-md w-16 bg-custom-black-2 text-white"
            >
              {
                unitOptions[selectedCategory].map((unit) => {
                  return (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  );
              })}
            </select>
          </div>

          <div className="Textfields flex gap-4 justify-center items-center mt-6">
            <input
              type="text"
              value={inputValue2}
              className="border-2 border-zinc-600 rounded-md"
            />

            <select
              onChange={handleSelectedUnit2}
              value={selectedUnit2}
              name="unit"
              id="unit"
              className="border-2 border-zinc-600 rounded-md w-16 bg-custom-black-2 text-white"
            >
              {
                unitOptions[selectedCategory].map((unit) => {
                  return (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;































// const handleConvert = (e) => {
//   const value = e.target.value;
//   setInputValue1(value);

//   if (selectedCategory === "length") {
//     let ans;

//     if (selectedUnit1 === "cm" && selectedUnit2 === "cm") {
//       ans = value;
//     } else if (selectedUnit1 === "cm" && selectedUnit2 === "m") {
//       ans = value / 100;
//     } else if (selectedUnit1 === "cm" && selectedUnit2 === "inch") {
//       ans = value / 2.54;
//     } else if (selectedUnit1 === "cm" && selectedUnit2 === "mm") {
//       ans = value * 10;
//     } else if (selectedUnit1 === "cm" && selectedUnit2 === "mile") {
//       ans = value / 160934;
//     } else if (selectedUnit1 === "cm" && selectedUnit2 === "foot") {
//       ans = value / 30.48;
//     } else if (selectedUnit1 === "cm" && selectedUnit2 === "km") {
//       ans = value / 100000;
//     } else if (selectedUnit1 === "m" && selectedUnit2 === "cm") {
//       ans = value * 100;
//     } else if (selectedUnit1 === "m" && selectedUnit2 === "m") {
//       ans = value;
//     } else if (selectedUnit1 === "m" && selectedUnit2 === "inch") {
//       ans = value * 39.37;
//     } else if (selectedUnit1 === "m" && selectedUnit2 === "mm") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "m" && selectedUnit2 === "mile") {
//       ans = value / 1609;
//     } else if (selectedUnit1 === "m" && selectedUnit2 === "foot") {
//       ans = value * 3.281;
//     } else if (selectedUnit1 === "m" && selectedUnit2 === "km") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "inch" && selectedUnit2 === "cm") {
//       ans = value * 2.54;
//     } else if (selectedUnit1 === "inch" && selectedUnit2 === "m") {
//       ans = value / 39.37;
//     } else if (selectedUnit1 === "inch" && selectedUnit2 === "inch") {
//       ans = value;
//     } else if (selectedUnit1 === "inch" && selectedUnit2 === "mm") {
//       ans = value * 25.4;
//     } else if (selectedUnit1 === "inch" && selectedUnit2 === "mile") {
//       ans = value / 63360;
//     } else if (selectedUnit1 === "inch" && selectedUnit2 === "foot") {
//       ans = value / 12;
//     } else if (selectedUnit1 === "inch" && selectedUnit2 === "km") {
//       ans = value / 39370;
//     } else if (selectedUnit1 === "mm" && selectedUnit2 === "cm") {
//       ans = value;
//     } else if (selectedUnit1 === "mm" && selectedUnit2 === "m") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "mm" && selectedUnit2 === "inch") {
//       ans = value / 25.4;
//     } else if (selectedUnit1 === "mm" && selectedUnit2 === "mm") {
//       ans = value;
//     } else if (selectedUnit1 === "mm" && selectedUnit2 === "mile") {
//       ans = value / 1609340;
//     } else if (selectedUnit1 === "mm" && selectedUnit2 === "foot") {
//       ans = value / 304.8;
//     } else if (selectedUnit1 === "mm" && selectedUnit2 === "km") {
//       ans = value / 1000000;
//     } else if (selectedUnit1 === "mile" && selectedUnit2 === "cm") {
//       ans = value * 160934;
//     } else if (selectedUnit1 === "mile" && selectedUnit2 === "m") {
//       ans = value * 1609;
//     } else if (selectedUnit1 === "mile" && selectedUnit2 === "inch") {
//       ans = value * 63360;
//     } else if (selectedUnit1 === "mile" && selectedUnit2 === "mm") {
//       ans = value * 1609340;
//     } else if (selectedUnit1 === "mile" && selectedUnit2 === "mile") {
//       ans = value;
//     } else if (selectedUnit1 === "mile" && selectedUnit2 === "foot") {
//       ans = value * 5280;
//     } else if (selectedUnit1 === "mile" && selectedUnit2 === "km") {
//       ans = value * 1.609;
//     } else if (selectedUnit1 === "foot" && selectedUnit2 === "cm") {
//       ans = value * 30.48;
//     } else if (selectedUnit1 === "foot" && selectedUnit2 === "m") {
//       ans = value / 3.281;
//     } else if (selectedUnit1 === "foot" && selectedUnit2 === "inch") {
//       ans = value * 12;
//     } else if (selectedUnit1 === "foot" && selectedUnit2 === "mm") {
//       ans = value * 304.8;
//     } else if (selectedUnit1 === "foot" && selectedUnit2 === "mile") {
//       ans = value / 5280;
//     } else if (selectedUnit1 === "foot" && selectedUnit2 === "foot") {
//       ans = value;
//     } else if (selectedUnit1 === "foot" && selectedUnit2 === "km") {
//       ans = value / 3281;
//     } else if (selectedUnit1 === "km" && selectedUnit2 === "cm") {
//       ans = value * 100000;
//     } else if (selectedUnit1 === "km" && selectedUnit2 === "m") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "km" && selectedUnit2 === "inch") {
//       ans = value * 39370;
//     } else if (selectedUnit1 === "km" && selectedUnit2 === "mm") {
//       ans = value * 1000000;
//     } else if (selectedUnit1 === "km" && selectedUnit2 === "mile") {
//       ans = value / 1.609;
//     } else if (selectedUnit1 === "km" && selectedUnit2 === "foot") {
//       ans = value * 3281;
//     } else if (selectedUnit1 === "km" && selectedUnit2 === "km") {
//       ans = value;
//     }
//     setInputValue2(ans);
//   } else if (selectedCategory === "area") {
//     let ans;

//     if (selectedUnit1 === "cm2" && selectedUnit2 === "cm2") {
//       ans = value;
//     } else if (selectedUnit1 === "cm2" && selectedUnit2 === "m2") {
//       ans = value / 10000;
//     } else if (selectedUnit1 === "cm2" && selectedUnit2 === "inch2") {
//       ans = value / 6.452;
//     } else if (selectedUnit1 === "cm2" && selectedUnit2 === "mm2") {
//       ans = value * 100;
//     } else if (selectedUnit1 === "cm2" && selectedUnit2 === "mile2") {
//       ans = value / 2.59e10;
//     } else if (selectedUnit1 === "cm2" && selectedUnit2 === "foot2") {
//       ans = value / 929;
//     } else if (selectedUnit1 === "cm2" && selectedUnit2 === "km2") {
//       ans = value / 1e10;
//     } else if (selectedUnit1 === "m2" && selectedUnit2 === "cm2") {
//       ans = value * 10000;
//     } else if (selectedUnit1 === "m2" && selectedUnit2 === "m2") {
//       ans = value;
//     } else if (selectedUnit1 === "m2" && selectedUnit2 === "inch2") {
//       ans = value * 1550;
//     } else if (selectedUnit1 === "m2" && selectedUnit2 === "mm2") {
//       ans = value * 1e6;
//     } else if (selectedUnit1 === "m2" && selectedUnit2 === "mile2") {
//       ans = value / 2.59e6;
//     } else if (selectedUnit1 === "m2" && selectedUnit2 === "foot2") {
//       ans = value * 10.764;
//     } else if (selectedUnit1 === "m2" && selectedUnit2 === "km2") {
//       ans = value / 1e6;
//     } else if (selectedUnit1 === "inch2" && selectedUnit2 === "cm2") {
//       ans = value * 6.452;
//     } else if (selectedUnit1 === "inch2" && selectedUnit2 === "m2") {
//       ans = value / 1550;
//     } else if (selectedUnit1 === "inch2" && selectedUnit2 === "inch2") {
//       ans = value;
//     } else if (selectedUnit1 === "inch2" && selectedUnit2 === "mm2") {
//       ans = value * 645.16;
//     } else if (selectedUnit1 === "inch2" && selectedUnit2 === "mile2") {
//       ans = value / 4e9;
//     } else if (selectedUnit1 === "inch2" && selectedUnit2 === "foot2") {
//       ans = value / 144;
//     } else if (selectedUnit1 === "inch2" && selectedUnit2 === "km2") {
//       ans = value / 1.55e7;
//     } else if (selectedUnit1 === "mm2" && selectedUnit2 === "cm2") {
//       ans = value / 100;
//     } else if (selectedUnit1 === "mm2" && selectedUnit2 === "m2") {
//       ans = value / 1e6;
//     } else if (selectedUnit1 === "mm2" && selectedUnit2 === "inch2") {
//       ans = value / 645.16;
//     } else if (selectedUnit1 === "mm2" && selectedUnit2 === "mm2") {
//       ans = value;
//     } else if (selectedUnit1 === "mm2" && selectedUnit2 === "mile2") {
//       ans = value / 2.59e9;
//     } else if (selectedUnit1 === "mm2" && selectedUnit2 === "foot2") {
//       ans = value / 92903;
//     } else if (selectedUnit1 === "mm2" && selectedUnit2 === "km2") {
//       ans = value / 1e12;
//     } else if (selectedUnit1 === "mile2" && selectedUnit2 === "cm2") {
//       ans = value * 2.59e10;
//     } else if (selectedUnit1 === "mile2" && selectedUnit2 === "m2") {
//       ans = value * 2.59e6;
//     } else if (selectedUnit1 === "mile2" && selectedUnit2 === "inch2") {
//       ans = value * 4e9;
//     } else if (selectedUnit1 === "mile2" && selectedUnit2 === "mm2") {
//       ans = value * 2.59e9;
//     } else if (selectedUnit1 === "mile2" && selectedUnit2 === "mile2") {
//       ans = value;
//     } else if (selectedUnit1 === "mile2" && selectedUnit2 === "foot2") {
//       ans = value * 2.79e7;
//     } else if (selectedUnit1 === "mile2" && selectedUnit2 === "km2") {
//       ans = value * 2.59;
//     } else if (selectedUnit1 === "foot2" && selectedUnit2 === "cm2") {
//       ans = value * 929;
//     } else if (selectedUnit1 === "foot2" && selectedUnit2 === "m2") {
//       ans = value / 10.764;
//     } else if (selectedUnit1 === "foot2" && selectedUnit2 === "inch2") {
//       ans = value * 144;
//     } else if (selectedUnit1 === "foot2" && selectedUnit2 === "mm2") {
//       ans = value * 92903;
//     } else if (selectedUnit1 === "foot2" && selectedUnit2 === "mile2") {
//       ans = value / 2.79e7;
//     } else if (selectedUnit1 === "foot2" && selectedUnit2 === "foot2") {
//       ans = value;
//     } else if (selectedUnit1 === "foot2" && selectedUnit2 === "km2") {
//       ans = value / 107639;
//     } else if (selectedUnit1 === "km2" && selectedUnit2 === "cm2") {
//       ans = value * 1e10;
//     } else if (selectedUnit1 === "km2" && selectedUnit2 === "m2") {
//       ans = value * 1e6;
//     } else if (selectedUnit1 === "km2" && selectedUnit2 === "inch2") {
//       ans = value * 1.55e7;
//     } else if (selectedUnit1 === "km2" && selectedUnit2 === "mm2") {
//       ans = value * 1e12;
//     } else if (selectedUnit1 === "km2" && selectedUnit2 === "mile2") {
//       ans = value / 2.59;
//     } else if (selectedUnit1 === "km2" && selectedUnit2 === "foot2") {
//       ans = value * 107639;
//     } else if (selectedUnit1 === "km2" && selectedUnit2 === "km2") {
//       ans = value;
//     }
//     setInputValue2(ans);
//   } else if (selectedCategory === "mass") {
//     let ans;

//     if (selectedUnit1 === "g" && selectedUnit2 === "g") {
//       ans = value;
//     } else if (selectedUnit1 === "g" && selectedUnit2 === "kg") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "g" && selectedUnit2 === "mg") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "g" && selectedUnit2 === "ton") {
//       ans = value / 1e6;
//     } else if (selectedUnit1 === "kg" && selectedUnit2 === "g") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "kg" && selectedUnit2 === "kg") {
//       ans = value;
//     } else if (selectedUnit1 === "kg" && selectedUnit2 === "mg") {
//       ans = value * 1e6;
//     } else if (selectedUnit1 === "kg" && selectedUnit2 === "ton") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "mg" && selectedUnit2 === "g") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "mg" && selectedUnit2 === "kg") {
//       ans = value / 1e6;
//     } else if (selectedUnit1 === "mg" && selectedUnit2 === "mg") {
//       ans = value;
//     } else if (selectedUnit1 === "mg" && selectedUnit2 === "ton") {
//       ans = value / 1e9;
//     } else if (selectedUnit1 === "ton" && selectedUnit2 === "g") {
//       ans = value * 1e6;
//     } else if (selectedUnit1 === "ton" && selectedUnit2 === "kg") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "ton" && selectedUnit2 === "mg") {
//       ans = value * 1e9;
//     } else if (selectedUnit1 === "ton" && selectedUnit2 === "ton") {
//       ans = value;
//     }
//     setInputValue2(ans);
//   } else if (selectedCategory === "temperature") {
//     let ans;

//     if (selectedUnit1 === "C" && selectedUnit2 === "C") {
//       ans = value;
//     } else if (selectedUnit1 === "C" && selectedUnit2 === "F") {
//       ans = (value * 9) / 5 + 32;
//     } else if (selectedUnit1 === "C" && selectedUnit2 === "K") {
//       ans = value + 273.15;
//     } else if (selectedUnit1 === "F" && selectedUnit2 === "C") {
//       ans = ((value - 32) * 5) / 9;
//     } else if (selectedUnit1 === "F" && selectedUnit2 === "F") {
//       ans = value;
//     } else if (selectedUnit1 === "F" && selectedUnit2 === "K") {
//       ans = ((value - 32) * 5) / 9 + 273.15;
//     } else if (selectedUnit1 === "K" && selectedUnit2 === "C") {
//       ans = value - 273.15;
//     } else if (selectedUnit1 === "K" && selectedUnit2 === "F") {
//       ans = ((value - 273.15) * 9) / 5 + 32;
//     } else if (selectedUnit1 === "K" && selectedUnit2 === "K") {
//       ans = value;
//     }
//     setInputValue2(ans);
//   } else if (selectedCategory === "time") {
//     let ans;

//     if (selectedUnit1 === "sec" && selectedUnit2 === "sec") {
//       ans = value;
//     } else if (selectedUnit1 === "sec" && selectedUnit2 === "min") {
//       ans = value / 60;
//     } else if (selectedUnit1 === "sec" && selectedUnit2 === "hour") {
//       ans = value / 3600;
//     } else if (selectedUnit1 === "sec" && selectedUnit2 === "day") {
//       ans = value / 86400;
//     } else if (selectedUnit1 === "sec" && selectedUnit2 === "week") {
//       ans = value / 604800;
//     } else if (selectedUnit1 === "sec" && selectedUnit2 === "month") {
//       ans = value / 2.628e6;
//     } else if (selectedUnit1 === "sec" && selectedUnit2 === "year") {
//       ans = value / 3.154e7;
//     } else if (selectedUnit1 === "min" && selectedUnit2 === "sec") {
//       ans = value * 60;
//     } else if (selectedUnit1 === "min" && selectedUnit2 === "min") {
//       ans = value;
//     } else if (selectedUnit1 === "min" && selectedUnit2 === "hour") {
//       ans = value / 60;
//     } else if (selectedUnit1 === "min" && selectedUnit2 === "day") {
//       ans = value / 1440;
//     } else if (selectedUnit1 === "min" && selectedUnit2 === "week") {
//       ans = value / 10080;
//     } else if (selectedUnit1 === "min" && selectedUnit2 === "month") {
//       ans = value / 43800;
//     } else if (selectedUnit1 === "min" && selectedUnit2 === "year") {
//       ans = value / 525600;
//     } else if (selectedUnit1 === "hour" && selectedUnit2 === "sec") {
//       ans = value * 3600;
//     } else if (selectedUnit1 === "hour" && selectedUnit2 === "min") {
//       ans = value * 60;
//     } else if (selectedUnit1 === "hour" && selectedUnit2 === "hour") {
//       ans = value;
//     } else if (selectedUnit1 === "hour" && selectedUnit2 === "day") {
//       ans = value / 24;
//     } else if (selectedUnit1 === "hour" && selectedUnit2 === "week") {
//       ans = value / 168;
//     } else if (selectedUnit1 === "hour" && selectedUnit2 === "month") {
//       ans = value / 730;
//     } else if (selectedUnit1 === "hour" && selectedUnit2 === "year") {
//       ans = value / 8760;
//     } else if (selectedUnit1 === "day" && selectedUnit2 === "sec") {
//       ans = value * 86400;
//     } else if (selectedUnit1 === "day" && selectedUnit2 === "min") {
//       ans = value * 1440;
//     } else if (selectedUnit1 === "day" && selectedUnit2 === "hour") {
//       ans = value * 24;
//     } else if (selectedUnit1 === "day" && selectedUnit2 === "day") {
//       ans = value;
//     } else if (selectedUnit1 === "day" && selectedUnit2 === "week") {
//       ans = value / 7;
//     } else if (selectedUnit1 === "day" && selectedUnit2 === "month") {
//       ans = value / 30.417;
//     } else if (selectedUnit1 === "day" && selectedUnit2 === "year") {
//       ans = value / 365;
//     } else if (selectedUnit1 === "week" && selectedUnit2 === "sec") {
//       ans = value * 604800;
//     } else if (selectedUnit1 === "week" && selectedUnit2 === "min") {
//       ans = value * 10080;
//     } else if (selectedUnit1 === "week" && selectedUnit2 === "hour") {
//       ans = value * 168;
//     } else if (selectedUnit1 === "week" && selectedUnit2 === "day") {
//       ans = value * 7;
//     } else if (selectedUnit1 === "week" && selectedUnit2 === "week") {
//       ans = value;
//     } else if (selectedUnit1 === "week" && selectedUnit2 === "month") {
//       ans = value / 4.345;
//     } else if (selectedUnit1 === "week" && selectedUnit2 === "year") {
//       ans = value / 52.143;
//     } else if (selectedUnit1 === "month" && selectedUnit2 === "sec") {
//       ans = value * 2.628e6;
//     } else if (selectedUnit1 === "month" && selectedUnit2 === "min") {
//       ans = value * 43800;
//     } else if (selectedUnit1 === "month" && selectedUnit2 === "hour") {
//       ans = value * 730;
//     } else if (selectedUnit1 === "month" && selectedUnit2 === "day") {
//       ans = value * 30.417;
//     } else if (selectedUnit1 === "month" && selectedUnit2 === "week") {
//       ans = value * 4.345;
//     } else if (selectedUnit1 === "month" && selectedUnit2 === "month") {
//       ans = value;
//     } else if (selectedUnit1 === "month" && selectedUnit2 === "year") {
//       ans = value / 12;
//     } else if (selectedUnit1 === "year" && selectedUnit2 === "sec") {
//       ans = value;
//     } else if (selectedUnit1 === "year" && selectedUnit2 === "min") {
//       ans = value * 525600;
//     } else if (selectedUnit1 === "year" && selectedUnit2 === "hour") {
//       ans = value * 8760;
//     } else if (selectedUnit1 === "year" && selectedUnit2 === "day") {
//       ans = value * 365;
//     } else if (selectedUnit1 === "year" && selectedUnit2 === "week") {
//       ans = value * 52.143;
//     } else if (selectedUnit1 === "year" && selectedUnit2 === "month") {
//       ans = value * 12;
//     } else if (selectedUnit1 === "year" && selectedUnit2 === "year") {
//       ans = value;
//     }
//     setInputValue2(ans);
//   } else if (selectedCategory === "volume") {
//     let ans;

//     if (selectedUnit1 === "ml" && selectedUnit2 === "ml") {
//       ans = value;
//     } else if (selectedUnit1 === "ml" && selectedUnit2 === "l") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "ml" && selectedUnit2 === "cm3") {
//       ans = value;
//     } else if (selectedUnit1 === "ml" && selectedUnit2 === "m3") {
//       ans = value / 1e6;
//     } else if (selectedUnit1 === "l" && selectedUnit2 === "ml") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "l" && selectedUnit2 === "l") {
//       ans = value;
//     } else if (selectedUnit1 === "l" && selectedUnit2 === "cm3") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "l" && selectedUnit2 === "m3") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "cm3" && selectedUnit2 === "ml") {
//       ans = value;
//     } else if (selectedUnit1 === "cm3" && selectedUnit2 === "l") {
//       ans = value / 1000;
//     } else if (selectedUnit1 === "cm3" && selectedUnit2 === "cm3") {
//       ans = value;
//     } else if (selectedUnit1 === "cm3" && selectedUnit2 === "m3") {
//       ans = value / 1e6;
//     } else if (selectedUnit1 === "m3" && selectedUnit2 === "ml") {
//       ans = value * 1e6;
//     } else if (selectedUnit1 === "m3" && selectedUnit2 === "l") {
//       ans = value * 1000;
//     } else if (selectedUnit1 === "m3" && selectedUnit2 === "cm3") {
//       ans = value * 1e6;
//     } else if (selectedUnit1 === "m3" && selectedUnit2 === "m3") {
//       ans = value;
//     }
//     setInputValue2(ans);
//   } else if (selectedCategory === "speed") {
//     let ans;

//     if (selectedUnit1 === "m/s" && selectedUnit2 === "m/s") {
//       ans = value;
//     } else if (selectedUnit1 === "m/s" && selectedUnit2 === "km/h") {
//       ans = value * 3.6;
//     } else if (selectedUnit1 === "km/h" && selectedUnit2 === "m/s") {
//       ans = value / 3.6;
//     } else if (selectedUnit1 === "km/h" && selectedUnit2 === "km/h") {
//       ans = value;
//     }
//     setInputValue2(ans);
//   }
// };
