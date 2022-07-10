import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { WORDS } from './assets/words.js'
import { Button, Modal } from "react-native";

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
  const [menu, setMenu] = React.useState(false);

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
      <Block letter={letters[0]} index={0} />
      <Block letter={letters[1]} index={1} />
      <Block letter={letters[2]} index={2} />
      <Block letter={letters[3]} index={3} />
      <Block letter={letters[4]} index={4} />
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
      <View style={{ justifyContent: "flex-start" }}>
        <Button title="menu" onPress={() => { setMenu(!menu) }} />
      </View>
      <Modal visible={menu} transparent={true}>
        <View style={styles.menu}>
          <Text style={styles.textStyle}>
            menu
          </Text>
          <View style={styles.button}>
            <Button title="Change Time" />
          </View>
          <View style={styles.button}>
            <Button title="Change Mode" />
          </View>
          <View style={styles.button}>
            <Button title="Exit" onPress={() => { setMenu(!menu) }} />
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>SpeedWordle</Text>
      <Text style={styles.timer}>{clock}</Text>
      <View style={{display: "flex", justifyContent: "stretch", flexDirection: "column", alignSelf: "center"}}>
        <BlockRow guess={guesses[0]} />
        <BlockRow guess={guesses[1]} />
        <BlockRow guess={guesses[2]} />
        <BlockRow guess={guesses[3]} />
        <BlockRow guess={guesses[4]} />
        <TextInput
          style={styles.textInput}
          onChangeText={setName}
          onSubmitEditing={handleTextSubmit}
          //value is whats currently in the text box
          value={name}
          placeholder="Enter word"
          placeholderTextColor={"white"}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style1: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',

  },
  style2: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    aspectRatio: 1,
    borderColor: "#404040",
    borderWidth: 2,
    height: 60,
    alignContent: "stretch",
    justifyContent: "center",
    margin: 5,
  },
  guessMedium: {
    borderColor: "gold",
    borderWidth: 2,
    aspectRatio: 1,
    alignContent: "stretch",
    height: 60,
    justifyContent: "center",
    margin: 5,
  },
  guessCorrect: {
    borderColor: "green",
    borderWidth: 2,
    aspectRatio: 1,
    alignContent: "stretch",
    height: 60,
    justifyContent: "center",
    margin: 5,
  },
  guessIncorrect: {
    borderColor: "red",
    borderWidth: 2,
    aspectRatio: 1,
    alignContent: "stretch",
    height: 60,
    justifyContent: "center",
    margin: 5,
  },
  guessRow: {
    margin: 5,
    display: "flex",
    flexDirection: "row",
  },
  textStyle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 30,
  },
  title: {
    fontSize: 40,
    color: "#FFFFFF",
    justifyContent: "center",
    alignContent: "flex-start"
  },
  textInput: {
    display: "flex",
    width: "95%",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#404040",
    color: 'white',
  },
  timer: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  menu: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: "10%",
    marginHorizontal: "10%",
    backgroundColor: "#404040",
  },
  button: {
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
