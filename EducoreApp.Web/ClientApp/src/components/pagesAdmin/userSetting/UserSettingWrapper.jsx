import React, { useState } from "react";
import { Button, Card, Dropdown, Table } from 'react-bootstrap';
import useValidator from "../../../plugins/validator";
import notice from "../../../plugins/notice";
import Swal from 'sweetalert2';
import users from "../../../utils/users";
import payment from "../../../utils/payment";
const resete = {
  Users: ""
}
function UserSettingWrapper({ usersList, getUserList }) {
  const [data, setData] = useState(resete);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState()
  const [validator, showMessage] = useValidator();
  const error = {
    Users: validator.message(('Users'), data.Users, "required")
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
  const filteredResults = () => {
    const regex = new RegExp(search, 'i');
    return usersList.filter((item) => {
      return Object.values(item).some((value) => {
        const stringValue = String(value);
        return stringValue.toLowerCase().includes(search?.toLowerCase()) || regex.test(stringValue);
      });
    });
  }
  const handleCheckbox = (e, index) => {
    const { value, checked } = e.target;
    const arr = [...users];
    if (checked) {
      arr.push(parseInt(value));
    } else {
      arr.splice(arr.indexOf(parseInt(value)), 1);
    }
    setUsers(arr);
    handleSetData("Users", JSON.stringify(arr))
  }
  const handleAllCheckbox = (e) => {
    const { checked } = e.target;
    const arr = [];
    if (checked) {
      usersList.map((item) => {
        arr.push(parseInt(item.UserId));
      })
    }
    setUsers(arr);
    handleSetData("Users", JSON.stringify(arr))
  }
  console.log(data);
  const handleCoupne = (e) => {
    e.preventDefault()
    if (validator.allValid()) {
      payment.applyDiscount(data).then((data) => {
        setData(resete);
        getUserList()
        notice.success("Coupn Code sent to Users Email SuccessFully")
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
              <div className="package-info-table">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        action="#"
                        method="post"
                        id="booking-form"
                      >
                        <div className="col-lg-12 d-flex">
                          <div className="col-lg-6 row">
                            <div className="col-lg-5 mb-1">

                              <div className="custom-input-group mt-0 mx-2 ">
                                <div className="submite-btn">
                                  <button type="submit" onClick={handleCoupne}>Send Coupne </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-7">

                              <div className="custom-input-group m-0">
                                <input type="text" className="m-0" placeholder="Search User" value={search} onChange={(e) => setSearch(e.target.value)} />
                              </div>
                            </div>

                          </div>
                        </div>
                      </form>
                    </Card.Title>
                    <Table responsive striped className="large">
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th>#</th>
                          <th>
                            <input
                              inline
                              size="small"
                              type="checkbox"
                              onChange={handleAllCheckbox}
                            /></th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Avtive</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList.length ? filteredResults()?.map((data, index) => <tr key={index} style={{ textAlign: "center" }} >
                          <td>{index + 1}</td>
                          <td>
                            <form
                              onSubmit={(e) => e.preventDefault()}
                              id="comment_form"
                              method="post"
                            >
                              <input
                                inline
                                size="small"
                                type="checkbox"
                                value={parseInt(data.UserId)}
                                checked={users.find((id) => id == data.UserId)}
                                onChange={(e) => handleCheckbox(e, index)}
                              />
                            </form>
                          </td>
                          <td>{data.FirstName}</td>
                          <td>{data.LastName}</td>
                          <td>{data.Email}</td>
                          <td>{data.Mobile}</td>
                          <td>{data.Active ? "Active" : "InActive"}</td>
                          {/* <td><Button variant="light" onClick={() => { setOpen(true); setData(data) }}>Edit User</Button></td> */}
                          <td className="d-flex justify-content-around">
                            <Button variant="light" onClick={() => { alertConfirm(data.UserId) }}>Delete User</Button>
                            {/* <Button variant="light" onClick={() => { handleSubmit(data.UserId) }}>Send Coupne</Button> */}
                          </td>
                        </tr>) : <h2> No User Found</h2>}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettingWrapper;
