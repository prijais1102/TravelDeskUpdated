import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
//import { Navigate } from "react-router-dom";

const ManagerRequests = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [previousRequests, setPreviousRequests] = useState([]);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [statusId,setStatusId]=useState();
  const [statusReason,setStatusReason]=useState();
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
 
  
  async function fetchData() {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    
    const response = await fetch('https://localhost:44310/api/Request/GetRequestDetailsByManagerId/'+userId);
    const data = await response.json();
    setPreviousRequests(data);
  }
  
  useEffect(() => {
    fetchData();
  }, []);
   
const Save = async (requestId) => {
 
  const userId = localStorage.getItem("userId");
    console.log(userId);
    var temp = {
      requestId: requestId,
      statusId : statusId,
      statusReason : statusReason
    }
    
  const response = await fetch('https://localhost:44310/api/Request/UpdateStatusWithReason' , {
                 
                  method: 'PUT',
                  body: JSON.stringify(temp),
                  headers: {
                      'Content-Type': 'application/json',
                  },
 
            });
            console.log(response);
            window.location.reload();
  };
  
  const reasonOnChange = (event) => {
    setStatusReason(event.target.value);
  };
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
                <td>Feedback</td>
                <td></td>
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
                      <input name="status" type="radio"
                          onClick={() => {
                             setStatusId(3)
                          }}
                          className="btn btn-primary"
                        />
                          Approve
                        
                        <input name="status" type="radio"
                          onClick={() => {
                           setStatusId(2)
                          }}
                          className="btn btn-danger"
                        />
                          Reject
                        
                    </td> 
                    <td>
                    <input type="text" onChange={reasonOnChange} ></input>
                    </td>
                   <td>
                    <a
                    className="btn btn-success"
                     onClick={()=>Save(previousRequest.requestId)}
                    >
                      Save
                    </a>
                   </td>
                    
                   
                   
                  </tr>
                  
                ))}
            </tbody>
          </table>
          </div>
          </div>
         

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
   
  );
};
export default ManagerRequests;
