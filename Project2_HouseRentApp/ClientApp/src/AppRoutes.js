
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Counter from "./components/Counter";


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
  }
];

export default AppRoutes;
