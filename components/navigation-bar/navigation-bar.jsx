import { Navbar, Nav, NavDropdown, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="header" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand className="logo" as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {!user ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown
                  title={`${user.first_name} ${user.last_name}`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="/user/">My Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/user/favorites">
                    My Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLoggedOut}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    favorites: PropTypes.array.isRequired,
  }),
  onLoggedOut: PropTypes.func.isRequired,
};
