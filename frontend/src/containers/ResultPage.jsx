import React, { useEffect, useState } from 'react';
import HeartRateGraph from '../components/HeartRateGraph';
import BarGraph from '../components/BarGraph';
import ProgressGraph from '../components/ProgressGraph';
import PrognosisChart from '../components/PrognosisChart';

const checkYesOrNo = (string) => {
    const yesPatterns = ["yes","yeah","yep","sometimes", "occasionally", "do", "think so"];
    const noPatterns = ["no", "nope", "don't think so", "haven't", "have not", "doesn't"];
    const patternMatchReduce = (acc, pattern) => acc || (string.match(pattern) !== null);
    const mightHaveYes = yesPatterns.reduce(patternMatchReduce, false);
    const mightHaveNo = noPatterns.reduce(patternMatchReduce, false);

    // give more precedence to nos than yes's (if mightHaveNo is true then the entire thing is false)
    return (!mightHaveNo) && mightHaveYes;
}

const ResultPageContainer = (props) => {
  const [mentalHealthScore, setMentalHealthScore] = useState(0);
  const [overallHealthScore, setOverallHealthScore] = useState(0);
  const [physicalHealthScore, setPhysicalHealthScore] = useState(0);

  useEffect(() => {
    setTimeout(() => {setMentalHealthScore(89);
    setOverallHealthScore(90);
    setPhysicalHealthScore(91);
    }, 1000);
  }, [])

  const [newEmotionData, setEmotion] = useState([['name1','318'],['name2','93'],['name3','43'],['name4','20'],['name5','15']]);

  useEffect(() => {
    console.log(props.emotionData);
    console.log('feels');
    let sortable = [];
    for (let emotion in props.emotionData) {
        sortable.push([emotion, props.emotionData[emotion]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    console.log(sortable);
    setEmotion(sortable.slice(0, 5));

  }, [props.emotionData]);

  return (
    <>
    <div className="result-page">
      <ProgressGraph color={{
        '0%': '#A643F4',
        '100%': 'rgba(249, 89, 166, 0.9)',
        }}
        description="Based off of 3 heuristics"
        name="&#x1F4AF; Overall Score"
        percent={overallHealthScore}
        title="Total Checkup"/>
      <ProgressGraph color={{
        '0%': '#AE72FF',
        '100%': '#9FC0FA',
        }}
        description="Based off your audio answers"
        name="&#x2695; Mental Score"
        percent={mentalHealthScore}
        title="Mental Health"/>
      <ProgressGraph color={{
        '0%': '#FA5656',
        '100%': '#DFA1CE',
        }}
        description="Based off your audio answers"
        name="&#x1F4AA; Physical Score"
        percent={physicalHealthScore}
        title="Physical Health"/>
      <HeartRateGraph data={props.heartData} />
      <BarGraph emotions={newEmotionData}/>
    </div>
          <PrognosisChart progonsis={[['Inconsistent Heart Rate','32'], ['Acne','14'],['Nearsightedness','4'],['Farsightedness','2'], ['Stress','1']]}/>
    </>
  )
}

export default ResultPageContainer;
