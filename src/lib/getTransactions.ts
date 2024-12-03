export default async function getTransactions() {
  try {
    const response = await fetch("http://localhost:3000/api/transactions", {
      cache: "no-cache", // don't cache
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return null; // Return an empty array or fallback data if an error occurs
  }
}
