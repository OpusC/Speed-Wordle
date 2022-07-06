import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { WORDS } from './assets/words.js'

export default function App() {

  const BLANKGUESSES = (["     ", "     ", "     ", "     ", "     "]);

  let maxTime = 90;
  let minutes = parseInt(maxTime / 60, 10);
  let seconds = parseInt(maxTime % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  

  const [name, setName] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [guesses, setGuesses] = React.useState(BLANKGUESSES);
  const [answer, setAnswer] = React.useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [clock, setClock] = React.useState(minutes + ":" + seconds);

  var intervalId = null;

  function startTimer() {
    // let timer = maxTime;
    intervalId = setInterval(function () {
        
        minutes = parseInt(maxTime / 60, 10);
        seconds = parseInt(maxTime % 60, 10);


        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        setClock(minutes + ":" + seconds);

        if (--maxTime < 0) {
            alert("Time ran out! Word was " + answer);
            resetGame();
            
            
        }

    }, 1000);
}

  function handleTextSubmit() {
    if (index === 0) {
      startTimer();
    }
    //check if word is correct length
    if (name.length != 5) {
      alert("Invalid Word Length")
    } //check if invalid word
    else if (!WORDS.includes(name)) {
      alert("Invalid Word")
    } //accept guess
    else if (name.length === 5 && WORDS.includes(name)) {
      setGuesses(guesses[index] = name);
    //THIS IS HOW YOU UPDATE STATE THAT IS AN ARRAY
    let newArr = [...guesses]; //copy old array
    newArr[index] = name;
    setGuesses(newArr);

    setIndex(index + 1);
    setName("");

    //CHECK IF GAME IS OVER AFTERWARDS, reset if it is
    checkGameState();
    }
    
  }

  //resets game
  function resetGame() {
    
    clearInterval(intervalId);
    setName("");
    setGuesses(BLANKGUESSES);
    setIndex(0);
    
    

    setAnswer(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }

  //check if word has been found or guesses have run out. 
  function checkGameState() {
    if (guesses.includes(answer)) {
      alert("Winner winner chicken dinner!");
      resetGame();
    } else if (guesses[4] != "     ") {
      alert('You lost! Word was ' + answer);
      resetGame();
    }
  }

  const BlockRow = ({
    guess
  }) => {

    const letters = guess.split("")

    return <View style={styles.guessRow}>
      <Block letter={letters[0]} index={0}/>
      <Block letter={letters[1]} index={1}/>
      <Block letter={letters[2]} index={2}/>
      <Block letter={letters[3]} index={3}/>
      <Block letter={letters[4]} index={4}/>
    </View>
  }

  const Block = ({
    letter,
    index
  }) => {
    const blockStyles = [styles.block]
    if (letter === " ") {
    } else if (letter === answer[index]) {
      blockStyles.push(styles.guessCorrect)
    } else if (answer.includes(letter)) {
      blockStyles.push(styles.guessMedium)
    } else if (!answer.includes(letter)) {
      blockStyles.push(styles.guessIncorrect)
    }

    return <View style={blockStyles}>
      <Text style={styles.textStyle}>
        {letter}
      </Text>
    </View>
  }

  return (
    <View style={styles.style1}>
      <Text style={styles.title}>SpeedWordle</Text>
      <Text style={styles.timer}>{clock}</Text>
      <BlockRow guess={guesses[0]}/>
      <BlockRow guess={guesses[1]}/>
      <BlockRow guess={guesses[2]}/>
      <BlockRow guess={guesses[3]}/>
      <BlockRow guess={guesses[4]}/>
      <TextInput
        style={styles.textInput}
        onChangeText={setName}
        onSubmitEditing={handleTextSubmit}
        //value is whats currently in the text box
          value={name} 
        placeholder="Enter word"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style1: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style2: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    borderColor: "#404040",
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  guessMedium: {
    borderColor: "gold",
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  guessCorrect: {
    borderColor: "green",
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  guessIncorrect: {
    borderColor: "red",
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textStyle: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  title: {
    fontSize: 55,
    color: "#FFFFFF",
  },
  textInput: {
    color: '#FFFFFF',
  },
  timer: {
    color: '#FFFFFF',
  },
});
