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

  handleSubmit = async e => {
    e.preventDefault();
    
  }

  render() {
    return (
      <div className="App">
        <h1>Namastop</h1>
        {this.state.notes.map((note) => {
          return (
            <div key={note._id}>
              <p>{note.username}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
