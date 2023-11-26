

import Login from "./view/Inicio/Login";
import Recuperar from "./view/Inicio/Recuperar";
import Registrar from "./view/Inicio/Registrar";

import IndexUser from "./view/Admin/index"
import IndexEntrenador from "./view/Entrenador/index"
import Cliente from "./view/Admin/Usuarios/Cliente"

import Entrenador from "./view/Admin/Usuarios/Entrenador"

import Recepcionista from "./view/Admin/Usuarios/Recepcionista"

import Rutinas from "./view/Admin/Rutinas/Runitas"
import Index from "./view/Index/Index"

var routes = [
 
   {
    path: "/index",
    name: "Index",
    icon: "fas fa-heart",
    component: <Index />,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "fas fa-heart",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/recuperar",
    name: "Recuperar",
    icon: "fas fa-heart",
    component: <Recuperar />,
    layout: "/auth",
  },
  {
    path: "/registrar",
    name: "Resgistrar",
    icon: "fas fa-heart",
    component: <Registrar />,
    layout: "/auth",
  },
  {
    path:"/index",
    name:"Index",
    icon:"fas  fa-home text-blue",
    component:<IndexUser/>,
    layout:"/admin"

  },
  {
    path:"/clientes",
    name:"Clientes",
    icon:"fa fa-users text-green",
    component:<Cliente/>,
    layout:"/admin"

  },
  {
    path:"/entrenador",
    name:"Entrenador",
    icon:"fa fa-graduation-cap text-yellow",
    component:<Entrenador/>,
    layout:"/admin"

  },
  {
    path:"/recepcionista",
    name:"Recepcionista",
    icon:"fa fa-address-card text-red",
    component:<Recepcionista/>,
    layout:"/admin"

  },
  {
    path:"/rutinas",
    name:"Rutinas",
    icon:"fa fa-flag-checkered text-red",
    component:<Rutinas/>,
    layout:"/admin"

  } ,
  {
    path:"/index",
    name:"Index",
    icon:"fas  fa-home text-blue",
    component:<IndexUser/>,
    layout:"/cliente"

  },
  {
    path:"/index",
    name:"Index",
    icon:"fas  fa-home text-blue",
    component:<IndexEntrenador/>,
    layout:"/entrenador"

  }, {
    path:"/index",
    name:"Index",
    icon:"fas  fa-home text-blue",
    component:<IndexUser/>,
    layout:"/recepcionista"

  },
  
];

export default routes;
