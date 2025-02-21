const { app } = require("@azure/functions");

app.http("helloWorldFunction", {
  route: "/api/hello",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (req, context) => {
    return { body: "Hello, World!" };
  }
});