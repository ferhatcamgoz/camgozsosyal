import  React from 'react';

import Usercreate from "../pages/Usercreate";
import Language from "../components/Language";
import UserLogin from "../pages/UserLogin";



function App() {
  
  return (
      <div className="row">
        <div className="col">
            <Usercreate />
        </div>
        <div className="col">
            <UserLogin />
        </div>


        <Language/>
      </div>
  );
}

export default App;
