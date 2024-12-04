import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter/Filter";
import AccountSelector from "./components/Account/AccountSelector";
import DateProducts from "./components/DateProducts/DateProducts";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { productResolver } from "./resolver/productResolver";

const App = () => {
  // Define routes with loaders
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Filter />
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
      path: "/compte",
      element: (
        <>
          <Navbar />
          <AccountSelector />
          <DateProducts />
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
