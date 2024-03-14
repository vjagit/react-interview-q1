import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis';
import './MyComponent.css';

const MyComponent = () => {
  const [name, setName] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isNameTaken, setIsNameTaken] = useState(false);

  useEffect(() => {
    getLocations().then((locationOptions) => {
      setLocations(locationOptions);
    });
  }, []);

  const handleNameChange = async (event) => {
    const newName = event.target.value;
    setName(newName);

    // Call the isNameValid API to validate the name
    const isValid = await isNameValid(newName);
    setIsNameTaken(!isValid);

    // Check if the new name already exists in the table data
    const isNameExists = tableData.some((rowData) => rowData.name === newName);
    setIsNameTaken(isNameExists && newName !== '');
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddData = () => {
    if (name && selectedLocation) {
      const newData = { name, location: selectedLocation };
      setTableData([...tableData, newData]);
      setName('');
      setSelectedLocation('');
    }
  };

  const handleClear = () => {
    setName('');
    setSelectedLocation('');
    setIsNameTaken(false);
  };

  return (
    <div className="my-component-container">
      <label htmlFor="nameInput">Name:</label>
      <input
        id="nameInput"
        type="text"
        value={name}
        onChange={handleNameChange}
        className="my-component-input"
      />
      {isNameTaken && <p className="my-component-error">This name is already taken</p>}
      <br />
      <label htmlFor="locationDropdown">Location:</label>
      <select
        id="locationDropdown"
        value={selectedLocation}
        onChange={handleLocationChange}
        className="my-component-input"
      >
        <option value="">Select Location</option>
        {locations.map((location, index) => (
          <option key={index} value={location}>{location}</option>
        ))}
      </select>
      <div className="buttons-container">
        <button className="clear-button" onClick={handleClear}>Clear</button>
        <button className="add-button" onClick={handleAddData}>Add</button>
      </div>
      <table className="my-component-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData.name}</td>
              <td>{rowData.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
