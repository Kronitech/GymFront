import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/Header";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserContext } from "../../components/Context/UserContext";
import "animate.css";
import "../../assets/css/spinner.css";
import { downloadImagenPerfil } from "../../api/Perfil/Perfil";
import { getEntrenador } from "../../api/Entrenador/Entrenador";
import logoUser from "../../assets/img/user.png";
const Perfil = () => {
  const [estudianteObtenido, setEstudianteObtenido] = useState(false);
  
  const {
    urlImagen,
    setUrlImagen,
    usuario,
    setUsuario,
    membresiaActiva,
    cliente,
    fechaInicio,
    fechaFin,
    entrenador,
    membresia,
    fotoEntrenador
  } = useUserContext();
  const [modal, setModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const toggle = () => setModal(!modal);

 

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7 " fluid>
        {downloading && (
          <div className="overlay">
            <div className="spinner " aria-hidden="true"></div>
          </div>
        )}
        <Row>
          {membresia && entrenador !== null ? (
            <>
           
              <Col className="order-xl-1 mt-1" xl="12">
                <Card className="bg-white shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">ENTRENADOR </h3>
                      </Col>
                    </Row>
                  </CardHeader>

                  <CardBody>
                    <Row>
                      <Col
                        className="text-center justify-content-center"
                        lg="3"
                        style={{
                          width: "150px", // Ajusta el tamaño de acuerdo a tus preferencias
                          height: "150px", // Ajusta el tamaño de acuerdo a tus preferencias
                        }}
                      >
                        <div className="card-profile-image">
                          <a onClick={toggle}>
                            <img
                              alt="..."
                              className="rounded-circle  mt-5"
                              src={fotoEntrenador}
                              style={{
                                width: "150px", // Ajusta el tamaño de acuerdo a tus preferencias
                                height: "150px", // Ajusta el tamaño de acuerdo a tus preferencias
                                objectFit: "cover", // Escala la imagen para ajustarse manteniendo la proporción
                                borderRadius: "50%", // Hace que la imagen sea redonda
                              }}
                            />
                          </a>
                        </div>
                      </Col>
                      <Col lg="9">
                        <Form>
                          <h6 className="heading-small text-primary h3 fw-bold mb-4">
                            Desde: {membresia[0]?.fechaInicio.slice(0, 10)} -
                            Hasta: {membresia[0]?.fechaFin.slice(0, 10)}
                          </h6>
                          <div className="pl-lg-4">
                            <Row>
                              <Col lg="8">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Nombre
                                  </label>
                                  <Input
                                    className="form-control-alternative text-center text-dark"
                                    defaultValue={entrenador.nombre}
                                    id="nombres"
                                    placeholder="Nombres y Apellidos"
                                    type="text"
                                    disabled
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                  >
                                    Telefono
                                  </label>
                                  <Input
                                    className="form-control-alternative text-center text-dark"
                                    value={entrenador.telefono}
                                    id="telefono"
                                    placeholder="telefono"
                                    type="text"
                                    disabled
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="12">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-email"
                                  >
                                    Correo Electronico
                                  </label>
                                  <Input
                                    className="form-control-alternative text-center text-dark"
                                    id="email"
                                    value={entrenador.email}
                                    type="email"
                                    placeholder="Correo Electronico"
                                    disabled
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                          {/* <hr className="my-4" /> */}
                        </Form>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <hr />
              </Col>
            
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Foto del Entrenador</ModalHeader>
        <ModalBody>
          <img
            alt="Imagen de perfil"
            src={fotoEntrenador}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              margin: "auto",
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Perfil;
