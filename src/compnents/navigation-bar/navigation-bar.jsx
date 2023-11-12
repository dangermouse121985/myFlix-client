import { Navbar, Nav, NavDropdown, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, setToken } from '../../redux/reducers/user';

export const NavigationBar = (/* { user, onLoggedOut } */) => {
  const user = useSelector((state) => state.user.userProfile);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
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
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <NavDropdown
                  title={`${user.first_name} ${user.last_name}`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item as={Link} to="/user/">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user/favorites">
                    My Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(setUserProfile(null));
                      dispatch(setToken(null));
                      localStorage.setItem('isAuthenticated', false);
                    }} /* {onLoggedOut} */
                  >
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

/* NavigationBar.propTypes = {
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
}; */
