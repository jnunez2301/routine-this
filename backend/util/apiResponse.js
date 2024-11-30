/**
 * @param {boolean} success - Indicates if the API request was successful.
 * @param {string} message - The message to be returned with the response.
 * @returns {{ success: boolean, message: string, session: * }} The API response object.
 */
function apiResponse(success, message) {
  return {
    success,
    message,
  };
}

module.exports = apiResponse;
