// A function that creates a success response object
function createResponseSuccess(data) {
  return { status: 200, data };
}

// A function that creates an error response object
function createResponseError(status, message) {
  return { status: status || 500, data: { error: message || 'Okänt fel' } };
}

// A function that creates a response object with a message
function createResponseMessage(status, message) {
  return { status: status || 200, data: { message } };
}

// Exports the three functions as an object
module.exports = {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
};
