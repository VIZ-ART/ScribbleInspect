export const addObjectToLocalStorage = (name, data) => {
  // console.log(`User = ${user}`);
  localStorage.setItem(name, JSON.stringify(data));
};

export const removeObjectFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const getObjectFromLocalStorage = (name) => {
  const result = localStorage.getItem(name);
  // console.log(`Object = ${result}`);
  const item = result ? JSON.parse(result) : null;
  return item;
};
