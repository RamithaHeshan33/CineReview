import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Add from './Components/Add/Add';
import Search from './Components/Search/Search';
import Update from './Components/Update/Update';
import Delete from './Components/Delete/Delete';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/search" element={<Search />} />
        <Route path="/update" element={<Update />} />
        <Route path='/delete' element={<Delete />} />

      </Routes>
    </div>
  );
}

export default App;
