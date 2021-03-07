import React, { useEffect, useState } from 'react';
import HeartRateGraph from '../components/HeartRateGraph';
import BarGraph from '../components/BarGraph';
import ProgressGraph from '../components/ProgressGraph';
import PrognosisChart from '../components/PrognosisChart';
import ResultHeader from '../components/ResultHeader';

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
    <div className="result-page">
      <ResultHeader/>
      <ProgressGraph color={{
        '0%': '#A643F4',
        '100%': 'rgba(249, 89, 166, 0.9)',
        }}
        description="Based off of 3 heuristics"
        name="&#x1F4AF; Overall Score"
        percent='83'
        title="Total Checkup"/>
      <ProgressGraph color={{
        '0%': '#AE72FF',
        '100%': '#9FC0FA',
        }}
        description="Based off your audio answers"
        name="&#x2695; Mental Score"
        percent='49'
        title="Mental Health"/>
      <ProgressGraph color={{
        '0%': '#FA5656',
        '100%': '#DFA1CE',
        }}
        description="Based off your audio answers"
        name="&#x1F4AA; Physical Score"
        percent='49'
        title="Physical Health"/>
      <HeartRateGraph data={props.heartData} />
      <PrognosisChart progonsis={[['name1','70'],['name2','40'],['name3','30'],['name4','20'],['name5','15']]}/>
      <BarGraph emotions={newEmotionData}/>
    </div>
  )
}

export default ResultPageContainer;
