import React from "react"
import logo from "./logo.svg";
import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import {AnswersList,Chats} from "./components/index"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };
    // bindした関数
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }
  
  selectAnswer = (selectAnswer, nextQuestionId) => {
    switch(true){
      case (nextQuestionId === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionId),500);
        break;
      case(/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a')
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click()
        break;
      default:
        const chat = {
          text: selectAnswer,
          type: 'answer'
        }

        const chats = this.state.chats;
        chats.push(chat)

        this.setState({
          chats: chats
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId),500);
        break;
    }
  }

  // initAnswer = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   const initAnswers = initDataset.answers;

  //   this.setState({
  //     answers: initAnswers
  //   })
  // }

  // initChats = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   const chat = {
  //     text: initDataset.question,
  //     type: "question"
  //   }

  //   const chats = this.state.chats
  //   chats.push(chat)

  //   this.setState({
  //     chats: chats
  //   })
  // }

  componentDidMount(){
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  componentDidUpdate(){
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats}/>
          <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
        </div>
      </section>
    );
  }
}
