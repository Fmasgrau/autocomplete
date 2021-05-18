import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const Autocomplete = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const DATA_URL = "https://jsonplaceholder.typicode.com/users";

  const _filterData = (input, data) => {
    if (input === "") {
      return [];
    }

    const regex = new RegExp(`${input.trim()}`, "i");
    return data.filter((item) => item.name.search(regex) >= 0);
  };

  const pullData = () => {
    let dataPulled;
    axios.get(DATA_URL).then((res) => {
      dataPulled = _filterData(userInput, res.data);

      if (dataPulled?.length > 0) {
        setShowSuggestions(true);
      }

      if (dataPulled?.length > 0) {
        if (dataPulled[0].name === userInput) {
          setShowSuggestions(false);
          return;
        } else {
          setFilteredData(dataPulled);
          setShowSuggestions(true);
        }
      }
    });
  };

  useEffect(() => {
    const getData = setTimeout(() => pullData(), 300);

    return () => {
      clearTimeout(getData);
    };
  }, [userInput]);

  useEffect(() => {
    if (userInput === "") {
      setShowSuggestions(false);
      return;
    }
  }, [userInput]);

  return (
    <>
      <input
        className="input-custom"
        type="text"
        onChange={(event) => setUserInput(event.target.value)}
        value={userInput}
      ></input>
      {showSuggestions ? (
        <ul className="ul-custom">
          {" "}
          {filteredData.map((res) => (
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className="a-custom"
            >
              <li onClick={() => setUserInput(res.name)}>{res.name}</li>
            </a>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
};
export default Autocomplete;
