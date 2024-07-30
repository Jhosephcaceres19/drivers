const validateForm = () => {
    let valid = true;
    const newErrors = {
      forename: "",
      surname: "",
      description: "",
      nationality: "",
    };
  
    if (!formData.forename) {
      newErrors.forename = "El nombre es obligatorio.";
      valid = false;
    }
  
    if (!formData.surname) {
      newErrors.surname = "El apellido es obligatorio.";
      valid = false;
    }
  
    if (!formData.description) {
      newErrors.description = "La descripción es obligatoria.";
      valid = false;
    }
  
    if (!formData.nationality) {
      newErrors.nationality = "La nacionalidad es obligatoria.";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  