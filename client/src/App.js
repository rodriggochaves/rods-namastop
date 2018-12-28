import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ notes: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const body = await response.json();
    return body
  }

  render() {
    return (
      <div className="App">
        <h1>Namastop</h1>
        <div className="ui container">
          <div className="ui feed">
          {this.state.notes.map((note) => {
            return (
              <div key={note._id} className="event">
                <a className="user">{note.username}</a>&nbsp;said&nbsp;
                <div className="extra text">
                  {note.text}
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
