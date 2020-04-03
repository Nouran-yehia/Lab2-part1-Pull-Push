import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import './index.js';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000/');


let id = Math.ceil(Math.random()*10000);

const App= (props) => {
     const [messages, setMessages] = useState([])
     const [unames, setUnames] = useState([])
     const [input, setInput] = useState('');
     const [inputUser, setinputUser] = useState('');
     
useEffect (()=> {
    socket.on('new-message',(message,uname)=>
    {setMessages(messages => messages.concat(message))
    setUnames(unames => unames.concat(uname)) })
},[]) //[] to call it once 

console.log(messages)
     const handleChangeM = (e) =>{
       const{target:{value}} = e
       setInput(value)
     }

     const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit('message', input, inputUser)
       } 
         
     const handleChangeU = (e) =>{
      const{target:{value}} = e
      setinputUser(value)
    }
      return(
         <div className="App">
      <header className="App-header">
      <form name="publish" id="form" onSubmit={handleSubmit}>
            <input id="content"  type="text" name="content" placeholder="Enter your message"  onChange={handleChangeM} value={input} />
            <input id="username" type="text" name="uname" placeholder="Enter your name" onChange={handleChangeU} value={inputUser} />
            <input type="submit"  />
          </form>

          <div id="content">
            <table>
              <tr>
                <td>
               {
                  messages.map(m => <h4 key={m}>{m}</h4>)
                  }
                  </td>
                  <td>
                      {unames.map(n => <h6 key={n}>From: {n}</h6>)}
                  </td>
                  
                  
                 
              </tr>
            </table>
                 
                  </div>
                  <div>
                  <br></br>

          </div>
      </header>
    </div>
  );
     }


export default App;
