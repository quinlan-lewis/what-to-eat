import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Saves data to AsyncStorage.
 * @param key - The key under which the data is stored.
 * @param value - The value to be stored (must be serializable to JSON).
 */
export const saveData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Data saved under key "${key}"`);
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
    throw error; // Rethrow the error for external handling
  }
};

/**
 * Retrieves data from AsyncStorage.
 * @param key - The key of the data to retrieve.
 * @returns The parsed data or `null` if the key doesn't exist.
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error reading data for key "${key}":`, error);
    throw error;
  }
};

/**
 * Updates data in AsyncStorage.
 * @param key - The key of the data to update.
 * @param updateFn - A function that takes the current value and returns the updated value.
 */
export const updateData = async <T>(
  key: string,
  updateFn: (currentValue: T | null) => T
): Promise<void> => {
  try {
    const currentValue = await getData<T>(key);
    const updatedValue = updateFn(currentValue);
    await saveData(key, updatedValue);
  } catch (error) {
    console.error(`Error updating data for key "${key}":`, error);
    throw error;
  }
};

/**
 * Deletes data from AsyncStorage.
 * @param key - The key of the data to delete.
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data removed for key "${key}"`);
  } catch (error) {
    console.error(`Error removing data for key "${key}":`, error);
    throw error;
  }
};
