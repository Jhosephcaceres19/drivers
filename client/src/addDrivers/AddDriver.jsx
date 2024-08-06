import React, { useState } from "react";
import Service from "../service/Service";
import "./AddDriver.css";
import { NavBar } from "../navbar/NavBar";

export const AddDriver = () => {
  // Datos iniciales del formulario
  const initialFormData = {
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    teams: [],
    dob: "",
  };

  // Estados para los datos del formulario y los errores de validación
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Crear un nuevo objeto de errores basado en el estado actual
    const newErrors = { ...errors };
    
    // Validar campos específicos
    if (name === "forename" || name === "surname" || name === "nationality") {
      // Validar que el campo contenga solo letras
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        newErrors[name] = "El campo debe contener solo letras";
      } else {
        delete newErrors[name];
      }
    } else if (name === "image") {
      // Validación básica de URL
      try {
        new URL(value);
        delete newErrors[name];
      } catch {
        newErrors[name] = "URL de imagen no válida";
      }
    }

    // Actualizar los datos del formulario y los errores
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar el error del campo si se vuelve válido
    setErrors(newErrors);
  };

  // Maneja los cambios en el campo de equipos
  const handleTeamsChange = (e) => {
    const { value } = e.target;

    // Actualizar los equipos en el estado del formulario
    setFormData({
      ...formData,
      teams: value.split(",").map(team => team.trim()).filter(team => team),
    });

    // Limpiar el error para el campo de equipos si se vuelve válido
    if (errors["teams"]) {
      setErrors({
        ...errors,
        teams: "",
      });
    }
  };

  // Valida el formulario antes de enviar
  const validateForm = () => {
    const newErrors = {};

    // Verificar si los campos obligatorios están vacíos
    if (!formData.forename) newErrors.forename = "Nombre es obligatorio";
    if (!formData.surname) newErrors.surname = "Apellido es obligatorio";
    if (!formData.description) newErrors.description = "Descripción es obligatoria";
    if (!formData.image) newErrors.image = "URL de imagen es obligatoria";
    if (!formData.nationality) newErrors.nationality = "Nacionalidad es obligatoria";
    if (!formData.dob) newErrors.dob = "Fecha de nacimiento es obligatoria";

    // Verificar si hay equipos vacíos
    if (formData.teams.length === 0) newErrors.teams = "Al menos un equipo es obligatorio";

    // Actualizar el estado de errores y devolver si no hay errores
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Maneja la creación del conductor
  const addDriver = async (e) => {
    e.preventDefault();
    // Validar el formulario antes de enviar
    if (!validateForm()) return; 

    try {
      // Llamar al servicio para crear el conductor
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
        // Restablecer los datos del formulario después de la creación
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
      <form onSubmit={addDriver} className="form-add">
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
            DESCRIPCIÓN:
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
            FECHA DE NACIMIENTO:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </label>
        </div>
        <button type="submit">CREAR DRIVER</button>
      </form>
    </div>
  );
};
