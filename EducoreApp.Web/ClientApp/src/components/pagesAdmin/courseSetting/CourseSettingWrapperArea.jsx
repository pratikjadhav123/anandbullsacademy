import React, { useState } from "react";
import { Button, Card, Dropdown, Table } from 'react-bootstrap';
import useValidator from "../../../plugins/validator";
import course from "../../../utils/course";
import notice from "../../../plugins/notice";
import Swal from 'sweetalert2';
const resete = {
  Title: "",
  Description: "",
  Price: ""
}
function CourseSettingWrapperArea({ courseList, getCourseList }) {
  console.log("courseList", courseList);
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
      if (data.CourseId) {
        course.update(data.CourseId, data).then((data) => {
          setData(resete)
          setOpen(false)
          getCourseList()
          notice.success("Course Updated SuccessFully")
        })
      } else {
        course.create(data).then((data) => {
          setData(resete)
          setOpen(false)
          getCourseList()
          notice.success("New Course Created SuccessFully")
        })
      }
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
        course.delete(CourseId).then(()=>{
          getCourseList();
          Swal.fire('Deleted', 'Course has been deleted.', 'success')
        });
      } else {
        Swal.fire('Cancelled', 'Course is still intact', 'info')
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
                {!open ? <Card>
                  <Card.Body>
                    <Card.Title>All Course List </Card.Title>
                    <Table responsive striped className="small">
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th>#</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseList.length ? courseList.map((data, index) => <tr key={index} style={{ textAlign: "center" }} >
                          <td>{index + 1}</td>
                          <td>{data.Title}</td>
                          <td>{data.Description}</td>
                          <td>₹ {data.Price }</td>
                          <td><Button variant="light" onClick={() => { setOpen(true); setData(data) }}>Edit Course</Button></td>
                          <td><Button variant="light" onClick={()=>{alertConfirm(data.CourseId)}}>Delete Course</Button></td>
                        </tr>) : <h2> Add new Course</h2>}
                      </tbody>
                    </Table>
                    <Button variant="primary" onClick={() => { setOpen(true); setData(resete) }}>Add New Course</Button>
                  </Card.Body>
                </Card>
                  : <form
                    onSubmit={(e) => e.preventDefault()}
                    id="comment_form"
                    method="post"
                  >
                    <div className="comment-form">
                      {!data.CourseId ? <h4>Add new Course</h4> : <h4>Update Course</h4>}
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="custom-input-group">
                            <input
                              type="text"
                              placeholder="Your Course Tile "
                              id="Title"
                              name="Title"
                              value={data.Title}
                              onChange={handleChange}
                            />
                            {error?.Title &&
                              <span className='error' style={{ color: "red" }}> {error?.Title}</span>}

                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="custom-input-group">
                            <input type="string" placeholder="Price" id="Price" name="Price" value={data.Price} onChange={handleChange} />
                          </div>
                          {error?.Price &&
                            <span className='error' style={{ color: "red" }}> {error?.Price}</span>}

                        </div>
                      </div>

                      <div className="custom-input-group">
                        <textarea
                          cols={20}
                          rows={4}
                          placeholder="Write Description about course"
                          id="Description"
                          name="Description"
                          value={data.Description}
                          onChange={handleChange}
                        />
                        {error?.Description &&
                          <span className='error' style={{ color: "red" }}> {error?.Description}</span>}

                      </div>
                      <div className="custom-input-group d-flex justify-content-center">
                        <div className="submite-btn ">
                          <button type="submit" onClick={() => setOpen(false)}> Back
                          </button>
                        </div>
                        <div className="submite-btn">
                          <button type="submit" onClick={handleSubmit}> {!data.CourseId ? "Create new Course" : "Update Course"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>}


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

export default CourseSettingWrapperArea;
