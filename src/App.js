import logo from './1.jpeg';
import './App.css';

function App() {
  return (
    <div className="App">
        <div class="image">
            <img src={logo} width="100px" alt="Employee Payroll"/>
                      
        </div>
        <div class ="name">
        <span class="emp1">Employee</span><br/>
        <span class="emp1">Payroll</span>
        </div>
    </div>
  );
}

export default App;
