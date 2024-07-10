import React from 'react'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import RootLayout from './components/rootLayout/RootLayout'
import NotFound from './NotFound'
import Home from './home/Home'


const App = () => {
  return (
    <>
     <div>
      <BrowserRouter>
        <Routes>
          <Route
           path="/"
           element={
             <RootLayout />
           }
          >
          <Route path="/" element={<Home />} />
            {/* <Route path="/create" element={<Product />} /> */}
            {/* <Route path="/all" element={<Cart />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
