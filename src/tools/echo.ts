const echoTool = {
  name: "echo",
  description: "Echo text back",

  schema: {
    type: "object",
    properties: {
      text: {
        type: "string",
      },
    },
    required: ["text"],
  },

  async handler(args: Record<string, unknown>) {
    const text = String(args.text);
    return `Echo: ${text}`;
  },
};

export default echoTool;
