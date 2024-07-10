import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUsers } from "../../features/userDetailSlice";
import { Link } from "react-router-dom";
import View from "../viewpage/View";

const Read = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showUsers()); // jo data hai us ko reload par bhej rahe hai
  }, []);
  const AllUsersData = useSelector((state) => state.app.users);
  const loading = useSelector((state) => state.app.loading);
  const [id, setId] = useState();
  const [openModel, setOpenModel] = useState(false);
  if (loading === true) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <center className="">
          <h2>Loading...</h2>
        </center>
      </div>
    );
  }
  return (
    <div className="container mx-auto row">
      {openModel ? (
        <View  id={id} openModel={openModel} setOpenModel={setOpenModel} />
      ) : (
        <div className="container mx-auto row">
          {AllUsersData.map((user) => (
            <Card
              key={user.id}
              className="mx-auto my-2"
              style={{ width: "30rem" }}
            >
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {user.email}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  {user.age}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  {user.gender}
                </Card.Subtitle>
                <Card.Link>
                  <Link onClick={() => [setId(user.id), setOpenModel(true)]}>
                    View
                  </Link>{" "}
                  {/* yha par muje 1 click par do value leni hai es ke liye  */}
                </Card.Link>
                <Card.Link>
                  <Link to={`/edit/${user.id}`}>Edit</Link>
                </Card.Link>
                <Card.Link>
                  <Link onClick={()=>dispatch(deleteUser(user.id))}>Delete</Link>
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Read;
