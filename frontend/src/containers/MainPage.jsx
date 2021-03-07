import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import SideBar from '../components/SideBar';

const MainPageContainer = () => {

  const [click, setClick] = useState('steps');

  return (
    <div>
      <SideBar click={click} 
        setClick={(clickInput) => {
          setClick(clickInput);
        }}
      />
      {
        click === 'camera' ?
          <ParentPage>
            <NavBar click={click}
              currentStep='Step Two: Answer Questions while we analyze your video'
              nextStep='Step Three: Gather your results and look at our findings'
              number='2' 
              setBack={() => {
                //setClick(clickInput);}
              }}
            />
            <div>1</div>
          </ParentPage> 
        : click === 'bullet' ?
          <ParentPage>
            <NavBar click={click}
              currentStep='Step Three: Gather your results and look at our findings'
              nextStep='Step Four: Gather your results and look at our findings'
              number='3' 
              setBack={() => {
                setClick('camera');}}
            />
            <div>2</div>
          </ParentPage> 
        : click === 'location' ?
          <ParentPage>
            <NavBar click={click}
              currentStep='Step Four: Find local doctors and share results'
              nextStep='You are done! Thank your trying out the Checkup demo'
              number='4'
              setBack={() => {
                setClick('bullet');}}
            />
            <div>3</div>
          </ParentPage> :
        <></>
      }
    </div>
  )
}

export default MainPageContainer;