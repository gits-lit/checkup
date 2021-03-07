import React, { useState } from 'react';

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
            <CameraPage />
          </ParentPage> 
        : click === 'bullet' ?
          <ParentPage>
            <div>2</div>
          </ParentPage> 
        : click === 'location' ?
          <ParentPage>
            <div>3</div>
          </ParentPage> :
        <></>
      }
    </div>
  )
}

export default MainPageContainer;