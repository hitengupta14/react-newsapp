import "./App.css";

import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            key="home"
            path="/"
            element={<News category="everthing"></News>}
          />
          <Route
            exact
            key="general"
            path="/general"
            element={<News category="general"></News>}
          />
          <Route
            exact
            key="business"
            path="/business"
            element={<News category="business"></News>}
          />
          <Route
            exact
            key="entertainment"
            path="/entertainment"
            element={<News category="entertainment"></News>}
          />
          <Route
            exact
            key="health"
            path="/health"
            element={<News category="health"></News>}
          />
          <Route
            exact
            key="science"
            path="/science"
            element={<News category="science"></News>}
          />
          <Route
            exact
            key="technology"
            path="/technology"
            element={<News category="technology"></News>}
          />
          <Route
            exact
            key="sports"
            path="/sports"
            element={<News category="sports"></News>}
          />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
