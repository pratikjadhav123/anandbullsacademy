import React, { useState } from "react";
import { Button, Card, Table } from 'react-bootstrap';
import useValidator from "../../../plugins/validator";
import notice from "../../../plugins/notice";
import Swal from 'sweetalert2';
import users from "../../../utils/users";
const resete = {
  UserId: "",
  CourseId: "",
}
function UserSettingWrapper({ usersList, courseList, getUserList }) {
  const [data, setData] = useState(resete);
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState()
  const [validator, showMessage] = useValidator();
  const error = {
    UserId: validator.message(('UserId'), data.UserId, "required"),
    CourseId: validator.message(('Course'), data.CourseId, "required")
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
    const arr = [...usersData];
    if (checked) {
      arr.push(parseInt(value));
    } else {
      arr.splice(arr.indexOf(parseInt(value)), 1);
    }
    setUsersData(arr);
    handleSetData("UserId", JSON.stringify(arr))
  }
  const handleAllCheckbox = (e) => {
    const { checked } = e.target;
    const arr = [];
    if (checked) {
      usersList.map((item) => {
        arr.push(parseInt(item.UserId));
        return item;
      })
    }
    setUsersData(arr);
    handleSetData("UserId", JSON.stringify(arr))
  }
  const handlePurchesCourse = (e) => {
    e.preventDefault()
    if (validator.allValid() && data.UserId.length) {
      users.PurchaseCourse(data).then((data) => {
        setData(resete);
        setUsersData([]);
        getUserList()
        notice.success("Course Assign to Selected User ask user to refresh and continue learning")
      }).catch((error) => {
        console.log(error);
      })
    } else {
      showMessage(true)
      notice.info("Select all neccesary field i.e. User and Course")
    }
  }
  const alertConfirm = (UserId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        users.delete(UserId).then(() => {
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
                        <div className="col-lg-12 row d-flex">
                          {/* <div className="col-lg-12 row"> */}
                          <div className="col-lg-3 d-flex justify-content-end">

                            <div className="custom-input-group mt-0 ">
                              {/* <div className="submite-btn"> */}
                              <button type="submit" onClick={handlePurchesCourse}>Assign Course </button>
                              {/* </div> */}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="custom-input-group m-0">
                              <select className="form-select m-0" aria-label="Default select example" name="CourseId" value={data.CourseId} onChange={handleChange}>
                                <option value="">Select a course</option>
                                {courseList?.map((item) => <option key={item.CourseId} value={item.CourseId}>{item.Title}</option>)}
                              </select>
                              {error?.CourseId &&
                              <span className='CourseId' style={{ color: "red" }}> {error?.CourseId}</span>}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="custom-input-group m-0">
                              <input type="text" className="m-0" placeholder="Search User" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                          </div>

                          {/* </div> */}
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
                                checked={usersData.find((id) => id === data.UserId)}
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
