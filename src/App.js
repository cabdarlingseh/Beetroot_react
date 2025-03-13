import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
import DepositPage from './components/DepositsPage/DepositPage';
import PricingPage from './components/Pricing/PricingPage';

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
            <Route path="blog/:id" element={<SinglePost />} />
            <Route path="deposits" element={<DepositPage />} />
            <Route path='pricing' element={<PricingPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;