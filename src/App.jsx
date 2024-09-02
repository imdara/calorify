import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  CreateFoodItem,
  EditFoodItem,
  FoodItems,
  Home,
  MyDiet,
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
    {
      path: "/edit/:id",
      element: (
        <>
          <Navbar />
          <EditFoodItem />
        </>
      ),
    },
    {
      path: "/my-diet",
      element: (
        <>
          <Navbar />
          <MyDiet />
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
