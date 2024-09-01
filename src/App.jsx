import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  CreateFoodItem,
  FoodItems,
  Home,
  Navbar,
  Signin,
  Signup,
  UserProfile,
} from "./components";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/user-profile",
      element: (
        <>
          <Navbar />
          <UserProfile />
        </>
      ),
    },
    {
      path: "/food-items",
      element: (
        <>
          <Navbar />
          <FoodItems />
        </>
      ),
    },
    {
      path: "/create-food-item",
      element: (
        <>
          <Navbar />
          <CreateFoodItem />
        </>
      ),
    },
    {
      path: "/signin",
      element: (
        <>
          <Navbar />
          <Signin />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Signup />
        </>
      ),
    },
    // Add more routes as needed
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
