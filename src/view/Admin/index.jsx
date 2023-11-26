import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Container,
  Modal,
  CardFooter,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Progress,
  Input,
  FormGroup,
  Label,
  Form,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import Carrusel from "../../components/Carousel/Carrusel";
import ChartComponent from "../../components/Carousel/Charts";
import Header from "../../components/Headers/Header";
import { useUserContext } from "../../components/Context/UserContext";
import {
  asitenciaRegistrada,
  datosAsitencias,
  saveAsitencia,
} from "../../api/Asistencias/Asistencia";
import "../../assets/css/spinner.css";

const Index = () => {
  //Obtener datos de la grafica de asistencia
  useEffect(() => {
    obtenerDatos();
  }, []);
  const [datos, setDatos] = useState([]);
  //Cargando datos
  const [sleep, setSleep] = useState(true);
  const obtenerDatos = () => {
    //setDownloading(true)
    datosAsitencias()
      .then((res) => res.json())
      .then((data) => {
        setDownloading(false);
        setDatos(data);
        setSleep(false);
      })
      .catch((error) => {
        setDownloading(false);

        console.log(error);
      });
  };
  const [downloading, setDownloading] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  // Estado para almacenar la hora seleccionada
  //const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(false);
  const modulo = localStorage.getItem("modulo");
  const {
    membresiaActiva,
    setMembresiaActiva,
    cliente,
    setCliente,
    fechaInicio,
    fechaFin,
    asistenciaSeleccionada,
    setAsistenciaSeleccionada,
    time,
  } = useUserContext();

  useEffect(() => {
    verificarAsistencia();
    if (membresiaActiva && !asistenciaSeleccionada) {
      toggleRegistrar();
    }
  }, [membresiaActiva, asistenciaSeleccionada]);

  const [modalRegistrar, setModalRegistrar] = useState(false);
  const toggleRegistrar = () => {
    setModalRegistrar(!modalRegistrar);
  };

  // Definir el horario de inicio y fin
  const horaInicio = 5;
  const horaFin = 21;

  // Crear un array para almacenar las filas de la tabla
  const filas = [];

  for (let hora = horaInicio; hora < horaFin; hora++) {
    let hora1 = hora;
    let hora2 = hora;
    let horarioA = "AM";
    let horarioB = "AM";
    if (hora >= 12) {
      horarioA = "PM";
      horarioB = "PM";
    }
    if (hora >= 12) {
      hora2 = hora - 12;
    }
    if (hora > 12) {
      hora1 = hora - 12;
    }

    const horaStr = `${hora1}:00 ${horarioA}- ${hora2 + 1}:00 ${horarioB}`;

    filas.push(
      <tr key={horaStr}>
        <td>
          <FormGroup check inline key={horaStr}>
            <Input
              type="checkbox"
              //checked={horaSeleccionada === horaStr}
              onChange={() => handleHoraSeleccionada(hora)}
              value={horaStr}
              name={`horario`}
              id={horaStr}
            />
            <Label check>{horaStr}</Label>
          </FormGroup>
        </td>
      </tr>
    );
  }

  // Función para manejar la selección de una hora
  const handleHoraSeleccionada = (hora) => {
    toggleRegistrar();
    if (!asistenciaSeleccionada) {
      let id = JSON.parse(localStorage.getItem("data")).id;
      const asistencia = {
        usuarioId: id,
        hora,
      };
      saveAsitencia(asistencia)
        .then((res) => res.json())
        .then((data) => {
          setAsistenciaSeleccionada(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const calcularDiferenciaEnDias = (fecha2) => {
    // Parsea las fechas en objetos Date
    const fechaInicio = new Date();
    const fechaFin = new Date(fecha2);

    // Calcula la diferencia en milisegundos
    const diferenciaEnMilisegundos = fechaFin - fechaInicio;

    // Convierte la diferencia en días
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

    return Math.abs(Math.round(diferenciaEnDias)); // Usamos Math.abs para asegurarnos de que la diferencia sea positiva
  };

  useEffect(() => {
    if(cliente!==null){
      mostrarAlerta();
    }
    
  }, [cliente]);
  const mostrarAlerta = () => {
    
    let dias = calcularDiferenciaEnDias(fechaFin?.fechaFin);
    if (Number(dias) <= 7) {
      toggle();
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {downloading && (
          <div className="overlay">
            <div className="spinner " aria-hidden="true"></div>
          </div>
        )}
        {time ? null : (
          <>
            {modulo !== null && modulo === "cliente" && (
              <Card className="my-2 text-justify ">
                <CardBody>
                  <Row>
                    <div className="col">
                      {membresiaActiva ? (
                        <>
                          <p className="h2 ">
                            Membresia Activa{" "}
                            <i
                              className="fa fa-check-circle fa-1x"
                              aria-hidden="true"
                            ></i>{" "}
                            {calcularDiferenciaEnDias(fechaFin?.fechaFin)} Dias
                          </p>
                          <p className="text-dark fw-bold">
                            Fecha Inicio:{" "}
                            {fechaInicio?.fechaInicio?.split("T")[0]} Fecha Fin:{" "}
                            {fechaFin.fechaFin?.split("T")[0]}{" "}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-danger h2">
                            Membresia terminada{" "}
                            <i
                              className="fa fa-ban fa-1x"
                              aria-hidden="true"
                            ></i>{" "}
                          </p>
                          <p>
                            Estimado {cliente?.usuario?.nombre} , para renovar
                            su membresia dirijase con la recepcionista{" "}
                          </p>
                        </>
                      )}
                    </div>
                    {!asistenciaSeleccionada && membresiaActiva && (
                      <div className="col text-right ">
                        <Button
                          className="my-0 text-white"
                          type="button"
                          color="default"
                          onClick={toggleRegistrar}
                        >
                          Asistencia
                        </Button>
                      </div>
                    )}
                  </Row>
                </CardBody>
              </Card>
            )}
          </>
        )}

        <Row>
          <Col md="6" className="mt-3">
            <Carrusel />
          </Col>
          <Col md="6" className="mt-3">
            {/* <Card
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
                      Lunes a Viernes <i className="fa fa-long-arrow-right" />{" "}
                      5:00 AM - 9:00 PM
                    </span>
                  </p>

                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Sabados y Festivos{" "}
                      <i className="fa fa-long-arrow-right" /> 7:00 AM - 12:00
                      PM
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
            </Card> */}
            <Card className="card-stats mb-4 mb-xl-0" color="dark" outline>
              <CardBody>
                <Row>
                  <Col className="col-auto">
                    {sleep ? (
                      <Spinner> </Spinner>
                    ) : (
                      <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                        <i className="fa fa-users" />
                      </div>
                    )}
                  </Col>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0 mt-3"
                    >
                      GRAFICO DE ASISTENCIA DIARIA
                    </CardTitle>
                  </div>
                </Row>
                <Row className="text-center text-blue d-block">
                  <ChartComponent info={datos} />
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-dark mr-2">
                      Av. Libertadores con Canal Bogotá. Parqueadero CC. Cúcuta
                      - Cúcuta, NSA - 0000
                    </span>
                  </p>
                </Row>
                <Link
                  to="https://www.google.com/maps/place/Bogot%C3%A1/@4.6482975,-74.107807,11z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9bfd2da6cb29:0x239d635520a33914!8m2!3d4.7109886!4d-74.072092!16zL20vMDFkenlj?entry=ttu"
                  target="_blanc"
                >
                  <p className="mt-3 mb-0 text-muted text-sm text-center">
                    <span className="text-blue mr-2">
                      <i className="fa fa-location-arrow" /> Ver Mapa
                    </span>
                  </p>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal registrar asistencia */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modalRegistrar}
        toggle={toggleRegistrar}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-3 py-lg-2">
              <Card className="shadow">
                <div className="text-muted text-center mt-2 mb-3">
                  <h2 className="text-uppercase">
                    Registrar asistencia diaria
                  </h2>
                </div>
                <Form>
                  <Row>
                    <Col sm="6">
                      <Table
                        className="align-items-center table-flush text-center text-dark fw-bold"
                        responsive
                      >
                        <thead className="thead-light ">
                          <tr>
                            <th scope="col">Horario A</th>
                          </tr>
                        </thead>
                        <tbody>{filas.slice(0, filas.length / 2)}</tbody>
                      </Table>
                    </Col>
                    <Col sm="6">
                      <Table
                        className="align-items-center table-flush text-center text-dark fw-bold"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Horario B</th>
                          </tr>
                        </thead>
                        <tbody>{filas.slice(filas.length / 2)}</tbody>
                      </Table>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </CardBody>
          </Card>
        </div>
      </Modal>
      {/*Modal Ver Alerta*/}
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        size="lg"
        isOpen={modal}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Card className="bg-danger shadow border-0 text-white">
            <CardHeader className="bg-transparent pb-0 d-flex justify-content-between">
              <div
                className="text-muted text-center mt-2 mb-3"
                style={{ flex: 1, textAlign: "center" }}
              >
             
              </div>
              <button
                className="btn btn-close text-white"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={toggle}
              >
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </button>
            </CardHeader>

            <CardBody className="px-lg-3 py-lg-2 ">
              <div className="py-3 text-center">
              <i className="fa fa-bell fa-3x" aria-hidden="true" /> 
                <h1 className="heading mt-4 text-white h1">
                  ¡Tu membresía está por expirar!
                </h1>
                <p>
                Quedan solo <small className="fw-bold h3 text-white"> ' {calcularDiferenciaEnDias(fechaFin?.fechaFin)} '</small> días para que tu membresía expire. Asegúrate de
                  renovarla para seguir disfrutando de nuestros servicios.
                </p>
              </div>
            </CardBody>
            <CardFooter className="bg-danger">
              <div className="text-center">
                {/* <Button
                  className="my-0 text-white"
                  type="button"
                  color="default"
                  onClick={toggle}
                >
                  Entendido
                </Button> */}
              </div>
            </CardFooter>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default Index;
