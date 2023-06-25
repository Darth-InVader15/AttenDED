import React, { useEffect, useState } from 'react';

const NumberList = ({ username }) => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/v1/${username}/allSemesters`)
      .then(response => response.json())
      .then(data => setNumbers(data))
      .catch(error => console.log(error));
  }, [username]);

  return (
    <div>
      <h2>Numbers for {username}:</h2>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberList;
