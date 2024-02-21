import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
//import { Navigate } from "react-router-dom";

const PreviousRequests = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [previousRequests, setPreviousRequests] = useState([]);
  const [statusName,setStatusName]=useState("");
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const navigate = useNavigate();

  const prePage = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };


  const changeCPage = (e) => {
    setcurrentPage(Number(e.target.textContent));
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(previousRequests.length / recordsPerPage)) {
      setcurrentPage(currentPage + 1);
    }
  };
  const Delete=(id) => {
    if(window.confirm("Do you really want to remove ?")){
        fetch("https://localhost:44310/api/Request/DeleteRequest/" +id, {
            method: "DELETE"
           }).then((res) => {
            alert("Removed Successfully");
            window.location.reload();
     }).catch((err) => {
        console.log(err.message);
     })
}}
  const LoadDetail = (id) => {
    navigate("/displayrequest/" + id);
  };
  async function fetchData() {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    
    const response = await fetch('https://localhost:44310/api/Request/GetPreviousRequests/'+userId);
    const data = await response.json();
    setPreviousRequests(data);
  }
  async function getStatusName(){
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const response1 = await fetch('https://localhost:44310/api/Request/GetStatusName/'+userId);
    console.log(JSON.stringify(response1));
    setStatusName(response1);
  }
  useEffect(() => {
    getStatusName();
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="text-center">Requests</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead className="bg-dark text-white">
              <tr>
                <td>RequestId</td>
                <td>Reason For Travelling</td>
                <td>Booking Type</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {previousRequests &&
                previousRequests.slice(firstIndex, lastIndex).map((previousRequest) => (
                  <tr key={previousRequest.requestId}>
                    <td>{previousRequest.requestId}</td>
                    <td>{previousRequest.reasonForTravelling}</td>
                    <td>{previousRequest.bookingTypeName}</td>
                    <td>{previousRequest.statusName}</td>
                    
                     <td>
                      <a
                          onClick={() => {
                            LoadDetail(previousRequest.requestId);
                          }}
                          className="btn btn-primary"
                        >
                          Details
                        </a>
                        <a
                          onClick={() => {
                            Delete(previousRequest.requestId);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </a>
                    </td> 
                    <td>
                      <div className="d-flex justify-content-center">
                       
                       
                      </div>
                    </td>
                   
                  </tr>
                ))}
            </tbody>
          </table>
          
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" onClick={prePage}>
                    {" "}
                    Prev
                  </a>
                </li>
                {previousRequests &&
                  Array.from({
                    length: Math.ceil(previousRequests.length / recordsPerPage),
                  }).map((_, i) => (
                    <li
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                      key={i}
                    >
                      <a href="#" className="page-link" onClick={changeCPage}>
                        {i + 1}
                      </a>
                    </li>
                  ))}
                <li className="page-item">
                  <a href="#" className="page-link" onClick={nextPage}>
                    {" "}
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreviousRequests;
