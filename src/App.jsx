import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/rootLayout/RootLayout";
import NotFound from "./NotFound";
import Home from "./home/Home";
import Read from "./components/readpage/Read";
import View from "./components/viewpage/View";
import Edit from "./components/edirPage/Edit";

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/read" element={<Read />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
