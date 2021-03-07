import React, { useState } from 'react';

import LocationPage from './LocationPage'
import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import SideBar from '../components/SideBar';
import CameraPage from './CameraPage';

const MainPageContainer = () => {

  const [click, setClick] = useState('camera');

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
              setNext={() => {
                setClick('bullet');
              }}
            />
            <CameraPage />
          </ParentPage> 
        : click === 'bullet' ?
          <ParentPage>
            <NavBar click={click}
              currentStep='Step Three: Gather your results and look at our findings'
              nextStep='Step Four: Gather your results and look at our findings'
              number='3' 
              setBack={() => {
                setClick('camera');}}
              setNext={() => {
                setClick('location');
              }}
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
            <LocationPage />
          </ParentPage> :
        <></>
      }
    </div>
  )
}

export default MainPageContainer;