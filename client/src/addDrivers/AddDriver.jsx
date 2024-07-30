import React, { useState } from "react";
import Service from "../service/Service";
import "./AddDriver.css"
import { NavBar } from "../navbar/NavBar";

export const AddDriver = () => {
  const initialFormData = {
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    teams: [],
    dob: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTeamsChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      teams: value.split(","),
    });
  };

  const addDriver = async (e) => {
    e.preventDefault();
    try {
      const response = await Service.createDrivers(
        formData.forename,
        formData.surname,
        formData.description,
        formData.image,
        formData.nationality,
        formData.teams,
        formData.dob
      );
      if (response) {
        alert("Driver created successfully");
        setFormData(initialFormData);
      }
    } catch (error) {
      console.log("Error creating the driver:", error);
      alert("Failed to create driver");
    }
  };

  return (
    <div>
        <NavBar/>
      <form onSubmit={addDriver}>
        <div>
          <label>
            NOMBRE:
            <input
              type="text"
              name="forename"
              value={formData.forename}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            APELLIDO:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            DESCRIPCION:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            IMAGEN URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            NACIONALIDAD:
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            TEAMS (separar por comas):
            <input
              type="text"
              name="teams"
              value={formData.teams.join(",")}
              onChange={handleTeamsChange}
            />
          </label>
        </div>
        <div>
          <label>
            FECHA DE NACIMINETO:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">ADD DRIVER</button>
      </form>
    </div>
  );
};
