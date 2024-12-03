export default async function getUser() {
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      cache: "no-cache", // don't cache
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return fallback data if an error occurs
  }
}
