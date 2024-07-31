import React, { useState } from "react";
import Service from "../service/Service";
import "./AddDriver.css";
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for the field if it becomes valid
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleTeamsChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      teams: value.split(","),
    });
    // Clear error for the teams field if it becomes valid
    if (errors["teams"]) {
      setErrors({
        ...errors,
        teams: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Check if required fields are empty
    if (!formData.forename) newErrors.forename = "Nombre es obligatorio";
    if (!formData.surname) newErrors.surname = "Apellido es obligatorio";
    if (!formData.description) newErrors.description = "Descripción es obligatoria";
    if (!formData.image) newErrors.image = "URL de imagen es obligatoria";
    if (!formData.nationality) newErrors.nationality = "Nacionalidad es obligatoria";
    if (!formData.dob) newErrors.dob = "Fecha de nacimiento es obligatoria";
    // Check if teams are empty
    if (formData.teams.length === 0 || formData.teams[0] === "") newErrors.teams = "Al menos un equipo es obligatorio";

    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const addDriver = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop form submission if validation fails

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
        alert("Driver creado correctamente");
        setFormData(initialFormData);
      }
    } catch (error) {
      console.log("Error al crear el driver:", error);
      alert("Fallo al crear el driver");
    }
  };

  return (
    <div>
      <NavBar />
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
            {errors.forename && <span className="error">{errors.forename}</span>}
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
            {errors.surname && <span className="error">{errors.surname}</span>}
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
            {errors.description && <span className="error">{errors.description}</span>}
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
            {errors.image && <span className="error">{errors.image}</span>}
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
            {errors.nationality && <span className="error">{errors.nationality}</span>}
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
            {errors.teams && <span className="error">{errors.teams}</span>}
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
            {errors.dob && <span className="error">{errors.dob}</span>}
          </label>
        </div>
        <button type="submit">ADD DRIVER</button>
      </form>
    </div>
  );
};
