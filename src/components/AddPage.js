import React from "react";
import { Link } from "react-router-dom";
import one from "../Images/2.png";
import two from "../Images/3.jpeg";
import three from "../Images/4.jpeg";
import four from "../Images/5.jpeg";
import "../Styles/AddPage.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import employeePayrollService from "../service/employeePayrollService";

function Add() {
    let initialValue = {
        name: "",
        allDepartments: ["HR", "Sales", "Finance", "Engineering", "Others"],
        departmentValues: [],
        gender: "",
        salary: "",
        day: "",
        month: "",
        year: "",
        startDate: "",
        notes: "",
        id: "",
        profilePic: "",
        isUpdate: false
    };

    const [formValue, setForm] = useState(initialValue);
    const ChangeValue = (event) => {
        console.log(event.target.value);
        setForm({ ...formValue, [event.target.name]: event.target.value });
    };

    const params = useParams();
    useEffect(()=>{
        if(params.id){
            getDataById(params.id);
        }
    },[params.id]);

    const getDataById=(id)=>{
        employeePayrollService.getEmployeeById(id)
        .then ((response)=>{
            let object = response.data.data;
            setData(object);
        }).catch(() => {
            console.log("Invalid update details");
        });
    };

    const setData=(obj)=>{
        let array = obj.startDate;
        console.log(array);
        console.log(obj);
        setForm({
            ...formValue,
            ...obj,
            id:obj.id,
            name:obj.name,
            departmentValues:obj.departments,
            isUpdate:true,
            day:array[0]+array[1],
            month:array[3]+array[4]+array[5],
            year:array[7]+array[8]+array[9]+array[10],
            notes:obj.notes,
            salary:obj.salary,
            gender:obj.gender,
            profilePic:obj.profilePic
        });
    };

    const onCheckChange = (name) => {
        let department = name.target.value;
        console.log(department);
        let index = formValue.departmentValues.indexOf(department);
        console.log(index);
        let checkArray = [...formValue.departmentValues];
        if (index > -1) { checkArray.splice(index, 1) }
        else { checkArray.push(department) }
        setForm({ ...formValue, departmentValues: checkArray });
    };
    const getChecked = (name) => {
        return (
            formValue.departmentValues && formValue.departmentValues.includes(name)
        );
    };

    const save = async (event) => {
        event.preventDefault();
        //console.log(formValue);
        let object = {
            name: formValue.name,
            departments: formValue.departmentValues,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            notes: formValue.notes,
            profilePic: formValue.profilePic
        }
        console.log(object)
        if(formValue.isUpdate){
            var answer = window.confirm("If Data is modified it wil not restore")
            if(answer===true){
                employeePayrollService.updateEmployee(params.id,object).then((response)=>{
                    console.log(response.data.data);
                    alert(object.name+" data added")
                })
                    .catch((error)=>{
                        alert("Error in updating",error)
                    
                });
            }
            else{
                window.location.reload();
            }
        }
        else{
        employeePayrollService.addEmployee(object)
            .then((response) => {
                console.log(response.data.data);
                alert(object.name + " Data Added ");
            })
            .catch((error) => {
                console.log("Invalid details",error);
            });
        }
    };

    return (
        <div class="from-content">
            <form class="from" action="#" onSubmit={save} >
                <div class="from-head">Employee Payroll Form</div>
                <div class="row-content">
                    <label class="label text " for="name">Name </label>
                    <input class="input name1" type="text" id="name" name="name" placeholder="Your name...." value={formValue.name} onChange={ChangeValue} required />
                    <span> </span>
                </div>
                <div class="row-content">
                    <label class="label text" for="profile">Profile image </label>
                    <div class="profile-radio-content">
                        <label>
                            <input class="name2" type="radio" id="profile1" name="profilePic" checked={formValue.profilePic === "../Images/2.png"} value="../Images/2.png" onChange={ChangeValue} />
                            <img class="profile" id="image1" src={one} alt="one" />
                        </label>
                        <label>
                            <input type="radio" id="profile1" name="profilePic" checked={formValue.profilePic === "../Images/3.jpeg"} value="../Images/3.jpeg" onChange={ChangeValue} />
                            <img class="profile" id="image1" src={two} alt="two" />
                        </label>
                        <label>
                            <input type="radio" id="profile1" name="profilePic" checked={formValue.profilePic === "../Images/4.jpeg"} value="../Images/4.jpeg" onChange={ChangeValue} />
                            <img class="profile" id="image1" src={three} alt="three" />
                        </label>

                        <label>
                            <input type="radio" id="profile1" name="profilePic" checked={formValue.profilePic === "../Images/5.jpeg"} value="../Images/5.jpeg" onChange={ChangeValue} />
                            <img class="profile" id="image1" src={four} alt="four" />
                        </label>
                    </div>
                </div>
                <div class="row-content">
                    <label class="label text" for="gender">Gender </label>
                    <div>
                        <input class="name3" type="radio" id="male" name="gender" value="Male" checked={formValue.gender === "Male"} onChange={ChangeValue} required />
                        <label class="text" for="male">Male</label>
                        <input type="radio" id="female" name="gender" value="Female" checked={formValue.gender === "Female"} onChange={ChangeValue} required />
                        <label class="text" for="female">Female</label>
                    </div>
                </div>
                <div class="row-content">
                    <label class="label text" for="department">Department </label>
                    <div>
                        <input class="checkbox name4" type="checkbox" id="hr" name="departmentValues" onChange={onCheckChange} checked={getChecked("HR")} value="HR" />
                        <label class="text" for="hr">HR</label>
                        <input class="checkbox" type="checkbox" id="sales" name="departmentValues" onChange={onCheckChange} checked={getChecked("Sales")} value="Sales" />
                        <label class="text" for="sales">Sales</label>
                        <input class="checkbox" type="checkbox" id="finance" name="departmentValues" onChange={onCheckChange} checked={getChecked("Finance")} value="Finance" />
                        <label class="text" for="finance">Finance</label>
                        <input class="checkbox" type="checkbox" id="engineer" name="departmentValues" onChange={onCheckChange} checked={getChecked("Engineer")} value="Engineer" />
                        <label class="text" for="engineer">Engineer</label>
                        <input class="checkbox" type="checkbox" id="other" name="departmentValues" onChange={onCheckChange} checked={getChecked("Others")} value="Others" />
                        <label class="text" for="other">Others</label>
                        {/* {
                            formValue.allDepartments.map((item) => (
                                <span key={item}>
                                    <input className="checkbox name4" 
                                    type="checkbox" 
                                    name={item} 
                                    onChange={() => onCheckChange(item)} 
                                    value={item} 
                                    checked={getChecked(item)} 
                                    />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))} */}
                    </div>
                </div>
                <div class="row-content">
                    <label class="label text" for="salary">Salary </label>
                    <input class="input name5" type="text" name="salary" id="salary" placeholder="Enter your salary..." value={formValue.salary} onChange={ChangeValue} required />
                </div>
                <div class="row-content">
                    <label class="label text" for="startDate">Start Date </label>
                    <div>
                        <select class="select text name6" id="day" name="day" value={formValue.day} onChange={ChangeValue} required>
                            <option value="" disabled selected>Day</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select class="select" id="month" name="month" value={formValue.month} onChange={ChangeValue} required>
                            <option value="" disabled selected>Month</option>
                            <option value="Jan">January</option>
                            <option value="Feb">Febuary</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                        </select>
                        <select class="select" id="year" name="year" value={formValue.year} onChange={ChangeValue} required>
                            <option value="" disabled selected>year</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>
                <div class="row-content">
                    <label class="label text" for="notes">Notes </label>
                    <textarea id="notes" class="input name7" name="notes" placeholder="Enter somthing..." value={formValue.notes} onChange={ChangeValue} required></textarea>
                </div>
                <div class="buttonParent">
                    <Link to="/homePage">
                        <input type="submit" class="resetButton button cancelButton" value="Back to Home" />
                    </Link>

                    <button type="submit" class="button submitButton" id="submitButton">{formValue.isUpdate ? "Update":"Submit"}</button>

                    <button type="reset" class="resetButton button">Reset</button>
                </div>
            </form>
        </div>
    );
}
export default Add;