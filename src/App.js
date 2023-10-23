import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import FullBlog from './components/Blogs/FullBlog';
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/createnew' element={<Blog />} />
        <Route exact path='/blogs/:blogId' element={<FullBlog />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
