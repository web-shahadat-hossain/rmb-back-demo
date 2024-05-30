export const getCases = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/cases", {
      next: {
        revalidate: 10, // Revalidate the cache every 10 seconds
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cases");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading cases:", error);
    return null; // Return null or appropriate fallback value
  }
};
