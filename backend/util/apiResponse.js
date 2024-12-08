/**
 * @param {boolean} success - Indicates if the API request was successful.
 * @param {string} message - The message to be returned with the response.
 * @param {unknown} data - It can be an array, token or anything you want
 * @returns {{ success: boolean, message: string, session: * }} The API response object.
 */
function apiResponse(success, message, data) {
  return {
    success,
    message,
    data,
  };
}

module.exports = apiResponse;
