import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const STARTING_TIME = 10;

  const [text, setText] = useState("");
  const [quote, setQuote] = useState("");
  const [countdown, setCountdown] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const textAreaRef = useRef(null);

  const urlAPI = "https://type.fit/api/quotes";

  //fetch quote API and randomize the index
  const loadData = async () => {
    const response = await fetch(urlAPI);
    const data = await response.json();
    setQuote(data[Math.floor(Math.random() * data.length)].text);
  };
  //lifecycle method to load json data
  useEffect(() => {
    loadData();
  }, []);

  //need to:
  //on start: clear text area
  //accept 'enter' as a start
  //maybe on start: display the word prompt
  //any chance making the quotes more than 25 words?
  const start = () => {
    setIsTimeRunning(true);
    setCountdown(STARTING_TIME);
    setText("");
    textAreaRef.current.disabled = false;
    textAreaRef.current.focus();
  };
  const endGame = () => {
    setIsTimeRunning(false);
  };

  //timer
  useEffect(() => {
    if (isTimeRunning && countdown > 0) {
      setTimeout(() => {
        setCountdown((time) => time - 1);
      }, 1000);
    }
    if (countdown === 0) {
      endGame();
    }
  }, [countdown, isTimeRunning]);

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const wordCount = (str) => {
    let arr = str
      .trim()
      .split(" ")
      .filter((word) => word);
    return arr.length;
  };
  const showResult = wordCount(text);
  //to save score or how many words => need to create and store this in state

  //for more functionality we'l need to use useRef...
  return (
    <div className="App">
      <h1>Type the following as fast as you can:</h1>
      <div className="quoteBox">
        <p>{quote}</p>
      </div>
      <textarea
        disabled={!isTimeRunning}
        onChange={handleChange}
        value={text}
        ref={textAreaRef}
      />
      <h4>Time Remaining: {countdown}</h4>
      <button onClick={start} disabled={isTimeRunning}>
        Start
      </button>
      <h1>word count: {!isTimeRunning ? showResult : "???"}</h1>
    </div>
  );
}

export default App;
