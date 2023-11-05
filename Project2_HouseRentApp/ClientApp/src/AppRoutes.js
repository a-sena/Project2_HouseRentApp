
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Counter from "./components/Counter";
import Update from "./components/Update";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
  {
        path: '/update',
        element: <Update />
    }
];

export default AppRoutes;
