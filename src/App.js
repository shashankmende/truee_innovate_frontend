
import './App.css';
import AddCandidate from './components/AddCandidate/AddCandidate';
import Candidate from './components/Candidate/Candidate';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Candidate/>}/>
          <Route path='/new-candidate' element={<AddCandidate/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
