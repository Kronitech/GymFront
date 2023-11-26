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
} from "reactstrap";
// core components
import Header from "../../../components/Headers/Header";
import DataTable from "react-data-table-component";
import { listaProblemas } from "../../../api/Usuario/Problemas";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  customTheme,
  customStyles,
} from "../../../components/Datatable/DatatableCustom";
const Rutinas = () => {
 
  const [problemas, setProblemas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const listado = async () => {
    try {
      const response = await listaProblemas();
      const data = await response.json();
      console.log(data.data);
      setProblemas(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   // listado();
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true, maxWidth: "35px" },
    {
      name: "Nombre",
      cell: (row) => row.nombre,
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: "Descripción",
      cell: (row) => row.descripcion,
      selector: (row) => row.descripcion,
      sortable: true,
      wrap: true,
    },
    {
      name: "Docente",
      cell: (row) => row.docente,
      selector: (row) => row.docente,
      sortable: true,
      wrap: true,
    },
    {
      name: "Nombre BD",
      cell: (row) => row.nombrebase,
      selector: (row) => row.nombrebase,
      sortable: true,
      wrap: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className=" d-flex justify-content-end">
          <h3>
            <Link className="text-primary"
            title="Informacion">
              {" "}
              <i className="fa fa-info-circle" />
            </Link>
          </h3>
          <h3 className="ml-4">
            <Link className="text-success"
            title="Resolver">
              <i className="fa fa-arrow-right" />
            </Link>
          </h3>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

const filtroProblemas=problemas.filter((problema)=>
problema.nombre.toLowerCase().includes(filtro.toLowerCase()))

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Contenido */}

        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">LISTA DE RUTINAS</h3>
                  </div>
                  <div className="col text-right">
                  <FormGroup row className="justify-content-end mr-2">
                  <Label for="filtro" sm={3} className="text-center">
                    Filtrar :
                  </Label>
                  <Col sm={9}>
                    
                    <Input
                      type="text"
                      className=""
                      placeholder="Buscar por Nombre..."
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button> */}
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <>
                
                <DataTable
                  theme={customTheme}
                  customStyles={customStyles}
                  columns={columns}
                  data={filtroProblemas}
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
                </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Rutinas;
