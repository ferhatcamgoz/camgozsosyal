import  React from 'react';

import Usercreate from "../pages/Usercreate";
import Language from "../components/Language";
import UserLogin from "../pages/UserLogin";
import UserPage from "../pages/UserPage";



function App() {
  
  return (
      <div className="row">
        <UserPage></UserPage>


        <Language/>
      </div>
  );
}

export default App;
