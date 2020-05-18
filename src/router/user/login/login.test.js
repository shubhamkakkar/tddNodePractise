const axios = require("axios");

const url = "http://localhost:3000/";
const apiCall = async (payload) =>
  await axios
    .post(`${url}user/login`, payload)
    .then((res) => res)
    .catch((er) => er.response);

describe("/user/login must recieve email and password", () => {
  it("Email is not given", async () => {
    const result = await apiCall();

    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "Email is required",
    });
  });

  it("Password is not given", async () => {
    const result = await apiCall({ email: "abc" });
    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "Password is required",
    });
  });
});

describe("/user/login email should be valid ( email and passwords are recieved  )", () => {
  it("invalid email is recieved", async () => {
    const result = await apiCall({ email: "abc", password: "abc" });
    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "Email is invalid",
    });
  });

  it("valid email is recieved", async () => {
    const result = await apiCall({ email: "abc@abc.com", password: "abc" });

    expect(result.status).toBe(200);
    expect(result.data).toEqual({
      message: "success",
    });
  });
});
