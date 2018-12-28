import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    filtered: false
  }

  componentDidMount() {
    this.loadNotes()
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

  loadNotes = () => {
    this.callApi()
      .then(res => this.setState({ 
        notes: res,
        filtered: false
      }))
      .catch(err => console.log(err));
  }

  filterByUser = (userId) => {
    const notes = this.state.notes
    this.setState({ 
      notes: notes.filter((note) => note.userId == userId),
      filtered: true
    })
  }

  renderBackButton = () => {
    if(this.state.filtered) {
      return <button onClick={() => this.loadNotes()} className="ui button">go back</button>
    }
  }

  render() {
    return (
      <div className="App">
        <div className="ui container">
        <h1>Namastop</h1>
        {this.renderBackButton()}
        <div className="ui comments">
          {this.state.notes.map((note) => {
            return (
              <div key={note._id} className="comment">
                <div className="avatar">
                  <img src={note.userAvatar || "https://semantic-ui.com/images/avatar/small/elliot.jpg"}/>
                </div>
                <div className="content">
                  <span onClick={() => this.filterByUser(note.userId) } className="author">
                    {note.username}
                  </span>
                  <span>&nbsp;said to&nbsp;</span>
                  <span className="author">
                    {note.target}
                  </span>
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
