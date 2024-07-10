
// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";


// const Edit = () => {
//     const {id} = useParams(); //  es se ham jab link se hit karne par /edir${id} dikya tha wo id ab yha par resive ho jaye gi , --useParams-- ki help se
//     const Allusers = useSelector(state=>state.app.users);
//     const loading = useSelector(state=>state.app.loading);
   
//     const [editUser,setEditUser] = useState()


//     useEffect(()=>{
//         if(id){
//             const SingalUser = Allusers.filter((user)=> user.id === id)[0];
//             setEditUser(SingalUser);
           
//         }
//     },[])

//   return (
//     <div>
//       <div className="container mx-auto py-2">
//       <center className="py-2">
//       <h3>Edit User Detail Form</h3>
//       </center>
//       <Form >
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" placeholder="Enter your name" value={editUser.name}  name="name" />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control  type="email" placeholder="Enter your email" value={editUser.email}  name="email" />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Age</Form.Label>
//           <Form.Control  type="number" value={editUser.age} placeholder="Enter your Age"  name="age" />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Gender</Form.Label>
//           <div>
//             <Form.Check
//               type="radio"
//               id="maleRadio"
//               name="gender"
//               label="Male"
//               value="male"
//             //   checked={editUser.gender === "male"}
//             //   onChange={handleChange}
             
//             />
//             <Form.Check
//               type="radio"
//               id="femaleRadio"
//               name="gender"
//               label="Female"
//               value="female"
//             //   checked={editUser.gender === "female"}
            
//             />
//           </div>
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </div>
//     </div>
//   )
// }

// export default Edit






import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../../features/userDetailSlice";

const Edit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
  const { id } = useParams(); // Get the id parameter from the URL
  const Allusers = useSelector(state => state.app.users);
  const loading = useSelector(state => state.app.loading);

  const [updateUser, setUpdateUser] = useState([]);

  useEffect(() => {
    if (id && Allusers.length > 0) {
      const userToEdit = Allusers.find(user => user.id === id);
      if (userToEdit) {
        setUpdateUser(userToEdit);
      } else {
        console.log(`User with id ${id} not found.`);
      }
    }
  }, [id, Allusers]);

const handleChange =(e)=>{
    setUpdateUser({...updateUser , [e.target.name] : e.target.value})
}

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(updateUser))
    // console.log(updateUser)
    navigate("/read")
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-2">
      <center className="py-2">
        <h3>Edit User Detail Form</h3>
      </center>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={updateUser.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={updateUser.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={updateUser.age}
            name="age"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="maleRadio"
              name="gender"
              label="Male"
              value="male"
              checked={updateUser.gender === "male"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="femaleRadio"
              name="gender"
              label="Female"
              value="female"
              checked={updateUser.gender === "female"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Edit;
