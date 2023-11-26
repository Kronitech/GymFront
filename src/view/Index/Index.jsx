// reactstrap components
import React, { useState } from "react";
// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Container,
  List,
  Modal,
  CardFooter,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../../api/LoginApi";
import Carrusel from "../../components/Carousel/Carrusel";
import ChartComponent from "../../components/Carousel/Charts";

const Index = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [contraseñaIncorrecta, setContraseñaIncorrecta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handelSubmit = (e) => {
    setContraseñaIncorrecta(false);
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").toUpperCase();
    const password = formData.get("password");

    const usuario = {
      usuario: email,
      clave: password,
    };
    //Realizo peticion para iniciar sesion
    iniciarSesion(usuario)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("data", JSON.stringify(data));
          navigate("/usuario/index");
        } else {
          setContraseñaIncorrecta(true);
          setMensaje(data.data.mensaje);
          eliminarToken();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const eliminarToken = () => {
    // Tiempo de expiración del token en milisegundos (1800000 ms = 30 minutos)
    const tiempoExpiracionToken = 1800000;
    setTimeout(() => {
      alert("se acabo su tiempo");
      localStorage.clear();
    }, tiempoExpiracionToken);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md="6" className="mt-3">
            <Carrusel />
          </Col>
          <Col md="6" className="mt-3">
            <Card
              className="card-stats mb-4 mb-xl-0 border "
              color="dark"
              outline
            >
              <CardBody>
                <Row>
                  <Link
                    className="text-dark curso-link"
                    to={"/usuario/problemas"}
                  >
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                        <i className="fa fa-clock" />
                      </div>
                    </Col>
                  </Link>

                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0 mt-3"
                    >
                      Horario
                    </CardTitle>
                  </div>
                </Row>
                <Row className="text-center text-blue d-block">
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Lunes a Sabado <i className="fa fa-long-arrow-right" /> 5
                      AM - 10 PM
                    </span>
                  </p>

                  {/* <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Sabado <i className="fa fa-long-arrow-right" /> 7 AM - 8
                      PM
                    </span>
                  </p> */}
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Domingo/Festivos <i className="fa fa-long-arrow-right" />{" "}
                      8 AM - 8 PM
                    </span>
                  </p>
                </Row>
                <Link onClick={toggle}>
                  <p className="mt-3 mb-0 text-muted text-sm text-center">
                    <span className="text-blue mr-2 ">
                      <i className="fa fa-users" /> Información de asistencia
                    </span>
                  </p>
                </Link>
              </CardBody>
            </Card>
            <br />
            <Card className="card-stats mb-4 mb-xl-0" color="dark" outline>
              <CardBody>
                <Row>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                      <i className="fa fa-map" />
                    </div>
                  </Col>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0 mt-3"
                    >
                      UBICACION
                    </CardTitle>
                  </div>
                </Row>
                <Row className="text-center text-blue d-block">
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Av. Libertadores con Canal Bogotá. Parqueadero CC. Cúcuta
                      - Cúcuta, NSA - 0000
                    </span>
                  </p>
                </Row>
                <Link>
                  <p className="mt-3 mb-0 text-muted text-sm text-center">
                    <span className="text-blue mr-2">
                      <i className="fa fa-location-arrow" /> Ver Mapa
                    </span>
                  </p>
                </Link>
              </CardBody>
            </Card>
            <div className="text-center mt-3">
              <Button
                color="primary"
                type="button"
                outline
                className=" w-100"
              >
                Mas información
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      {/*Modal Ver Asistencia*/}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modal}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Informacion de asistencia</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-3 py-lg-2">
              <ChartComponent />
            </CardBody>
            <CardFooter>
              <div className="text-center">
                <Button
                  className="my-0 text-white"
                  type="button"
                  color="default"
                  onClick={toggle}
                >
                  Cerrar
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default Index;
