import React, { useState } from 'react';

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
            <div>1</div>
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