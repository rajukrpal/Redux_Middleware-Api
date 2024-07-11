import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { searchData, showUsers } from "../../features/userDetailSlice";

function NavBar() {
  const dispatch = useDispatch();
  // const userlength = useSelector(state=>state.app.users)
  const { users } = useSelector((state) => state.app); // aese {} ke andar, aap ke andar jo jo state hai us ko bahar nikal skte hai
  const [search, setSearch] = useState(""); // ye hold karwana hai Redux ke Store me Kyu ki muje Dusre component me ye data pass karna ahi

  useEffect(() => {
    dispatch(searchData(search));
  }, [search]); // jitni bar type hoga utni bar useEffect run hoga

  useEffect(() => {
    dispatch(showUsers());
  }, []);

  return (
    <Navbar expand="lg" className="bg-gray-300 fixed-top">
      <Container className="" fluid>
        <Navbar.Brand>
          <NavLink
            to={"/"}
            activeClassName="active"
            className="text-gray-800 no-underline hover:text-blue-500 focus:no-underline"
          >
            CRUD Prectic
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="gap-5">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <NavLink
                to={"/read"}
                activeClassName="active"
                className="text-gray-800 no-underline hover:text-blue-500 focus:no-underline items-center"
              >
                Read Post
              </NavLink>
            </Nav.Link>
            <Nav.Link style={{ pointerEvents: "none", fontWeight: 600 }}>
              All Post ({users.length})
            </Nav.Link>
          </Nav>
          <Form className="d-flex w-80">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
