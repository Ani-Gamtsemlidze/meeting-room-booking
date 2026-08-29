import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Rooms";
import Bookings from "../pages/Bookings";
import Schedule from "../pages/Schedule";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "rooms" ,
        Component: Rooms,
      },
      {
        path: "bookings" ,
        Component: Bookings,
      },
      {
        path: "schedule" ,
        Component: Schedule,
      },
      {
        path: "*",
        Component: NotFound,
      }
    ],
  },
]);
