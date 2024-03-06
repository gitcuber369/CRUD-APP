import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import { ReadUser } from './ReadUser';
import Updateuser from './Updateuser';


function App() {
  return(
   <div>
    <Routes>
      <Route path= "/" element={<Home  />} />
      <Route path= "/readuser/:id" element={<ReadUser  />} />
      <Route path= "/updateuser/:id" element={<Updateuser/>} />
    </Routes>    
    </div> 
  );
}

export default App;
