const axios = require("axios");

const url = "http://localhost:3000/";
const apiCall = async (configBody) =>
  await axios
    .get(`${url}adminOnlyRoute/getAllUsers/getAllUsers`, configBody)
    .then((res) => res)
    .catch((er) => er.response);

const configBody = (header) => ({
  headers: {
    Authorization: header,
  },
});

describe("getAll users", () => {
  it("token not sent", async () => {
    const result = await apiCall();
    expect(result.status).toBe(400);
    expect(result.data.message).toBe("Authentication token not sent");
  });
  it("invalid token sent", async () => {
    const result = await apiCall(configBody("invalid token"));
    expect(result.status).toBe(400);
    expect(result.data.message).toBe("Authentication token is invalid");
  });

  it("valid token sent - but not of admin", async () => {
    const result = await apiCall(
      configBody(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYi5jb20iLCJfaWQiOiI1ZWMyNDYyMTBmZDliNzI4ZGNjZTlhNGIiLCJyb2xlIjoidXNlciIsImlhdCI6MTU4OTc5NzI2Mn0.40OoujXO8LlXfEE8nas6xYRuBLMwTOVodp4UmwWEUfc"
      )
    );
    expect(result.status).toBe(401);
    expect(result.data.message).toBe("Un-autherized access");
  });

  it("valid token sent - of admin", async () => {
    const result = await apiCall(
      configBody(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtQGFiLmNvbSIsIl9pZCI6IjVlYzI0YjQ2MDMzNzgzMzM4YmRmNTIxMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4OTc5NzMzNH0.2FtutSo47duVwCtoX7vdWIChkvogwmevR3NOyGK2Hbw"
      )
    );
    expect(result.status).toBe(200);
    expect(Array.isArray(result.data.users)).toBe(true);
    // contain object with keys ->> give some sort of snapshot
  });
});
