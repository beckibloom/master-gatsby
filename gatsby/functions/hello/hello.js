exports.handler = async (event, context) => {
  console.log(`Hello! I'm a serverless function.`);
  return {
    statusCode: 200,
    body: 'Hello!',
  };
};
