
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Counter from "./components/Counter";
import { Update } from "./components/Update";
import { Details } from "./components/Details";
import { Delete } from "./components/Delete";
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
    path: '/details/:id',
    element: <Details />
    },
  {
        path: '/delete',
        element: <Delete />
    },
  {
        path: '/update',
        element: <Update />
    }
];

export default AppRoutes;
