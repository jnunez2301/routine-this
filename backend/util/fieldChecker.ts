interface KeyValue {
  [key: string]: unknown;
}

function fieldChecker(obj: KeyValue, endpoint: string): string | null {
  let msg = "";
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === undefined || obj[keys[i]] === "") {
      msg += `[!] Field [${keys[i]}] is missing or empty - ${endpoint} \n`;
    }
  }
  
  return msg.length > 0 ? msg : null;
}


export default fieldChecker;
