import React, { useState } from "react";
import { Button, Card, Dropdown, Table } from 'react-bootstrap';
import useValidator from "../../../plugins/validator";
import notice from "../../../plugins/notice";
import Swal from 'sweetalert2';
import users from "../../../utils/users";
const resete = {
  Title: "",
  Description: "",
  Price: ""
}
function UserSettingWrapper({ usersList, getUserList }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(resete);
  const [validator, showMessage] = useValidator();
  const error = {
    Title: validator.message(('Title'), data.Title, "required|string"),
    Description: validator.message(('Description'), data.Description, "required|string|max:200|min:5"),
    Price: validator.message(('Price'), data.Price, "required|integer"),
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSetData(name, value)
  }
  const handleSetData = (name, value) => {
    setData((prevalue) => {
      return {
        ...prevalue,   // Spread Operator              
        [name]: value
      }
    })
  }
  const handleSubmit = () => {
    if (validator.allValid()) {
      users.update(data.CourseId, data).then((data) => {
        setData(resete)
        setOpen(false)
        getUserList()
        notice.success("User Updated SuccessFully")
      })
    } else {
      showMessage(true)
    }
  }
  const alertConfirm = (CourseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        users.delete(CourseId).then(() => {
          getUserList();
          Swal.fire('Deleted', 'User has been deleted.', 'success')
        });
      } else {
        Swal.fire('Cancelled', 'User is still intact', 'info')
      }
    })
  };
  return (
    <>
      <div className="package-details-wrapper pt-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-5">
              <div className="tour-package-details">
                <Card>
                  <Card.Body>
                    <Card.Title>All User List </Card.Title>
                    <Table responsive striped className="small">
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Avtive</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList.length ? usersList.map((data, index) => <tr key={index} style={{ textAlign: "center" }} >
                          <td>{index + 1}</td>
                          <td>{data.FirstName}</td>
                          <td>{data.LastName}</td>
                          <td>{data.Email}</td>
                          <td>{data.Mobile}</td>
                          <td>{data.Active ? "Active" : "InActive"}</td>
                          {/* <td><Button variant="light" onClick={() => { setOpen(true); setData(data) }}>Edit User</Button></td> */}
                          <td><Button variant="light" onClick={() => { alertConfirm(data.UserId) }}>Restrict/Delete User</Button></td>
                        </tr>) : <h2> No User Found</h2>}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>


              </div>
            </div>
            <div className="col-lg-4">
              <div className="package-sidebar">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettingWrapper;
