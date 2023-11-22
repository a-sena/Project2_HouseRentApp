

import { Home } from "./components/Home";

import Create from "./components/Create";
import Update from "./components/Update";
import { Details } from "./components/Details";
import { Delete } from "./components/Delete";
const AppRoutes = [
    {
     
     index: true,

     element: <Home />
  },

    {
        path: '/update/:id',
        element: <Update/>
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
      path: '/delete/:id',
        element: <Delete />
    }
   
   
  
];

export default AppRoutes;
