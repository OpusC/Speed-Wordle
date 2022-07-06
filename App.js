import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { WORDS } from './assets/words.js'

export default function App() {

  const BLANKGUESSES = (["     ", "     ", "     ", "     ", "     "]);

  const [name, setName] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [guesses, setGuesses] = React.useState(BLANKGUESSES);
  const [answer, setAnswer] = React.useState(WORDS[Math.floor(Math.random() * WORDS.length)]);

  

  function handleTextSubmit() {

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

  //TODO: RESET GAME
  function resetGame() {
    setGuesses(BLANKGUESSES);
    setAnswer(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setIndex(0);
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
});
