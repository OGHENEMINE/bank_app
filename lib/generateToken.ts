export const generateAlphanumericToken = (length: number): string => {
    let token = '';
  
    // Keep generating random strings until the token reaches the desired length
    while (token.length < length) {
      token += Math.random().toString(36).substring(2);
    }
  
    // Return only the required number of characters
    return token.substring(0, length);
  };

  export const generateNumericToken = (length: number): string => {
    let token = '';
  
    // Keep generating until we have enough digits
    while (token.length < length) {
      token += Math.random().toString().substring(2); // Skip "0."
    }
  
    // Return the token truncated to the desired length
    return token.substring(0, length);
  };
  