import React, { Component } from 'react';
import './App.css';
import clipboard from 'clipboard'

class App extends Component {
  constructor(){
    super()
    
    const TIME_DELAY = 4000
    this.state = {
      result: [],
      ErrorMessage: "",
      Message: "",
      isError: false
    }

    this.generate = this.generate.bind(this)
    this.copy = this.copy.bind(this)
    this.reset = this.reset.bind(this)

    // ? clears the UI messages every TIME_DELAY
    setInterval(()=> this.setState({Message: '' , isError: false}), TIME_DELAY)
  }
  
  componentDidMount(){
    // ? allow the button with id "copy" to actually copy an element's value
    new clipboard('#copy');
  }

  generate(){
    const number = document.querySelector('#spamNumber').value
    const text = document.querySelector("#spamText").value
    const arrayOfSpam = []

    if(number.toString().length < 1 || text.length < 1){
      this.setState({
        isError: true,
        ErrorMessage: "Fields Cannot Be Empty"
      })
      return
    } else {
      this.setState({
        isError: false
      })
    }

    for(let j = 0; j <= number; j++){
      arrayOfSpam.push(text)
    }

    this.setState({
      result: arrayOfSpam
    })
  }

  copy(){
    this.setState({
      Message: "Copied"
    })
  }

  reset(){
    document.querySelector('#spamNumber').value = ""
    document.querySelector("#spamText").value = ""

    this.setState({
      result: []
    })
  }

  render() {
    const result = this.state.result
    const isError = this.state.isError
    const ErrorMessage = this.state.ErrorMessage
    const Message = this.state.Message

    return (
      <div className="container" style={{"width":"50%"}}>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="spamText" className="materialize-textarea" placeholder="Spam Text"></textarea>
            <label htmlFor="icon_prefix2">Message</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type='number' className="materialize-input" id='spamNumber' placeholder="Spam Number" maxLength="2" max="999"/>
            <label htmlFor="icon_prefix2">Number</label>
          </div>
        </div>
        <a onClick={this.generate} className="waves-effect waves-light btn-small">Generate</a>
        <a onClick={this.reset} className="waves-effect waves-light btn-small">reset</a>
        <a onClick={this.copy} className="waves-effect waves-light btn-small" id='copy' data-clipboard-target=".result">Copy</a>
        <ul className="collapsible result">
          {!isError ?
            result.map(value => {
              return (
                <div className="collapsible-header">{value}</div>
              )
            })
          :
          <div className='alert-danger'>{ErrorMessage}</div>
          }
        </ul>
        {Message?
            <div className='alert-success'>{Message}</div>
            :
            ''
        }
      </div>
    );
  }
}

export default App;
