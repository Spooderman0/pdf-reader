
export const generateUUID = (varString) => {
    // Generate a UUID (v4)
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  
    // Generate the UUID
    const uuidStr = uuidv4().replace(/-/g, '');
    
    // Convert the UUID string to a shorter numeric representation
    const shortUUID = uuidStr.substring(0, 6);
  
    return varString + shortUUID;
  }