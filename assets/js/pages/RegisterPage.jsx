import React, { useState } from "react";
import Field from "../components/forms/Fields";
import { Link } from "react-router-dom";
import { async } from "q";
import UserAPI from "../services/usersAPI";

const RegisterPage = ({history}) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  // Gestion des changement des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // Gestion de la soummission
  const handleSubmit = async event => {
    event.preventDefault();
    const apiErrors = {};
    if(user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm = "Votre mot de passe de confirmation n'est pas identique avec le mot de passe";
      setErrors(apiErrors);
      return;
    }

    try {
      await UserAPI.register(user);
      setErrors({});

      // TODO : flash success
      history.replace('/login');      
    } catch (error) {      
      const {violations} = error.response.data;

      if(violations) {
        violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        })
        setErrors(apiErrors);
      }
      // TODO : flash erreur
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="Nom"
          placeholder="Votre nom"
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />
        
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Votre prénom"
          type="text"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />
        
        <Field
          name="email"
          label="Adresse email"
          placeholder="Votre adresse email"
          type="email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        <Field
          name="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          type="password"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        <Field
          name="passwordConfirm"
          label="Confirmation de mot de passe"
          placeholder="Confirmer votre mot de passe"
          type="password"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Je m'inscris
          </button>
          <Link to="/login" className="btn btn-link">
            J'ai déja un compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
