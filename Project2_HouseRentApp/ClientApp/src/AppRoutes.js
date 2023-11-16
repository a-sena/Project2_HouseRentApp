
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Counter from "./components/Counter";
import { Details } from "./components/Details";
import { Delete } from "./components/Delete";
const AppRoutes = [
    {
     
     index: true,

     element: <Home />
  },
  {
    path: '/counter',
      element: <Counter key='create' />
    },
    {
        path: '/update/:id',
        element: <Counter key='update' />
    },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
  {
    path: '/:id',
    element: <Details />
    },
  {
      path: '/delete/:id',
        element: <Delete />
    },
   
   
  
];

export default AppRoutes;
