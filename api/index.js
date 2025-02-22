import { app } from "@azure/functions";

app.http("helloWorldFunction", {
  route: "hello",  
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (req, context) => {
    return { body: "Hello, World!" };
  }
});
