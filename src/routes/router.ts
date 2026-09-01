import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/Rooms";
import Bookings from "../pages/Bookings";
import Schedule from "../pages/Schedule";
import NotFound from "../pages/NotFound";
import NewBooking from "../pages/NewBooking";
import BookingDetail from "../pages/BookingDetail";
import EditBooking from "../pages/EditBooking";

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
        path: "rooms",
        Component: Rooms,
      },
      {
        path: "bookings",
        children: [
          { index: true, Component: Bookings },
          { path: "new", Component: NewBooking },
          {path:":id", Component: BookingDetail},
          {path:":id/edit", Component: EditBooking}
        ],
      },
      {
        path: "schedule",
        Component: Schedule,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
