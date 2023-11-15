

import { Home } from "./components/Home";
import Counter from "./components/Counter";
import Create from "./components/Create";
import Update from "./components/Update";
import { Details } from "./components/Details";
import { Delete } from "./components/Delete";
const AppRoutes = [
    {
     
     index: true,

     element: <Home />
  },
 /* {
    path: '/counter',
      element: <Counter key='create' />
    },*/

    {
        path: '/update/:id',
        element: <Update/>
    },
    {
        path: 'counter',
        element: <Counter />
    },

    {
        path: '/create',
        element: <Create />
    },
  {
    path: '/:id',
    element: <Details />
    },
  {
        path: '/delete',
        element: <Delete />
    }
   
   
  
];

export default AppRoutes;
