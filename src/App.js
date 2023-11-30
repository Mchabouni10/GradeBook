import React, { useState, useRef } from "react"; 
import "./App.css";

function App() {
  const studentNameRef = useRef("");    // Use useRef for studentName 
  const gradeRef = useRef("");      // Use useRef for grade
  const [form, setForm] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Access current values from the reff hook 
    const name = studentNameRef.current.value;
    const studentGrade = gradeRef.current.value;

    
    if (name && studentGrade) {
      setForm([...form, { name, grade: studentGrade }]); // Check if the input is not empty
      
      // Clear the ref values
      studentNameRef.current.value = "";
      gradeRef.current.value = "";
    }
  };

  const calculateMean = () => {
    if (form.length === 0) return 0;
    const totalGrades = form.reduce((acc, row) => acc + parseFloat(row.grade), 0);
    return totalGrades / form.length;
  };

  const heighGrade = () => {
    if (form.length === 0) return 0;
    const topGrade = Math.max(...form.map((row) => parseFloat(row.grade)));
    return topGrade;
  };

  const lowestGrade = () => {
    if (form.length === 0) return 0;
    const lowGrade = Math.min(...form.map((row) => parseFloat(row.grade)));
    return lowGrade;
  };

  const displayList = () => (
    <tbody>
      {form.map((row, index) => (
        <tr key={index}>
          <td className="student-info">
            <div className="student-name">
              Student name: <strong>{row.name}</strong>
            </div>
            <div className="student-grade">
              Student grade: <strong>{row.grade}/100</strong>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              ref={studentNameRef} // Use ref for studentName not use state 
              placeholder="Student name"
              className="student-name"
            />
            <input
              type="number"
              ref={gradeRef} // Use ref for grade not a use state
              placeholder="Grade btwn 0-100"
              className="student-grade"
            />
          </div>
          <input type="submit" value="Submit Form" className="submit-button" />
        </form>
      </div>
      <div className="display">
        <p>
          <strong>Mean Grade: </strong> {calculateMean()}
        </p>
        <p>
          <strong>Maximum Grade: </strong>
          {heighGrade()}
        </p>
        <p>
          <strong>Minimum Grade: </strong>
          {lowestGrade()}
        </p>
        <p>{displayList()}</p>
      </div>
    </>
  );
}

export default App;