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

  it("valid email is recieved - unknow user input", async () => {
    const email = "shubhamkakkar@a.com";
    const result = await apiCall({ email, password: "abc" });
    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "User does not exists",
    });
  });

  it("valid email is recieved - known user input - wrong password ", async () => {
    const email = "abc@ab.com";
    const result = await apiCall({ email, password: "password" });
    expect(result.status).toBe(401);
    expect(result.data).toEqual({
      message: "Password do not match",
    });
  });

  it("valid email is recieved - known user input - correct password", async () => {
    const email = "abc@ab.com";
    const result = await apiCall({ email, password: "abc" });
    expect(result.status).toBe(200);
    expect(result.data.user.email).toBe(email);
    expect(result.data.user.role).not.toBeUndefined();
    expect(result.data.user.token).not.toBeUndefined();
    expect(result.data.user._id).not.toBeUndefined();
  });
});
