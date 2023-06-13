import React, { useState } from "react";
import { Button, Card, Dropdown, Table } from 'react-bootstrap';
import useValidator from "../../../plugins/validator";
import notice from "../../../plugins/notice";
import Swal from 'sweetalert2';
import users from "../../../utils/users";
import payment from "../../../utils/payment";
const resete = {
  Discounut: "",
  Users: ""
}
function UserSettingWrapper({ usersList, getUserList }) {
  const [data, setData] = useState(resete);
  const [selectedUser, setSelectedUser] = useState()
  const [validator, showMessage] = useValidator();
  const error = {
    Discounut: validator.message(('Discount'), data.Discounut, "required|integer"),
    Users: validator.message(('Users'), data.Users, "required")
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSetData(name, value)
  }
  const handleUser = (e) => {
    setSelectedUser(e)
    handleSetData("Users", JSON.stringify([e.UserId]))
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
      payment.applyDiscount( data).then((data) => {
        setData(resete);
        setSelectedUser()
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
                {!selectedUser ? <Card>
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
                          <th>Active Discount</th>
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
                          <td>{data.Discounut}</td>
                          {/* <td><Button variant="light" onClick={() => { setOpen(true); setData(data) }}>Edit User</Button></td> */}
                          <td className="d-flex justify-content-around">
                            <Button variant="light" onClick={() => { alertConfirm(data.UserId) }}>Delete User</Button>
                            <Button variant="light" onClick={() => { handleUser(data) }}>Manage Discount</Button>
                          </td>
                        </tr>) : <h2> No User Found</h2>}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                :<form
                  onSubmit={(e) => e.preventDefault()}
                  id="comment_form"
                  method="post"
                >
                  <div className="comment-form d-flex justify-content-center">
                    <div className="col-lg-6">
                      <h4 className="d-flex justify-content-center">Discount for {selectedUser?.FirstName + " " + selectedUser?.LastName}</h4>
                      <div className="row">
                        <div className="custom-input-group">
                          <input
                            type="text"
                            placeholder="Add Discount Amount"
                            id="Discounut"
                            name="Discounut"
                            style={{textAlign:"center"}}
                            value={data.Discounut}
                            onChange={handleChange}
                          />
                          {error?.Discounut &&
                            <span className='error' style={{ color: "red" }}> {error?.Discounut}</span>}

                        </div>
                      </div>
                      <div className="custom-input-group d-flex justify-content-center">
                        <div className="submite-btn ">
                          <button type="submit" onClick={() => {setSelectedUser();setData(resete)}}> Cancel
                          </button>
                        </div>
                        <div className="submite-btn">
                          <button type="submit" onClick={handleSubmit}> {!data.CourseId ? "Save" : "Update"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettingWrapper;
