export const getDecodedToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const decoded = JSON.parse(atob(parts[1]));
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      console.warn("Token expirado");
      return null;
    }

    const { sub, name, rol, dni } = decoded;

    return {
      id: sub,
      name,
      rol,
      dni: dni || null,
    };
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
