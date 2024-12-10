import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter/Filter";
import DragDropFileUpload from "./components/Dragdrop/DragDropFileUpload";
import Copim from "./components/Copim/Copim";
import AccountSelector from "./components/Account/AccountSelector";
import DateProducts from "./components/DateProducts/DateProducts";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { productResolver } from "./resolver/productResolver";
import { documentResolver } from "./resolver/documentResolver";

const App = () => {
  // Define routes with loaders
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
      loader: productResolver, // Attach the productResolver to the Home route
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar />
          <Cart />
        </>
      ),
    },
    {
      path: "/filter",
      element: (
        <>
          <Navbar />
          <Filter />
        </>
      ),
      loader: documentResolver, // Attach the documentResolver to the Home route
    },
    {
      path: "/copim",
      element: (
        <>
          <Navbar />
          <Copim />
        </>
      ),
    },
     {
      path: "/compte",
      element: (
        <>
          <Navbar />
          <AccountSelector />
          <DateProducts />
          <DragDropFileUpload />
        </>
      ),
      loader: productResolver, // Attach the productResolver to the Home route
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

      <RouterProvider router={router} /> {/* Use the router with the resolver */}
    </SnackbarProvider>
  );
};

export default App;
