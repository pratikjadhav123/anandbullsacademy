import React, { useState } from "react";
import { Button, Card, Table } from 'react-bootstrap';
import useValidator from "../../../plugins/validator";
import notice from "../../../plugins/notice";
import Swal from 'sweetalert2';
import videos from "../../../utils/videos";
const resete = {
    folderId: "",
    CourseId: ""
}
function VideoSettingWrapperArea({ videoList, getVideoList, courseList }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(resete);
    const [validator, showMessage] = useValidator();
    const error = {
        folderId: validator.message(('folderId'), data.folderId, "folderId|string"),
        CourseId: validator.message(('Course'), data.CourseId, "required|integer"),
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
                videos.create(data).then((e) => {
                    setData(resete)
                    setOpen(false)
                    getVideoList()
                    notice.success("Video Synk SuccessFully")
                })
        } else {
            showMessage(true)
        }
    }
    const getTitle = (id) => {
        let courseName = courseList?.find((item) => {
            return item.CourseId === id;
        })
        return courseName?.Title;
    }
    const alertConfirm = (VideoId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                videos.delete(VideoId).then(() => {
                    getVideoList();
                    Swal.fire('Deleted', 'Video has been deleted.', 'success')
                });
            } else {
                Swal.fire('Cancelled', 'Video is still intact', 'info')
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
                                {!open ? 
                                <Card>
                                    <Card.Body>
                                        <Card.Title>All Video List </Card.Title>
                                        <Table responsive striped className="small">
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th>#</th>
                                                    <th>Video Name</th>
                                                    <th>Course</th>
                                                    <th>VideoUrl</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {videoList.length ? videoList.map((data, index) => <tr key={index} style={{ textAlign: "center" }} >
                                                    <td>{index + 1}</td>
                                                    <td>{data.Name}</td>
                                                    <td>{getTitle(data.CourseId)}</td>
                                                    <td>{data.VideoUrl}</td>
                                                    {/* <td><Button variant="light" onClick={() => { setOpen(true); setData(data) }}>Edit Video</Button></td> */}
                                                    <td><Button variant="light" onClick={() => { alertConfirm(data.VideoId) }}>Delete Video</Button></td>
                                                </tr>) : <h2> Add New Video</h2>}
                                            </tbody>
                                        </Table>
                                        <Button variant="primary" onClick={()=>setOpen(true)}>Synk Videos from Vdocipher</Button>
                                    </Card.Body>
                                </Card>
                                  : <form
                                        onSubmit={(e) => e.preventDefault()}
                                        id="comment_form"
                                        method="post"
                                    >
                                        <div className="comment-form">
                                            <h4>Add New Video</h4> 
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="custom-input-group">
                                                        <input
                                                            type="text"
                                                            placeholder="folderId"
                                                            id="folderId"
                                                            name="folderId"
                                                            value={data.folderId}
                                                            onChange={handleChange}
                                                        />
                                                        {error?.folderId &&
                                                            <span className='error' style={{ color: "red" }}> {error?.folderId}</span>}

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="custom-input-group">
                                                        <select className="form-select" aria-label="Default select example" name="CourseId" value={data.CourseId} onChange={handleChange}>
                                                            <option value="">Select a course</option>
                                                            {courseList?.map((item) => <option key={item.CourseId} value={item.CourseId}>{item.Title}</option>)}

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="custom-input-group d-flex justify-content-center">
                                                <div className="submite-btn ">
                                                    <button type="submit" onClick={() => { setData(resete); setOpen(false) }}> Back
                                                    </button>
                                                </div>
                                                <div className="submite-btn">
                                                    <button type="submit" onClick={handleSubmit}> Synk new Videos
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

export default VideoSettingWrapperArea;
