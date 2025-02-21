import { app } from "@azure/functions";

app.http("helloWorldFunction", {
  route: "hello",  // Removed extra "/api"
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (req, context) => {
    return { body: "Hello, World!" };
  }
});
