import React from "react";
import { Provider } from "react-redux";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";
import store from "../../app/store";


const RootLayout = () => {
  return (
    <div>
      <div>
        <Provider store={store}>
          <NavBar />
          <main>
            <Outlet />
          </main>
        </Provider>
      </div>
    </div>
  );
};

export default RootLayout;
