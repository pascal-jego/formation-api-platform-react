import axios from "axios";
import CustomersAPI from "./customersAPI";
import customersAPI from "./customersAPI";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";

/**
 * Déconnexion (suppression du token du localstorage et sur Axios)
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * Requete HTTP d'authentification et stockage du token dans le storage et sur Axios
 * @param {object} credentials 
 */
function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then(response => response.data.token)
    .then(token => {
      // Je stocke le token dans mon localStorage
      window.localStorage.setItem("authToken", token);
      // On prévient Axios qu'on a maintenant un header par défaut sur toute nos futures requetes HTTP
      setAxiosToken(token);
      // return true;
    });
}

/**
 * Positionne le token JWT sur Axios
 * @param {string} token  le token JWT
 */
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place  lors du chargement de l'application
 */
function setup() {
  // 1. voir si on a un token ?
  const token = window.localStorage.getItem("authToken");
  // 2. Si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
      // console.log("Connexion établie avec axios");
    }
    // console.log(jwtData.exp * 1000, new Date().getTime());
  }
  // Donner le token à axios
}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns boolean
 * @param {*} params 
 */
function isAuthenticated(params) {
  // 1. voir si on a un token ?
  const token = window.localStorage.getItem("authToken");
  // 2. Si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    } else {
      return false;
    }
    return false;
  }
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated
};
