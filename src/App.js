import React from "react";
import Navbar from "./components/Navbar";
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
