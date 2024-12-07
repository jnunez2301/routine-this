/** 
 * @param {string[]} fields - Provide an array of fields to verify
 * @param {boolean} verbose - Logs in to the console all fields that are being passed default is false
 * @returns {boolean} true if any field is does not exist
 *  @example if(verifyFields([1,2,3, undefined])) {
 *  console.log("Hey you are missing a field!")
 * }
*/
function isAFieldMissing(fields, verbose = false) {
  if(verbose){
    console.log(fields);
  }
  for(let i = 0; i < fields.length; i++){
    const field = fields[i];
    if(!field){
      return true;
    }
  }
  return false;
}

module.exports = isAFieldMissing;