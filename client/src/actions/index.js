import { CREATE_TOKEN } from "./constants";

export const createToken = (code) => async (dispatch) => {
  try {
    const sendCode = await fetch("/sleepbyrange", {
      // The default URL for backEnd is written on "app.js", just write "/*yourBackenRoute*"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });

    const response = await sendCode.json();

    dispatch({ type: CREATE_TOKEN, payload: response });
  } catch (error) {
    console.error(error);
  }
};
export function postUser(user) {
  return async function (dispatch) {
    try {
      const userPosted = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user }),
      });

      const response = await userPosted.json();
      return response;
    } catch (error) {
      console.log("El error client actions postUser es:", error.message);
      throw new Error("El error client actions postUser es:", error.message);
    }
  };
}
export async function getUserByEmail(email) {
  try {
    const userByEmail = await fetch(`http://localhost:3001/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await userByEmail.json();
    console.log("response:", response);
    return response;
  } catch (error) {
    console.log("El error client actions getUserByEmail es:", error.message);
    throw new Error(
      "El error client actions getUserByEmail es:",
      error.message
    );
  }
}

export function logInUser(email, password) {
  console.log("recibi en actions :");
  console.log("email:", email);
  console.log("password:", password);
  return async function (dispatch) {
    try {
      const response = await fetch(`http://localhost:3001/login/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const userFound = await response.json();
      console.log("user found in actions:", userFound);
      return userFound;
    } catch (error) {
      console.log(error);
    }
  };
}
