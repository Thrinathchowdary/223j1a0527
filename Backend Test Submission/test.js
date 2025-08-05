const axios = require("axios");

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjNqMWEwNTI3QHJhZ2h1aW5zdGVjaC5jb20iLCJleHAiOjE3NTQzNzIxNDAsImlhdCI6MTc1NDM3MTI0MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImEwNTRlNGE2LWFkNmQtNDk1YS05YmIxLTZjYjhkOWMwYTU4ZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InRocmluYXRoIGNob3dkYXJ5Iiwic3ViIjoiMjAzNjMwNDgtZjMwOC00MGQzLWEyNDAtZjUzYjYyZTEzYTA5In0sImVtYWlsIjoiMjIzajFhMDUyN0ByYWdodWluc3RlY2guY29tIiwibmFtZSI6InRocmluYXRoIGNob3dkYXJ5Iiwicm9sbE5vIjoiMjIzajFhMDUyNyIsImFjY2Vzc0NvZGUiOiJ5dmhkZGEiLCJjbGllbnRJRCI6IjIwMzYzMDQ4LWYzMDgtNDBkMy1hMjQwLWY1M2I2MmUxM2EwOSIsImNsaWVudFNlY3JldCI6ImFnbmRxa05Ra0JCcVVtY3oifQ.HXibvucGGVF6KCUArqHIhQJYMmNDX6uwXIteWdPNugogit";

function Log(stack, level, packageName, message) {
  axios.post(
    "http://20.244.56.144/evaluation-service/logs",
    {
      stack: stack,
      level: level,
      package: packageName,
      message: message
    },
    {
      headers: {
        Authorization: Bearer `${accessToken}`
      }
    }
  ).then((res) => {
    console.log("Log success:", res.data);
  }).catch((err) => {
    console.error("Log failed:", err.response?.data || err.message);
  });
}

Log("backend", "error", "handler", "received string, expected bool");
