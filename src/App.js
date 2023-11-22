import React, { useState, useRef } from "react"; 
import "./App.css";

function App() {
  const studentNameRef = useRef("");
  const gradeRef = useRef("");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [form, setForm] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setForm([...form, { name: studentName, grade }]);
    setStudentName("");
    setGrade("");
    // Clear the ref values
    studentNameRef.current = "";
    gradeRef.current = "";
  };

  const calculateMean = () => {  //function that calculate the mean
    if (form.length === 0) return 0;
    const totalGrades = form.reduce((acc, row) => acc + parseFloat(row.grade), 0);
    return totalGrades / form.length;
  };

  const heighGrade = () => { //function that calculate the high grade
    if (form.length === 0) return 0;
    const topGrade = Math.max(...form.map((row) => parseFloat(row.grade)));
    return topGrade;
  };

  const lowestGrade = () => { //function that calculate the lowest grade
    if (form.length === 0) return 0;
    const lowGrade = Math.min(...form.map((row) => parseFloat(row.grade)));
    return lowGrade;
  };

  const displayList = () => (  //function to display my form 
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
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student name"
              className="student-name"
            />
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
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