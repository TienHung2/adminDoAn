
export const saveItemToLocalStorage = (key, value) => {
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.log(`Cannot store item ${key} in localStorage: ${e.name}`);
      }
    } else {
        console.log(
        `Cannot store item ${key} in localStorage: does not support localStorage`,
      );
    }
    return false;
  };

  export const getItemFromLocalStorage = (key) => {
    if (window.localStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        console.log(`Cannot get item ${key} in localStorage: ${e.name}`);
      }
    } else {
        console.log(
        `Cannot store item ${key} in localStorage: does not support localStorage`,
      );
    }
    return null;
  };

  export const deleteItemFromLocalStorage = (key) => {
    if (window.localStorage) {
      try {
        window.localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.log(
          `Cannot delete item ${key} in localStorage: ${e.name}`,
        );
      }
    } else {
        console.log(
        `Cannot store item ${key} in localStorage: does not support localStorage`,
      );
    }
    return false;
  };