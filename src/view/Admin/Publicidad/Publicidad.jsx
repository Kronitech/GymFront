// reactstrap components
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody,
  Media,
  Button,
  Table,
  FormGroup,
  Label,
  Input,
  Modal,
  CardFooter,
  Form,
  CardImg,
} from "reactstrap";
// core components
import Header from "../../../components/Headers/Header";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  customTheme,
  customStyles,
} from "../../../components/Datatable/DatatableCustom";
import "../../../assets/css/spinner.css";
import Swal from "sweetalert2";
import SpinnerGrupo from "../../../components/Sppiner";
import {
  downloadImagenPublicidad,
  saveImagenPublicidad,
  listaImagenPublicidad,
  deleteImagenPublicidad,
} from "../../../api/Publicidad/Publicidad";
import { useUserContext } from "../../../components/Context/UserContext";

const Publicidad = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  //Activar spinner
  const [downloading, setDownloading] = useState(false);
  //Modal registrar recepcionista
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  //Modal editar recepcionista
  const [modalUpdate, setModalUpdate] = useState(false);
  const toggleUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  // useEffect(() => {
  //   listaPublicidades();
  // }, []);
  //const [publicidades, setPublicidades] = useState([]);
  const {
    publicidades,
    setPublicidades
  }=useUserContext()
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //    //Abrir modal y cargar entrenador
  //    const handleOpciones = (entrenador) => {
  //     toggleUpdate();
  //   };
  //   //Actualizar campos del modal
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     setRecepcionista((prevRecepcionista) => ({ ...prevRecepcionista, [name]: value }));
  //   };

  //   const filtroProblemas = recepcionistas.filter((recepcionista) =>
  //     recepcionista.usuario.cedula.toLowerCase().includes(filtro.toLowerCase())
  //   );
  const [imagen, setImagen] = useState(null);
  const [archivo, setArchivo] = useState(null);

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];

    // Validar que se seleccionó un archivo y que es una imagen
    if (archivo && archivo.type.startsWith("image/")) {
      setArchivo(archivo);
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagen(e.target.result);
      };

      reader.readAsDataURL(archivo);
    } else {
      // Limpiar la imagen si no se selecciona un archivo de imagen
      setImagen(null);
    }
  };

  const registrarPublicidad = async (e) => {
    setDownloading(true);
    e.preventDefault();
    console.log(archivo);
    const formDataFile = new FormData();
    formDataFile.append("file", archivo); // Usar 'file' en lugar de e.target.result

    try {
      const response = await saveImagenPublicidad(formDataFile);
      if (response.ok) {
        const data = await response.json();
        listaPublicidades();

        toggle();
        setDownloading(false);
        Swal.fire({
          icon: "success",
          title: "¡Completado!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log(response);
        setDownloading(false);
      }
    } catch (err) {
      setDownloading(false);
      console.error("Error:", err);
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
  const deletePublicidad = (key) => {
    Swal.fire({
      title: "Eliminar imagen?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setDownloading(true);
        console.log("testtt");
        deleteImagenPublicidad(key)
          .then((res) => res.json())
          .then((data) => {
            if (data === true) {
              Swal.fire({
                title: "Completado!",
                text: "La imagen ha sido eliminada .",
                icon: "success",
              });
              listaPublicidades();
              setDownloading(false);
            } else {
              setDownloading(false);
              console.log("errr");
            }
          })
          .catch((error) => {
            setDownloading(false);
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Contenido */}
        {downloading && (
          <div className="overlay">
            <div className="spinner " aria-hidden="true"></div>
          </div>
        )}
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">PUBLICIDAD INICIO</h3>
                  </div>
                  <div className="col text-right">
                    <Link title="Registrar">
                      <Button color="primary" type="submit" onClick={toggle}>
                        <i className="fa fa-plus" />
                      </Button>
                    </Link>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <SpinnerGrupo />
                ) : (
                  <>
                    {publicidades.length > 0 && (
                      <Row>
                        {publicidades.map((publicidad) => (
                          <Col
                            className="mt-3 position-relative"
                            sm="12"
                            key={publicidad.id}
                          >
                            <div className="d-flex justify-content-end ">
                              <Button
                                className="position-absolute top-0 end-0 m-2" // Clases de Bootstrap para posicionamiento absoluto en la esquina superior derecha con un pequeño margen
                                color="danger"
                                size="sm"
                                onClick={() =>
                                  deletePublicidad(publicidad.foto)
                                }
                                title="Actualizar foto de perfil"
                              >
                                <i className="fa fa-trash"></i>
                              </Button>
                            </div>
                            <CardImg
                              alt="Imagen publicidad "
                              src={publicidad.url}
                              style={{
                                height: 270,
                              }}
                              width="100%"
                            />
                          </Col>
                        ))}
                      </Row>
                    )}
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal registrar recepcionista */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modal}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0 d-flex justify-content-between">
              <div
                className="text-muted text-center mt-2 mb-3"
                style={{ flex: 1, textAlign: "center" }}
              >
                <h2 className="text-uppercase">Registrar Publicidad</h2>
              </div>
              <button
                className="btn btn-close text-dark"
                style={{
                  backgroundColor: "transparent", // Color de fondo del botón transparente
                  border: "none",
                }}
                onClick={toggle}
              >
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </button>
            </CardHeader>
            <Form onSubmit={registrarPublicidad}>
              <CardBody className="px-lg-3 py-lg-2">
                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <label className="form-control-label" htmlFor="cedula">
                        Tamaño recomendado de la imagen ( 900 x 270 )
                      </label>
                      <Input
                        className="form-control-alternative text-dark fw-bold"
                        id="imagen"
                        name="imagen"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12">
                    {imagen && (
                      <div>
                        <label className="form-control-label">
                          Vista previa de la imagen:
                        </label>
                        <img
                          src={imagen}
                          alt="Vista previa de la imagen"
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="d-flex justify-content-between">
                <Button className="btn-white" color="default" onClick={toggle}>
                  Cerrar
                </Button>
                <Button className="text-white" color="default" type="submit">
                  Guardar
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </div>
      </Modal>
      {/* Modal actulizar recepcionista */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modalUpdate}
        toggle={toggleUpdate}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0 d-flex justify-content-between">
              <div
                className="text-muted text-center mt-2 mb-3"
                style={{ flex: 1, textAlign: "center" }}
              >
                <h2 className="text-uppercase">Actualizar Entrenador</h2>
              </div>
              <button
                className="btn btn-close text-dark"
                style={{
                  backgroundColor: "transparent", // Color de fondo del botón transparente
                  border: "none",
                }}
                onClick={toggleUpdate}
              >
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </button>
            </CardHeader>
            <Form
            //onSubmit={actualizarRecepcionista}
            >
              <CardBody className="px-lg-3 py-lg-2"></CardBody>
              <CardFooter className="d-flex justify-content-between">
                <Button
                  className="btn-white"
                  color="default"
                  onClick={toggleUpdate}
                >
                  Cerrar
                </Button>
                <Button className="text-white" color="default" type="submit">
                  Guardar
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default Publicidad;
