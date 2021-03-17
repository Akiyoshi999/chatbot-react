import React,{useState,useEffect,useCallback} from "react"
import "./assets/styles/style.css";
import {AnswersList,Chats} from "./components/index"
import FormDialog from "./components/Forms/FormDialog"
import {db} from "./firebase/index"

const App = () => {
  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState("init")
  const [dataset, setDataset] = useState({})
  const [open, setOpen] = useState(false)

  const handleClickOpen = useCallback(() => {
    setOpen({open:true});
  },[setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false)
  },[setOpen]);

  const addChats = useCallback((chat)=>{
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  },[setChats])

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })

    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }
  
  const selectAnswer = useCallback((selectAnswer, nextQuestionId) => {
    switch(true){
      case (nextQuestionId === 'contact'):
        handleClickOpen()
        break;
        
      case(/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a')
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click()
        break;
        
      default:
        addChats({
          text: selectAnswer,
          type: 'answer'
        })

        setTimeout(() => displayNextQuestion(nextQuestionId,dataset[nextQuestionId]),500);
        break;
    }
  },[answers])


  useEffect(() =>{
    (async() =>{
      const initDataset = {}

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          initDataset[doc.id] = doc.data()
        })
      })

      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })()
  }, [])

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats}/>
        <AnswersList answers={answers} select={selectAnswer}/>
        <FormDialog open={open} handleClose={handleClose}/>
      </div>
    </section>
  );
}

export default App