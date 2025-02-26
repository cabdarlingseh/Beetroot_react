import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Movies from './components/Movies';
import StringToNumber from './components/StringsToNumber';
import SampleApi from './components/SampleApi';
import NotFound from './components/NotFound';
import BlogPage from './components/Blog/BlogPage';
import SinglePost from './components/Blog/SinglePost';
import Homework from './components/Homework';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="homework" element={<Homework />} />
            <Route path="movies" element={<Movies />} />
            <Route path="sampleapi" element={<SampleApi />} />
            <Route path="stringtonumber" element={<StringToNumber />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/singlepost/post-:postId" element={<SinglePost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;