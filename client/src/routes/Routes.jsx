import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../App";
import { Home } from "../home/Home";
import { Detail } from "../detail/Detail";
import { AddDriver } from "../addDrivers/AddDriver";

const Routes = () => {
  const reoutesPublic = [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/home/:id",
      element: <Detail />,
    },
    {
      path:"/add",
      element:<AddDriver/>
    }
  ];

  const router = createBrowserRouter(reoutesPublic);
  return <RouterProvider router={router} />;
};

export default Routes;
