import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Add from './Components/Add/Add';
import Search from './Components/Search/Search';
import Update from './Components/Update/Update';
import Delete from './Components/Delete/Delete';
import UserRegistration from './Components/User/UserRegistration/Register';
import UserLogin from './Components/User/UserLogin/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/search" element={<Search />} />
        <Route path="/update" element={<Update />} />
        <Route path='/delete' element={<Delete />} />
        <Route path='/register' element={<UserRegistration />} />
        <Route path='/login' element={<UserLogin />} />
        

      </Routes>
    </div>
  );
}

export default App;
