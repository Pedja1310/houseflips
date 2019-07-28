import axios from "axios";

export const register = async ({ name, email, password }) => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  console.log(config);
  const body = JSON.stringify({ name, email, password });
  console.log(body);

  try {
    console.log("calling");
    const res = await axios.post("/api/users", body, config);

    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
