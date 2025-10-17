const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupObj = (arr, key, value) => {
  if(!arr || arr.length === 0){
    return {}
  }
  const lookUpObj = {}

  arr.forEach((object) => {
    const lookupKey = object[key]
    const lookupValue = object[value];

    lookUpObj[lookupKey] = lookupValue   
    
  });
  return lookUpObj;
}



