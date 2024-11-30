const bcrypt = require('bcryptjs');

function hashText(text){
    return bcrypt.hashSync(text);
}
function compareText(text, hashedText){
  return bcrypt.compareSync(text, hashedText);
}

module.exports = {
  hashText,
  compareText
}