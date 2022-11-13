import { useRoutes, RouteObject } from "react-router-dom";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom/SingleRoom";
import Error from "./pages/Error";
import MainLayout from "./layouts/MainLayout";

/** Думаю, лучше использовать родные пропсы Route
 * RouteProps в старом варианте
 * RouteObject с useRoutes
 */
type TRouteItem = RouteObject;

const routes: TRouteItem[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/rooms",
    element: <Rooms />,
  },
  {
    path: "/room/:slug",
    element: <SingleRoom />,
  },
  {
    path: "/*",
    element: <Error />,
  },
];

function App() {
  return useRoutes([{ path: "/", element: <MainLayout />, children: routes }]);
}

export default App;
