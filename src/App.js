import React, { useEffect, useState } from 'react';
import Question from './components/Question';

const quizAPI='https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'

function App() {
  const [questions, setQuestions]=useState([]);
  const [currentIndex, setCurrentIndex]=useState(0);
  const [score, setScore]=useState(0);
  const [correctAnswer, setCorrectAnswer]=useState(false)
  const [seconds, setSeconds] = useState(20);

  useEffect(()=>{
    fetch(quizAPI)
    .then((res)=>res.json())
    .then((data)=>{
      const questions=data.results.map((question)=>({
        ...question,
        answers:[
          question.correct_answer,
          ...question.incorrect_answers,
        ].sort(()=>Math.random()- 0.5)
      }))
      setQuestions(questions)
      const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);

      }, 1000);
      return () => clearInterval(interval);
      
    })
    
    
  },[])


  const displayNextQuestions=()=>{
    setCorrectAnswer(false)
    setCurrentIndex(currentIndex+1)
  }

 if(seconds===0){
  displayNextQuestions()
  setSeconds(20)

 }
  const handleAnswer=(answer)=>{
    //check answer
    // const newIndex=currentIndex+1
    // setCurrentIndex(newIndex)
    if(!correctAnswer){
      if(answer===questions[currentIndex].correct_answer){
        setScore(score+1)
      }
    }
 
setCorrectAnswer(true)



  }

  
  return questions.length >0 ? (
    <div className="container">
        {currentIndex>= questions.length ?
        (<div className="bg-white p-10 mb-4 text-red-400 rounded font-bold">
          <h1 className="text-3xl mb-4" style={{color:'#3cb5b2'}}>Game Over!</h1>
          <h1 className="text-3xl text-green-800">Final Score is: <span className="text-green-400">{score}</span></h1>
          </div>):(
            <div className="flex flex-wrap gap-3 ">
              <div className="bg-white text-xl p-4 mb-4 w-2/5 text-center rounded font-bold" style={{color:'#3cb5b2'}}>

                SCORE: <span className="text-green-600 text-2xl">{score}</span><span className="text-3xl">/</span><strong className="text-3xl text-red-400">{currentIndex+1}</strong> </div>
            <div className="bg-white p-4 mb-4 w-2/7 text-xl text-center rounded font-bold"
             style={{color:'#3cb5b2'}}>COUNT:<span className="text-2xl text-red-400">
               {seconds}</span> </div>
            <Question data={questions[currentIndex]} displayNextQuestions={displayNextQuestions} correctAnswer={correctAnswer} handleAnswer={handleAnswer}></Question>
            </div>
          )}
          </div>)
       
    :(
     <div>
       Loading Questions.....
     </div>
  

   )
 }

export default App;
