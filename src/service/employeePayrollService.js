import axios from "axios";
class EmployeePayrollService {
    baseUrl = "http://localhost:8888/employeePayroll";
    addEmployee(data) {
        return axios.post(`${this.baseUrl}/add`, data);
    }
    getAllData() {
        return axios.get(`${this.baseUrl}/get`);
    }
    getEmployeeById(id) {
        return axios.get(`${this.baseUrl}/get/${id}`);
    }
    updateEmployee(id, data) {
        return axios.put(`${this.baseUrl}/update/${id}`, data);
    }
    deleteEmployee(id) {
        return axios.delete(`${this.baseUrl}/delete/${id}`);
    }

}
export default new EmployeePayrollService();