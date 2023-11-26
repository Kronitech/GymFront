
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
  Row,
   UncontrolledCollapse,
  
  NavItem,
  NavLink,
  Nav,
  Col,

} from "reactstrap";
import logo from "../../assets/img/brand/logo.svg";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark " expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={logo}
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={logo}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <i className="fa fa-home" />
                  <span className="nav-link-inner--text">Inicio</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" tag={Link}
                to="/auth/login?modulo=admin">
                  <i className="fa fa-building" />
                  <span className="nav-link-inner--text">Corporativo</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/login?modulo=cliente"
                  tag={Link}
                  
                >
                  <i className="fa fa-user" />
                  <span className="nav-link-inner--text">Iniciar Sesion</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
