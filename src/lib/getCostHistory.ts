export default async function getCostHistory() {
  const result = await fetch(
    "https://business-management-back-end.onrender.com/api/v1/cost",
    {
      next: {
        revalidate: 10,
      },
    },
  );

  return result.json();
}
