const axios = require("axios");

const url = "http://localhost:3000/";

const apiCall = async (payload) =>
  await axios
    .post(`${url}user/signup`, payload)
    .then((res) => res)
    .catch((er) => er.response);

describe("/user/login must recieve email, password and confirm password", () => {
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

  it("Confirm password is not given", async () => {
    const result = await apiCall({ email: "abc", password: "abc" });
    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "Confirm password is required",
    });
  });
});

describe("/user/signup email should be valid ( email , password, and confirm passwords are recieved  )", () => {
  it("invalid email is recieved - passwords dont match", async () => {
    const result = await apiCall({
      email: "abc",
      password: "abc",
      confirmPassword: "abc2",
    });
    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "Email is invalid",
    });
  });

  it("invalid email is recieved - passwords do match", async () => {
    const result = await apiCall({
      email: "abc",
      password: "abc",
      confirmPassword: "abc",
    });
    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "Email is invalid",
    });
  });

  it("valid email is recieved but passwords don't match", async () => {
    const result = await apiCall({
      email: "abc@ab.com",
      password: "abc",
      confirmPassword: "abc2",
    });
    expect(result.status).toBe(400);
    expect(result.data).toEqual({
      message: "Passwords do not match",
    });
  });

  it("valid email is recieved but passwords do match - role not given - same user", async () => {
    const result = await apiCall({
      email: "abc@ab.com",
      password: "abc",
      confirmPassword: "abc",
    });
    expect(result.status).toBe(200);
    expect(result.data).toEqual({
      message: "User already exists",
    });
  });

  it("valid email is recieved but passwords do match - role not given - different user", async () => {
    /**
     * TODO : please change the user email everytime this test is run, else this will fail
     */

    const email = "random2@ab.com";

    const result = await apiCall({
      email,
      password: "abc",
      confirmPassword: "abc",
    });
    expect(result.status).toBe(200);
    expect(result.data.user.email).toBe(email);
    expect(result.data.user.role).toBe("user");
    expect(result.data.user.token).not.toBeUndefined();
    expect(result.data.user._id).not.toBeUndefined();
  });

  it("valid email is recieved but passwords do match - role given - same user ", async () => {
    const result = await apiCall({
      email: "abc@ab.com",
      password: "abc",
      confirmPassword: "abc",
      role: "admin",
    });
    expect(result.status).toBe(200);
    expect(result.data).toEqual({
      message: "User already exists",
    });
  });

  it("valid email is recieved but passwords do match - role given - different user ", async () => {
    /**
     * TODO : please change the user email everytime this test is run, else this will fail
     */

    const email = "amin2@admin.com";
    const role = "admin";

    const result = await apiCall({
      email,
      password: "abc",
      confirmPassword: "abc",
      role,
    });
    expect(result.status).toBe(200);
    expect(result.data.user.email).toBe(email);
    expect(result.data.user.role).toBe(role);
    expect(result.data.user.token).not.toBeUndefined();
    expect(result.data.user._id).not.toBeUndefined();
  });
});
