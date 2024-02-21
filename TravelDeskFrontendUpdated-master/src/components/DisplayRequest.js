import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const DisplayRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [requestData, setRequestData] = useState();
//   const [userData1, setUserData1] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44310/api/Request/GetRequestDetailsById/" + id,
   )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRequestData(res);
        console.log(res);
        console.log(requestData);
      })
      .catch((err) => {
        console.error(err.message);
      });
    })

//     fetch("https://localhost:44310/api/User/UserDetails/" + id,
//     {headers:{ "Authorization": `Bearer ${localStorage.getItem('token')}`}})
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {
//         console.log(res);
//         setUserData1(res);
//         //console.log(userData1)
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, []);
  const Back = () => {
    navigate("/previousrequests");
  };

//   if (requestData != null && userData1[0] != null) {
    if (requestData != null) {
    return (
      <>
        {
          <>
            <div className="container mt-4 details_wrapper w-50">
              <div className="card">
                {/* <div className="card-header bg-primary text-white">
                  <h2 className="text-center">User Details</h2>
                </div> */}
                <div className="card-body">
                  {/* {userData && ( */}
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td>RequestId:</td>
                        <td>{requestData.requestId}</td>
                      </tr>
                      <tr>
                        <td>Reason For Travelling:</td>
                        <td>{requestData.reasonForTravelling}</td>
                      </tr>
                      {requestData.statusReason!=null && (
                      <tr>
                        <td>Feedback:</td>
                        <td>{requestData.statusReason}</td>
                      </tr>
                      )}
                     
                      
                      
                      
                      
                      {/* <tr>
                        <td>Manager:</td>
                        <td>{userData1[0].managerName}</td>
                      </tr> */}
                     
                    </tbody>
                  </table>
                 
              </div>
            </div>
            <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={Back}
                    >
                      Back
                    </button>
                 
                 
                  {/* <div className="clearfix"></div> */}
                </div>
            </div>
            </>
            
           
          
        
        }
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default DisplayRequest;

