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
import { listaUsuarioRol } from "../../../api/Usuarios/Usuario";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  customTheme,
  customStyles,
} from "../../../components/Datatable/DatatableCustom";
const Index = () => {
 
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const listado = async () => {
    try {
      const response = await listaUsuarioRol(2);
      const data = await response.json();
      console.log(data);
      setClientes(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listado();
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.usuario.id, sortable: true, maxWidth: "35px" },
    {
      name: "Nombre",
      selector: (row) => row.usuario.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: "Cedula",
      cell: (row) => row.usuario.cedula,
      selector: (row) => row.usuario.cedula,
      sortable: true,
      wrap: true,
    },
    {
      name: "Telefono",
      cell: (row) => row.usuario.telefono,
      selector: (row) => row.usuario.telefono,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      cell: (row) => row.usuario.email,
      selector: (row) => row.usuario.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Fecha nacimiento",
      cell: (row) => row.usuario.fechaNacimiento,
      selector: (row) => row.usuario.fechaNacimiento,
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

const filtroClientes=clientes.filter((cliente)=>
cliente.usuario.nombre.toLowerCase().includes(filtro.toLowerCase()))

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
                    <h3 className="mb-0">LISTA DE CLIENTES</h3>
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
                  data={filtroClientes}
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

export default Index;
