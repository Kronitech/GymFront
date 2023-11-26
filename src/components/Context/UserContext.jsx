import React, { createContext, useContext, useEffect, useState } from "react";
import { usuarioMembresiaByCedula } from "../../api/Membresia/Membresia";
import { asitenciaRegistrada } from "../../api/Asistencias/Asistencia";
import logoUser from "../../assets/img/user.png";
import { downloadImagenPerfil } from "../../api/Perfil/Perfil";
import { getEntrenador } from "../../api/Entrenador/Entrenador";
import { listaImagenPublicidad,downloadImagenPublicidad } from "../../api/Publicidad/Publicidad";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [publicidades, setPublicidades] = useState([]);
  useEffect(() => {
    listaPublicidades();
  }, []);
  

  const listaPublicidades = async () => {
    try {
      const res = await listaImagenPublicidad();
      const data = await res.json();

      const newData = await Promise.all(
        data.map(async (publicidad) => {
          const imageUrl = await getImagenPublicidad(publicidad.foto);
          return { ...publicidad, url: imageUrl };
        })
        
      );

      setPublicidades(newData);
    
    } catch (error) {
      console.log(error);
    }
  };
  const getImagenPublicidad = async (key) => {
    try {
      const response = await downloadImagenPublicidad(key);

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob); // Crea una URL para la imagen descargada
        console.log(imageUrl);

        return imageUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //modulo del usuario
  const modulo = localStorage.getItem("modulo");
  //Informacion del usuario para el perfil
  const [usuario, setUsuario] = useState([]);
  //Imagen de perfil del usuario
  const [urlImagen, setUrlImagen] = useState(logoUser); // Puedes inicializarlo con el valor inicial de la imagen
  //Si es cliente se verifica la membresia
  const [membresiaActiva, setMembresiaActiva] = useState(false); // Puedes inicializarlo con el valor inicial de la imagen
  //Guarda el cliente
  const [cliente, setCliente] = useState([]);
  //Fecha Inicio
  const [fechaInicio, setFechaInicio] = useState("");
  //Fecha Fin
  const [fechaFin, setFechaFin] = useState("");
  //Seleccionar asistencia
  const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(false);
  const [time, setTime] = useState(true);
  //Entrenador del cliente
  const [entrenador, setEntrenador] = useState([]);
  //Membresia actual del cliente
  const [membresia, setMembresia] = useState([]);
  //Foto del entrenador
  const [fotoEntrenador, setFotoEntrenador] = useState(logoUser);

  useEffect(() => {
    if (modulo === "cliente") {
      getCliente();
    } else {
      const user = JSON.parse(localStorage.getItem("data"));
      setUsuario(user);
    }
  }, [modulo]);
  useEffect(() => {
    if (membresiaActiva) {
      buscarFechas();
      verificarAsistencia();
    }
  }, [membresiaActiva]);
  useEffect(() => {
    if (usuario !== null) getImagenPerfil();
  }, [usuario]);

  const getCliente = async () => {
    let cedula = JSON.parse(localStorage.getItem("data")).cedula;
    usuarioMembresiaByCedula(cedula)
      .then((res) => res.json())
      .then((data) => {
        setCliente(data);
        setUsuario(data.usuario);
        if (data.usuarioMembresias.length > 0) {
          setMembresiaActiva(true);
        } else {
          setMembresiaActiva(false);
          // localStorage.setItem("token","no valido")
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((final) => {
        setTime(false);
      });
  };
  const buscarFechas = () => {
    let size = cliente.usuarioMembresias.length;
    setFechaInicio(cliente.usuarioMembresias[0]);
    setFechaFin(cliente.usuarioMembresias[size - 1]);
  };

  const verificarAsistencia = () => {
    asitenciaRegistrada()
      .then((res) => res.json())
      .then((data) => {
        setAsistenciaSeleccionada(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getImagenPerfil = async () => {
    try {
      const tieneImagen = usuario.foto ? true : false;
      if (tieneImagen) {
        const response = await downloadImagenPerfil(usuario.id, usuario.foto);

        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob); // Crea una URL para la imagen descargada
          setUrlImagen(imageUrl);
          // console.log(imageUrl);
        } else {
          console.log("error buscando imagen");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (membresiaActiva) {
      obtenerEntrenador();
    }
  }, [membresiaActiva]);
  const obtenerEntrenador = () => {
    //setDownloading(true);
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Filtrar las membresías que cumplen con las condiciones
    const membresiasActivas = cliente?.usuarioMembresias.filter((membresia) => {
      const fechaInicio = new Date(membresia.fechaInicio);
      const fechaFin = new Date(membresia.fechaFin);

      return fechaInicio < fechaActual && fechaFin > fechaActual;
    });
    if (membresiasActivas !== null) {
      setMembresia(membresiasActivas);
      getEntrenador(membresiasActivas[0].entrenadorId)
        .then((res) => res.json())
        .then((data) => {
          setEntrenador(data);
          if (data.foto !== null) {
            downloadImagenPerfil(data.id, data.foto)
              .then((res) => res.blob())
              .then((blob) => {
                const imageUrl = URL.createObjectURL(blob); // Crea una URL para la imagen descargada.
               // console.log(imageUrl);
                setFotoEntrenador(imageUrl);
              })
              .finally((f) => {
               // setDownloading(false);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          //setDownloading(false);
        });
    }
  };
  return (
    <UserContext.Provider
      value={{
        publicidades,
        setPublicidades,
        urlImagen,
        setUrlImagen,
        usuario,
        setUsuario,
        membresiaActiva,
        setMembresiaActiva,
        cliente,
        setCliente,
        fechaInicio,
        setFechaInicio,
        fechaFin,
        setFechaFin,
        asistenciaSeleccionada,
        setAsistenciaSeleccionada,
        setTime,
        time,
        entrenador,
        setEntrenador,
        membresia,
        setMembresia,
        fotoEntrenador,
        setFotoEntrenador
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
