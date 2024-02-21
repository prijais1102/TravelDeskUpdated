import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
//import { Navigate } from "react-router-dom";

const ManagerUsers = () => {
  const role1 = localStorage.getItem("role");
  const [currentPage, setcurrentPage] = useState(1);
  const [userData, setUserData] = useState(null);

  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  // const navigate = useNavigate();

  const prePage = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  
 

  const changeCPage = (e) => {
    setcurrentPage(Number(e.target.textContent));
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(userData.length / recordsPerPage)) {
      setcurrentPage(currentPage + 1);
    }
  };
 
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://localhost:44310/api/User/AllUsersToDisplay"
      );
      const data = await response.json();
      setUserData(data);
    }
    fetchData();
    console.log(userData);
  }, []);
  // const back = () => {
  //   navigate("/home");
  // };
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="text-center">Employees</h2>
        </div>
        <div className="card-body">
       
          <table className="table table-bordered table-striped">
            <thead className="bg-dark text-white">
              <tr>
                <td>UserId</td>
                <td>FirstName</td>
                <td>LastName</td>
                <td>RoleName</td>
                <td>ManagerName</td>
                <td>DepartmentName</td>
                {/* <td>Status</td> */}
                {/* <td>Actions</td> */}
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.slice(firstIndex, lastIndex).map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.roleName}</td>
                    <td>{user.managerName}</td>
                    <td>{user.departmentName}</td>
                    
                    {/* <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-success "
                          
                        >
                          Approved
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={handleRejectClick}
                          
                        >
                          Rejected
                        </button>
                      </div>
                    </td>
                    */}
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <div class="text-center">
            <button type="button" className="btn btn-primary" onClick={back}>
              Back
            </button>
          </div> */}
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" onClick={prePage}>
                    {" "}
                    Prev
                  </a>
                </li>
                {userData &&
                  Array.from({
                    length: Math.ceil(userData.length / recordsPerPage),
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
export default ManagerUsers;
