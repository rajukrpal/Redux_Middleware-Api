import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUsers } from "../../features/userDetailSlice";
import { Link } from "react-router-dom";
import View from "../viewpage/View";
import Form from "react-bootstrap/Form";

const Read = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showUsers()); // jo data hai us ko reload par bhej rahe hai
  }, []);
  const [id, setId] = useState();
  const [redioFiltar , setRedioFilter] = useState("")
  const AllUsersData = useSelector((state) => state.app.users);
  const loading = useSelector((state) => state.app.loading);
  const {searchData} = useSelector(state=>state.app);
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
    <div className=" row">
      {openModel ? (
        <View  id={id} openModel={openModel} setOpenModel={setOpenModel} />
      ) : (
        <div className="container mx-auto row">
          <div className="flex justify-center items-center py-2 bg-blue-200">
           <div className="flex gap-5">
           <Form.Check
              type="radio"
              id="maleRadio"
              name="gender"
              label="All"
              checked={redioFiltar === ""}
              onChange={()=>setRedioFilter("")}
            />
            <Form.Check
              type="radio"
              id="maleRadio"
              name="gender"
              label="Male"
              value="male"
              checked={redioFiltar === "male"}
              onChange={(e)=>setRedioFilter(e.target.value)}
            />
            <Form.Check
              type="radio"
              id="femaleRadio"
              name="gender"
              label="Female"
              value="female"
              checked={redioFiltar === "female"}
              onChange={(e)=>setRedioFilter(e.target.value)}
            />
          </div>
          </div>
          { AllUsersData.filter((user)=>{
            if(searchData.length === 0){
              return true;
            }else {
              return user.name.toLowerCase().includes(searchData.toLowerCase())
            }
            }).filter((gender)=>{
              if(redioFiltar === "male"){
                return gender.gender === redioFiltar
              }else if(redioFiltar === "female"){
                return gender.gender === redioFiltar
              }else{
                return true
              }
            }).map((user) => (
            <Card
              key={user.id}
              className="my-2 mx-auto"
              style={{ width: "25rem" }}
            >
              <Card.Body className="mx-3">
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
