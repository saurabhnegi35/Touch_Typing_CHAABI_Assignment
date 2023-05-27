import React from "react";
import "./Input.css";
import { connect } from "react-redux";
import { setKeyPressed, setTimerPaused, setMatched } from "../reducers/Action";
import { useState, useEffect } from "react";
import Click from "../media/click.wav";
import Error from "../media/error.wav";
import Yay from "../media/yay.wav";

const Input = ({
  displayWord,
  setKeyPressed,
  isKeyPressed,
  setTimerPaused,
  setMatched,
}) => {
  // console.log(displayWord);
  const [word, setWord] = useState("");
  const [isTrue, setIsTrue] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [play, setPlay] = useState("false");
  // const [isTimerPaused, setIsTimerPaused] = useState(false);

  // console.log(play);
  useEffect(() => {
    setPlay("true");
  }, [displayWord]);

  // console.log(isTimerPaused);
  let inputBackgroundColor;

  const handleKeyDown = () => {
    if (!isKeyPressed) {
      setKeyPressed(true);
      setTimerPaused(false);
    }
  };

  function click() {
    if (play === "true") {
      new Audio(Click).play();
    }
  }

  function error() {
    new Audio(Error).play();
  }

  function yay() {
    if (play === "true") {
      new Audio(Yay).play();
    }
  }

  // console.log("Word Length", word.length);
  // console.log("Word Length", word[word.length - 1]);
  // console.log("Display Word length ", props.displayWord[word.length - 1]);
  // console.log(word[word.length - 1] === props.displayWord[word.length - 1]);

  // useEffect(() => {
  //   if (word[word.length - 1] === props.displayWord[word.length - 1]) {
  //     setIsTrue("true");
  //   } else {
  //     setIsTrue("false");
  //   }
  // }, [word, props.displayWord]);
  // console.log(props.displayWord.slice(0, word.length) === word);

  useEffect(() => {
    if (displayWord.slice(0, word.length) === word) {
      setIsTrue("true");
      click();
    } else {
      setIsTrue("false");
      error();
    }
  }, [word, displayWord]);

  useEffect(() => {
    if (displayWord.length === word.length && displayWord === word) {
      setIsTrue("true");
      setMatched(true);
      setIsCompleted(true);
      setTimerPaused(true);
      setTimeout(() => {
        setWord("");
        setIsCompleted(false);
        setKeyPressed(false);
      }, 1000);
      yay();
    }
  }, [word, displayWord, setTimerPaused, setMatched]);

  if (isTrue !== "true") {
    inputBackgroundColor = "#FF6969";
  }
  console.log("is tfalse", isKeyPressed);
  let styles = {
    backgroundColor: inputBackgroundColor,
  };

  // const keys = "asdfghjkl";
  // const wordLengths = [2, 3, 4];
  // const combinations = [];

  // for (let i = 0; i < wordLengths.length; i++) {
  //   const wordLength = wordLengths[i];

  //   for (let j = 0; j < keys.length; j++) {
  //     const startChar = keys[j];

  //     generateCombinations(startChar, wordLength, "");
  //   }
  // }

  // function generateCombinations(currentChar, wordLength, currentWord) {
  //   currentWord += currentChar;

  //   if (currentWord.length === wordLength) {
  //     combinations.push(currentWord);
  //     return;
  //   }

  //   const currentIndex = keys.indexOf(currentChar);

  //   for (let k = currentIndex + 1; k < keys.length; k++) {
  //     const nextChar = keys[k];

  //     generateCombinations(nextChar, wordLength, currentWord);
  //   }
  // }

  // console.log(combinations);

  return (
    <>
      <input
        type="text"
        className="input-bar"
        placeholder="Type the Upper Text Here"
        style={styles}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setWord(e.target.value);
          // console.log(searchText);
        }}
        disabled={isCompleted}
        value={word}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isKeyPressed: state.isKeyPressed,
  };
};

const mapDispatchToProps = {
  setKeyPressed,
  setTimerPaused,
  setMatched,
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
