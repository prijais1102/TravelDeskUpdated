import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
//import { Navigate } from "react-router-dom";

const ApprovedRequests = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [randomNumber,setRandomNumber]=useState();
  const [ticket,setTicket]=useState([]);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // const [statusId,setStatusId]=useState();
  // const [statusReason,setStatusReason]=useState();
  const navigate = useNavigate();

  const prePage = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };


  const changeCPage = (e) => {
    setcurrentPage(Number(e.target.textContent));
  };
  
  const Save=async (requestId)=>{
    console.log(ticket)
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const randomNumberr=Math.floor(10000000 + Math.random() * 90000000);
    setRandomNumber(randomNumberr);
    console.log(randomNumberr);
    alert("Booking ID "+randomNumberr+" is generated.");
    var temp = {
      bookingId:randomNumberr
    }
    
  const response = await fetch('https://localhost:44310/api/Request/UpdateBookingId/'+requestId , {
                 
                  method: 'PUT',
                  body: JSON.stringify(temp),
                  headers: {
                      'Content-Type': 'application/json',
                  },
 
            });
            console.log(response);
            // window.location.reload();
 }

  const nextPage = () => {
    if (currentPage < Math.ceil(approvedRequests.length / recordsPerPage)) {
      setcurrentPage(currentPage + 1);
    }
  };
 
  
  async function fetchData() {
   
    
    const response = await fetch('https://localhost:44310/api/Request/GetApprovedRequests');
    
if (!response.ok)
 {      
   throw new Error(`HTTP error! Status: ${response.status}`);  
     }
    const data = await response.json();

    setApprovedRequests(data);
    const ticketStatuses = {};
  data.forEach(approvedRequest => {
    if (approvedRequest.bookingId === null) {
      ticketStatuses[approvedRequest.requestId] = "Booked";
    } else {
      ticketStatuses[approvedRequest.requestId] = "Not Booked";
    }
  });
  setTicket(ticketStatuses);
  }
  
  useEffect(() => {
    fetchData();
    // Save();
  }, []);

  return (
    <div className="container w-75 mt-4">
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
                <td>Action</td>
                
              </tr>
            </thead>
            <tbody>
              {approvedRequests &&
                (approvedRequests.slice(firstIndex, lastIndex).map((approvedRequest) => (
                  <tr key={approvedRequest.requestId}>
                    <td>{approvedRequest.requestId}</td>
                    <td>{approvedRequest.reasonForTravelling}</td>
                    <td>{approvedRequest.bookingTypeName}</td>
                    <td>{approvedRequest.statusName}</td> 
                    <td>{ticket[approvedRequest.requestId]}</td>
                    
                   <td>
                    <a
                    className="btn btn-success"
                    onClick={()=>Save(approvedRequest.requestId)}
                    >
                      
                    </a>
                   </td>
                    
                   
                   
                  </tr>
                  
                )))}
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
                {approvedRequests &&
                  Array.from({
                    length: Math.ceil(approvedRequests.length / recordsPerPage),
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
export default ApprovedRequests;
