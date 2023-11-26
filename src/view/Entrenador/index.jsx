// reactstrap components
import React, { useState } from "react";
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
} from "reactstrap";
// core components

import Header from "../../components/Headers/Header";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { listaProblemas } from "../../api/Usuario/Problemas";
import {  useEffect } from "react";
const Index = () => {
  //Columnas de la Datatable

  const [problemas, setProblemas] = useState([]);

  const listado = async () => {
    try {
      const response = await listaProblemas();
      const data = await response.json();
      console.log(data)
      setProblemas(data.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    listado()
  },[])

  const columns = [
    { name: "Id" ,selector: (row) => row.id, sortable: true, maxWidth: "35px"},
    { name: "Nombre" ,selector: (row) => row.nombre, sortable: true,  wrap: true,},
    { name: "Descripción",selector: (row) => row.descripcion, sortable: true ,  wrap: true,},
    { name: "Docente",selector: (row) => row.docente, sortable: true ,  wrap: true,},
    { name: "Nombre BD",selector: (row) => row.nombrebase, sortable: true ,  wrap: true,},
  ];
  const filteredProblemas = [];

  return (
    <>
      <Header />
      {/* Page content */}

      <Container className="mt--7" fluid>
        {/* Contenido Cards Problemas Practiva Completadas Otros*/}
        <Row>
          <Col lg="6" xl="3">
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
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Link>

                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0"
                    >
                      PROBLEMAS
                    </CardTitle>
                    <p className="h2 font-weight-bold mb-0 text-center">8</p>
                  </div>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-red mr-2">
                    <i className="fa fa-arrow-up" /> Información
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0" color="dark" outline>
              <CardBody>
                <Row>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-chart-pie" />
                    </div>
                  </Col>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0"
                    >
                      PRACTICAS
                    </CardTitle>
                    <p className="h2 font-weight-bold mb-0 text-center">20</p>
                  </div>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-warning mr-2">
                    <i className="fa fa-arrow-up" /> Información
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0" color="dark" outline>
              <CardBody>
                <Row>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i className="fas fa-check" />
                    </div>
                  </Col>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0"
                    >
                      COMPLETADOS
                    </CardTitle>
                    <p className="h2 font-weight-bold mb-0 text-center">49</p>
                  </div>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-info mr-2">
                    <i className="fas fa-arrow-up" /> Información
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0" color="dark" outline>
              <CardBody>
                <Row>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-users" />
                    </div>
                  </Col>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-dark mb-0"
                    >
                      OTROS
                    </CardTitle>
                    <p className="h2 font-weight-bold mb-0 text-center">9</p>
                  </div>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-yellow mr-2">
                    <i className="fas fa-arrow-up" /> Información
                  </span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        {/* Tabla*/}
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Lista de Problemas</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
              <DataTable
                columns={columns}
                data={problemas}
                striped
                pointerOnHover
                responsive
                sortActive
                sortDirection
                highlightOnHover
                search // Activa la búsqueda
                noDataComponent="No se encontraron registros para mostrar."
                pagination // Activa la paginación
                paginationComponentOptions={{
                  rowsPerPageText: "Filas por página:",
                  rangeSeparatorText: "de",
                  selectAllRowsItem: true,
                  selectAllRowsItemText: "Todos",
                  selectAllRowsItemShow: true,
                }}
              />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
