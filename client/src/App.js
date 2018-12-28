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
        <div className="ui container">
        <h1>Namastop</h1>
          <div className="ui comments">
          {this.state.notes.map((note) => {
            return (
              <div key={note._id} className="comment">
                <div className="avatar">
                  <img src={note.userAvatar}/>
                </div>
                <div className="content">
                  <span className="author">{note.username}</span>&nbsp;said&nbsp;
                  <div className="text">
                    {note.text}
                  </div>
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
