import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Components/HomePage/HomePage'
import Admin from './Components/Admin/Admin'
import CollaboratePage from './Components/CollaboratePage/CollaboratePage'
import EventsPage from './Components/EventsPage/EventsPage'
import Login from './Components/Login/Login'
import MakePost from './Components/MakePost/MakePost'
import SignUp from './Components/SignUp/SignUp'
import MyUni from './Components/MyUni/MyUni'

function App() {
  return (
      <Routes>
        <Route exact path="/" element = {<HomePage />}></Route>
        <Route path="/signup" element = {<SignUp />}></Route>
        <Route path="/signin" element = {<Login />}></Route>
        <Route path="/makepost" element = {<MakePost />}></Route>
        <Route path="/myuni/:collegeId" element = {<MyUni />}></Route>
        <Route path="/collaborate" element = {<CollaboratePage />}></Route>
        <Route path="/events" element = {<EventsPage />}></Route>
        <Route path="/admin" element = {<Admin />}></Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  )
}

export default App
