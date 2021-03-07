import React from 'react';
import HeartRateGraph from '../components/HeartRateGraph';
import ProgressGraph from '../components/ProgressGraph';

const ResultPageContainer = () => {
  return (
    <div>
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
      <HeartRateGraph emotions={[['name1','318'],['name2','93'],['name3','43'],['name4','20'],['name5','15']]}/>
    </div>
  )
}

export default ResultPageContainer;