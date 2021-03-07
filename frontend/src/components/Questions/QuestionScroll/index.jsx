import './style.scss';
import { useEffect } from 'react';

const QuestionScroll = (props) => {
  const questions = ['Are you able to see the screen clearly without loss of vision?',
  'Do you feel dizzy, drowsy, or disoriented?',
  'Do you feel shortness of breath?',
  'Do you experience chest pain?',
  'Do you experience pain in one or both eyes?',
  'Do you feel little interest or pleasure in doing things?',
  'Do you feel down, depressed, or hopeless?',
  'Do you have trouble concentrating on things, such as reading this text?',
  'Do you constantly feel tired or have little energy?',
  'Do you have thoughts of inflicting self-harm?'
  ]

  useEffect(() => {
    console.log('changed');
    const element = document.getElementById(`q-${props.questionIndex}`)
    const elemRect = element.getBoundingClientRect();
    //console.log(elemRect.top);
    const questionScroll = document.getElementById("question-scroll");
    const questionRect = questionScroll.getBoundingClientRect();
    const topScroll =  elemRect.top - questionRect.top - (questionScroll.offsetHeight/2) + (element.offsetHeight /2);
    //console.log(questionRect.top);
    questionScroll.scrollTo({top: topScroll, left: 0, behavior: 'smooth' });
  }, [props.questionIndex]);


  return (
    <div id="question-scroll" className="question-scroll">
      {questions.map((value, index) => {
        if (index + 1 == props.questionIndex) {
          return (<div className="question-piece bold" id={`q-${index + 1}`}>{index + 1}. {value}</div>);
        }
        else {
          return (<div className="question-piece" id={`q-${index + 1}`}>{index + 1}. {value}</div>);
        }
      })}
    </div>
  )
}

export default QuestionScroll;