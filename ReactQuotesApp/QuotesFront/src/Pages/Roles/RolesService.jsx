export const getRoles = async () => {
  try {
    const response = await fetch("https://localhost:7099/api/Roles");
    const roles = await response.json();
    return roles;
  } catch (e) {
    console.error(e);
  }
};