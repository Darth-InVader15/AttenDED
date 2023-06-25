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
    fetch(`http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/absentmm`, {
        method: 'PUT'
    })
    .then(
        () => {
            window.location.reload();
        }
    )
    ;
  };
  const handleAbsentpp = async () => {
    fetch(`http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/absentpp`, {
        method: 'PUT'
    })
    .then(
        () => {
            window.location.reload();
        }
    )
    ;
  };

  const handlePresentmm = async () => {
    fetch(`http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/presentmm`, {
        method: 'PUT'
    })
    .then(
        () => {
            window.location.reload();
        }
    )
    ;
  };
  const handlePresentpp = async () => {
    fetch(`http://localhost:3000/v1/${username}/semester/${number}/${semesterItemName}/presentpp`, {
        method: 'PUT'
    })
    .then(
        () => {
            window.location.reload();
        }
    )
    ;
  };

  const { Name, semester, instituteName, daysAttended, daysMissed } = itemData;

  return (
    <div class="card">
  <div class="card-header">
    <h2>Details for {semesterItemName}</h2>
  </div>
  <div class="card-body">
    <h3><b> {username} </b> </h3>
    <p><b>Semester:</b> {semester}</p>
    <p><b>Institute Name:</b> {instituteName}</p>
    <p><b>Days Attended</b>: {daysAttended}</p>
    <p><b>Days Missed: </b> {daysMissed}</p>
    <p><b>Attendance Percentage : </b> {100*daysAttended/(daysAttended+daysMissed)}</p>
    <button id="absentmm" onClick={handleAbsentmm}>-</button> Absent <button id="absentpp" onClick={handleAbsentpp}>+</button> <br></br>
    <button id="presentmm" onClick={handlePresentmm}>-</button> Present <button id="presentpp" onClick={handlePresentpp}>+</button>
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
    </div>
  );
};

export { NumberList, SemesterList, SemesterItemDetails };
