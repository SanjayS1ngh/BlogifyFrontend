

import './App.css'
import { Routes, Route } from 'react-router-dom';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import SinglePostPage from './pages/SinglePostPage';
import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';
function App() {
 

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/blog/:id' element={<SinglePostPage></SinglePostPage>}></Route>
        <Route path='/blog/add' element={<AddPostPage></AddPostPage>}></Route>
        <Route path='/blog/edit/:id' element={<EditPostPage></EditPostPage>}></Route>
        <Route path="/user/signup" element={<SignupPage />} />
         <Route path="/user/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  )
}

export default App
