/* eslint-disable react/jsx-no-target-blank */
import './App.css'
import { Routes, Route } from 'react-router-dom';
import FormView from './views/FormView';
import FormUpdate from './views/FormUpdate';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<FormView/>} />
      <Route path='/update' element={<FormUpdate />} />
    </Routes>
    </>
  )
}

export default App
