/**
 * Simulates checking if the provided name is taken.
 * @param {string} name - The name to validate.
 * @returns {Promise<boolean>} A promise that resolves to true if the name is available, false otherwise.
 */
export const isNameValid = (name) => {
    return new Promise((resolve) => {
      // List of predetermined names (simulate database)
      const predeterminedNames = ['John', 'Alice', 'Bob', 'Eve'];
  
      // Check if the provided name exists in the list
      const isAvailable = !predeterminedNames.includes(name);
      resolve(isAvailable);
    });
  };
  
  /**
   * Simulates fetching location options.
   * @returns {Promise<string[]>} A promise that resolves to an array of location options.
   */
  export const getLocations = () => {
    return Promise.resolve(['Canada', 'China', 'USA', 'Brazil']);
  };
  