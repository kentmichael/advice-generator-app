/*
  Random Advice Generator
  By default, on first load the app will request for a
  random advice and display it to the card. Then, the Class
  Advice will have the dice button listen to a 'click' event
  to request for another random advice and replace the first
  one in the card.
*/
class Advice{
  constructor(diceButton, displayMessage, displayNumber){
    this.diceButton = diceButton;
    this.displayMessage = displayMessage;
    this.displayNumber = displayNumber;

    diceButton.addEventListener('click', this.randomAdvice);
  }

  randomAdvice = () => {
    let slip_id = Math.ceil(Math.random() * 224);
    fetch(`https://api.adviceslip.com/advice/${slip_id}`).
    then((response) => {
      if(!response.ok){
        throw new Error(response.status);
      }
      return response.json();
    }).
    then((data) => {
      this.displayAdvice(data);
    }).
    catch((err) => {
      console.error(err);
    });
  }

  displayAdvice = ({slip}) => {
    const {id, advice} = slip;
    this.displayMessage.innerText = advice;
    this.displayNumber.innerText = id;
  }
}

const diceButton = document.querySelector('.dice-btn');
const displayMessage = document.querySelector('.advice-msg');
const displayNumber = document.querySelector('h1 .advice-num');
const adviceOnLoad = new Advice(diceButton, displayMessage, displayNumber);

adviceOnLoad.randomAdvice();