import React from "react";
import { Link } from "react-router-dom";
import add from "../Images/6.png";
import "../Styles/HomePage.css";
import one from "../Images/2.png";
import two from "../Images/3.jpeg";
import three from "../Images/4.jpeg";
import four from "../Images/5.jpeg";
import remove from "../Images/7.jpeg";
import edit from "../Images/8.jpg";
import { useState } from "react";
import { useEffect } from "react";
import employeePayrollService from "../service/employeePayrollService";
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate = useNavigate();
    const update =(id)=>{
        navigate(`editPage/${id}`);
    }

    useEffect(()=>{
        getAllEmployees();
        console.log("Use Effect in the employee Pay Role");
    },[])

    let valuesAssign={
        employeeArray:[],
    }

    const [formValue, setValue] = useState({valuesAssign});
    const [count, setCount] = useState();

    
    let getAllEmployees =()=>{
        employeePayrollService.getAllData().then((responce)=>{
            console.log("---into service----");
            console.log(responce.data.data)
            setValue({employeeArray:responce.data.data})
            setCount(responce.data.data.length);
             
        }
        ).catch(()=>{
            console.log("Person data not getting");
        });
    }
     
    let deleteEmp = (id) => {  
        let confirm = window.confirm(" Deleting conformantion ");
        if(confirm ){
            employeePayrollService.deleteEmployee(id).then(()=>{
            window.location.reload();
            getAllEmployees();
        })
        .catch(()=>{
            console.log("Invalid details");
        });
    }else{
        alert(" Not deleted the person details");
    }
    };
        
    return (
        <div>
            <div class="main-content">
                <div class="emp-details-text">Employee Details<div class="emp-count"> {count} </div>
                </div>
                <Link to="/addPage" class="name">
                    <img src={add} alt="" width="50px" value="Add Page" />
                    <input type="submit" value="Add Page" class="add" />
                </Link>
            </div>
            <table id="display" class="table">
                <thead>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Start Date</th>
                    <th>Salary</th>
                    <th>Department</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                {
            formValue.employeeArray && formValue.employeeArray.map((employee, index)=>(
            <tr className="dash" key={`${index}`}>
                <td id="table body"><img class="profile" src={
                     employee.profilePic === "../Images/2.png" ?one:
                     employee.profilePic=== "../Images/3.jpeg" ? two:
                     employee.profilePic=== "../Images/4.jpeg" ? three
                     : four
                    } alt=""/>
                    </td>
                 
                <td>{employee.name}</td>
                <td>{employee.gender}</td>
                <td>{employee.startDate}</td>
                <td>{"₹ "+employee.salary}</td>
                <td  class="department"><td class="dept-labe">{"  "+employee.departments}</td></td>
                <td>{employee.notes}</td>
                <td>
                <img class="photo" alt="edit" src={edit} onClick={()=>{update(employee.id)}} />
            
                <img class="photo"  alt="delete" src={remove} onClick={()=>{deleteEmp(employee.id)}} />
               
                </td>
            </tr>
            
        ))}
                </tbody>
            </table>
        </div>
    );
}
export default Home;