
/**
 * Formats the error message
 * @param  {object} error An error object
 */
export function formatError(error) {
  var errObj = JSON.parse(error.message);
  return {
    message: createErrorMessage(errObj, error),
    // defaults to internal message error
    statusCode: errObj.isBoom && errObj.output.statusCode 
        ? errObj.output.statusCode 
        :'500',
    path: error.path,
  }
}

/**
 * Creates an error message depending if received message 
 *   is a boom object type or not
 * @param  {object} errObj An object that could be a boom object
 * @param  {object} error  A graphql error object
 */
function createErrorMessage(errObj, error) {
  return errObj.isBoom ? formatBoomErrorMessage(errObj) : error.message;
}

/**
 * Formats a boom error message
 * @param  {[type]} errObj [description]
 * @return {[type]}        [description]
 */
function formatBoomErrorMessage(errObj) {
  return errObj.output.payload.error + 
    (typeof errObj.output.payload.message != 'undefined' ? ': ' + errObj.output.payload.message : '')
}
