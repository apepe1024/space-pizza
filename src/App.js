import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import scriptLoader from 'react-async-script-loader';


class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          'coordinates': ''
      };
      // binding 'this' instances
      this.setCoordinates = this.setCoordinates.bind(this);
  }

  componentDidMount() {
    window.setCoordinates = this.setCoordinates;
  }

  setCoordinates() {
      fetch("http://api.open-notify.org/iss-now.json")
          .then(
              function (response) {
                if (response.status !== 200) { throw response.err; }
                  response.json().then(function (data) {
                      let latitude = data.response.iss_position.latitude;
                      let longitude = data.response.iss_position.longitude;
                      let formattedPosition = "<p> lat: " + latitude + ", lng: " + longitude + "</p>";
                      this.setState({
                        'coordinates': formattedPosition
                      });
                  })
              }

          )
  }

  render() {

    const renderCoordinates = this.state.coordinates;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>Test</p>
        <p>
          {renderCoordinates}
        </p>
      </div>
    );
  }
}

export default App;
