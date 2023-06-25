import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SemesterList = () => {
  const { username, number } = useParams();
  const [semesterData, setSemesterData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/v1/${username}/semester/${number}/getAll`)
      .then((response) => response.json())
      .then((data) => setSemesterData(data))
      .catch((error) => console.log(error));
  }, [username, number]);

  return (
    <div>
      <h2>Subjects in Semester{number}:</h2>
      <ul>
        {semesterData.map((item, index) => (
          <li key={index}>
            <Link to={`/v1/${username}/semester/${number}/${item.name}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SemesterItemDetails = () => {
  const { username, number, semesterItemName } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}`
    )
      .then((response) => response.json())
      .then((data) => setItemData(data))
      .catch((error) => console.log(error));
  }, [username, number, semesterItemName]);

  if (itemData === null) {
    return <div>Loading...</div>;
  }

  const handleAbsentmm = async () => {
    fetch(
      `http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/absentmm`,
      {
        method: "PUT",
      }
    ).then(() => {
      window.location.reload();
    });
  };
  const handleAbsentpp = async () => {
    fetch(
      `http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/absentpp`,
      {
        method: "PUT",
      }
    ).then(() => {
      window.location.reload();
    });
  };

  const handlePresentmm = async () => {
    fetch(
      `http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/presentmm`,
      {
        method: "PUT",
      }
    ).then(() => {
      window.location.reload();
    });
  };
  const handlePresentpp = async () => {
    fetch(
      `http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/presentpp`,
      {
        method: "PUT",
      }
    ).then(() => {
      window.location.reload();
    });
  };

  const { Name, semester, instituteName, daysAttended, daysMissed } = itemData;

  return (
    <div class="card">
      <div class="card-header">
        <h2>Details for {semesterItemName}</h2>
      </div>
      <div class="card-body">
        <h3>
          <b> {username} </b>{" "}
        </h3>
        <p>
          <b>Semester:</b> {semester}
        </p>
        <p>
          <b>Institute Name:</b> {instituteName}
        </p>
        <p>
          <b>Days Attended</b>: {daysAttended}
        </p>
        <p>
          <b>Days Missed: </b> {daysMissed}
        </p>
        <p>
          <b>Attendance Percentage : </b>{" "}
          {(100 * daysAttended) / (daysAttended + daysMissed)}
        </p>
        <button id="absentmm" onClick={handleAbsentmm}>
          -
        </button>{" "}
        Absent{" "}
        <button id="absentpp" onClick={handleAbsentpp}>
          +
        </button>{" "}
        <br></br>
        <button id="presentmm" onClick={handlePresentmm}>
          -
        </button>{" "}
        Present{" "}
        <button id="presentpp" onClick={handlePresentpp}>
          +
        </button>
      </div>
    </div>
  );
};

const NumberList = ({ username }) => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/v1/${username}/allSemesters`)
      .then((response) => response.json())
      .then((data) => setNumbers(data))
      .catch((error) => console.log(error));
  }, [username]);

  const onClick = () => {
    const formHTML = `
      <div>
        <form id="subjectForm">
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="semester">Semester:</label>
            <input type="text" id="semester" name="semester" required />
          </div>
          <div>
            <label htmlFor="daysPresent"> Days Attended: </label>
            <input type="number" id="daysPresent" name="daysPresent" required />
        </div>
        <div>
            <label htmlFor="daysAbsent"> Days Missed: </label>
            <input type="number" id="daysAbsent" name="daysAbsent" required />
        </div>
        <div>
            <label htmlFor="instituteName"> InstituteName: </label>
            <input type="text" id="instituteName" name="instituteName" />
        </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    `;

    const addSubDiv = document.getElementById("addSubDiv");
    addSubDiv.innerHTML = formHTML;

    const form = document.getElementById("subjectForm");
    form.addEventListener("submit", handleSubmit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, semester, instituteName, daysPresent, daysAbsent } = event.target.elements;
    // Perform your form submission logic here
  
    // Reset the form or perform any other necessary actions

    // Make a request to the backend
    fetch(`http://localhost:3000/v1/${username}/addItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        semester: semester.value,
        username: username,
        instituteName: instituteName.value,
        daysAttended: daysPresent.value,
        daysMissed: daysAbsent.value,
      }),
    });
    event.target.reset();
  };

  const sendDataToBackend = () => {};

  return (
    <div>
      <h2>Semesters for {username}:</h2>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>
            <Link to={`/v1/${username}/semester/${number}`}>{number}</Link>
          </li>
        ))}
      </ul>
      <div id="addSubDiv"></div>
      <button onClick={onClick}>Add Subject</button>
    </div>
  );
};

export { NumberList, SemesterList, SemesterItemDetails };
