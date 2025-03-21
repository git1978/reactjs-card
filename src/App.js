import React from "react";
import Navbar from "./components/Navbar";
import Copim from "./components/Copim/Copim";
import Home from "./pages/Home";
import "./App.scss";
import Cart from "./pages/Cart";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { productResolver } from "./resolver/productResolver";
import { documentResolver } from "./resolver/documentResolver";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import MbeHeader from "./components/Header/Header";
import MbeMenu from "./components/Menu/Menu";
import MbeContainsMain from "./components/MainContains/MainContent";
import MbeFooter from "./components/Footer/Footer";

const App = () => {
  // Define routes with loaders
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <div className="app-container">
            <MbeHeader />
            <div className="d-flex flex-column">
              <div className="d-flex">
                <MbeMenu />
                <div className="p-4 main-content">
                  <Navbar />
                  <Home />
                </div>
              </div>
              <MbeFooter />
            </div>
          </div>
        </>
      ),
      loader: productResolver, // Attach the productResolver to the Home route
    },
    {
      path: "/cart",
      element: (
        <>
          <div className="app-container">
            <MbeHeader />
            <div className="d-flex flex-column">
              <div className="d-flex">
                <MbeMenu />
                <div className="p-4 main-content">
                  <Cart />
                </div>
              </div>
              <MbeFooter />
            </div>
          </div>
        </>
      ),
    },
    {
      path: "/filter",
      element: (
        <>
          <div className="app-container">
            <MbeHeader />
            <div className="d-flex flex-column">
              <div className="d-flex">
                <MbeMenu />
                <MbeContainsMain />
              </div>
              <MbeFooter />
            </div>
          </div>
        </>
      ),
      loader: documentResolver, // Attach the documentResolver to the Home route
    },
    {
      path: "/nba",
      element: (
        <>
          <div className="app-container">
            <MbeHeader />
            <div className="d-flex flex-column">
              <div className="d-flex">
                <MbeMenu />
                <div className="p-4 main-content">
                  <iframe
                    src="http://localhost:4200"
                    title="External Application"
                    width="100%"
                    height="800px"
                    frameBorder="0"
                  />
                </div>
              </div>
              <MbeFooter />
            </div>
          </div>
        </>
      ),
      loader: documentResolver, // Attach the documentResolver to the Home route
    },
    {
      path: "/copim",
      element: (
        <>
          <div className="app-container">
            <MbeHeader />
            <div className="d-flex flex-column">
              <div className="d-flex">
                <MbeMenu />
                <div className="p-4 main-content">
                  <Copim />
                </div>
              </div>
              <MbeFooter />
            </div>
          </div>
        </>
      ),
    },
  ]);

  return (
    <SnackbarProvider
      TransitionComponent={Slide}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <RouterProvider router={router} />{" "}
      {/* Use the router with the resolver */}
    </SnackbarProvider>
  );
};

export default App;
