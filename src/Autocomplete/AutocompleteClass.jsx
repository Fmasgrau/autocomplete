import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { render } from "@testing-library/react";

class Autocomplete extends React.Component {

    constructor(){
        super()

        this.state = {
            filteredData : [],
            setFilteredData : false,
            userInput : "",
            showSuggestions: false
        }

        this._filterData = this.filteredData.bind(this)
        this.pullData = this.pullData.bind(this)
    }


   DATA_URL = "https://jsonplaceholder.typicode.com/users";

   _filterData = (input, data) => {
    if (input === "") {
      return [];
    }

    const regex = new RegExp(`${input.trim()}`, "i");
    return data.filter((item) => item.name.search(regex) >= 0);
  };

   pullData = () => {
    let dataPulled;
    axios.get(DATA_URL).then((res) => {
      dataPulled = this._filterData(userInput, res.data);

      if (dataPulled?.length > 0) {
        this.setState({...this.state, showSuggestions: true});
      }

      if (dataPulled?.length > 0) {
        if (dataPulled[0].name === userInput) {
            this.setState({...this.state, showSuggestions: false});
          return;
        } else {
        this.setState({...this.state, filteredData: dataPulled});
          this.setState({...this.state, showSuggestions: true});
        }
      }
    });
  };

//   useEffect(() => {
//     const getData = setTimeout(() => pullData(), 300);

//     return () => {
//       clearTimeout(getData);
//     };
//   }, [userInput]);

//   useEffect(() => {
//     if (userInput === "") {
//       setShowSuggestions(false);
//       return;
//     }
//   }, [userInput]);

  render() {
  return (
    <>
      <input
        className="input-custom"
        type="text"
        onChange={(event) => this.setState({...this.state, userInput : event.target.value})}
        value={this.state.userInput}
      ></input>
      {this.state.showSuggestions ? (
        <ul className="ul-custom">
          {" "}
          {this.state.filteredData.map((res) => (
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className="a-custom"
            >
              <li onClick={() => this.setState({...this.state, userInput : res.name})}>{res.name}</li>
            </a>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
};
export default Autocomplete;
