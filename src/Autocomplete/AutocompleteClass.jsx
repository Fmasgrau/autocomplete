import React from "react";
import axios from "axios";
import "./styles.css";


class AutocompleteClass extends React.Component {

    constructor(){
        super()

        this.state = {
            filteredData : [],
            setFilteredData : false,
            userInput : "",
            showSuggestions: false
        }

        this._filterData = this._filterData.bind(this)
        this.pullData = this.pullData.bind(this)
      
    }


   

   _filterData = (input, data) => {
    if (input === "") {
      return [];
    }

    const regex = new RegExp(`${input.trim()}`, "i");
    return data.filter((item) => item.name.search(regex) >= 0);
  };

   pullData = () => {
    let dataPulled;
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      dataPulled = this._filterData(this.state.userInput, res.data);

      if (dataPulled?.length > 0) {
        this.setState({...this.state, showSuggestions: true});
      }

      if (dataPulled?.length > 0) {
        if (dataPulled[0].name === this.state.userInput) {
            this.setState({...this.state, showSuggestions: false});
          return;
        } else {
        this.setState({...this.state, filteredData: dataPulled});
          this.setState({...this.state, showSuggestions: true});
        }
      }
    });
  };

  componentDidUpdate () {
    const getData = setTimeout(() => this.pullData(), 300);

    
  }


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
export default AutocompleteClass;
