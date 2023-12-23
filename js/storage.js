class LocalStorageHandler {
  // Get data from local storage
  static get(key) {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error("Error getting data from local storage:", error);
      return null;
    }
  }

  // Set data in local storage
  static set(key, data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error("Error setting data in local storage:", error);
    }
  }

  // Remove data from local storage
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from local storage:", error);
    }
  }
}
