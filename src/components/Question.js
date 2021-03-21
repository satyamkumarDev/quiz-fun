import React from 'react';

export default function Question({handleAnswer,displayNextQuestions,correctAnswer, data:{question, correct_answer, answers}}){
    return(
        <div className="flex flex-col">
<div className="bg-white text-indigo-800 p-6 rounded-lg shadow-md">
       <h2 className="text-2xl" dangerouslySetInnerHTML={{__html:question}}></h2></div>
     <div className="grid grid-cols-2 gap-6 mt-6">

      {answers.map((answer)=>{
        const textCol=correctAnswer ? answer===correct_answer ?'text-green-800':'text-red-800':'text-indigo-800'
        return(
        <button style={
          {outline:'none'}}
        onClick={()=>handleAnswer(answer)}
      
         className={`${textCol} bg-white p-4 mb-4 rounded font-bold` }
         >{answer}</button>)
})}
     </div>
     {correctAnswer && (<button  onClick={()=>displayNextQuestions()} className={`bg-white ml-auto p-4 mb-4 text-black rounded font-bold shadow`}>
       Next
     </button>)}
</div>
    )


}