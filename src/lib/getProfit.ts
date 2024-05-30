export default async function getProfit() {
  const result = await fetch(
    "https://business-management-back-end.onrender.com/api/v1/main/profit",
    {
      next: {
        revalidate: 10,
      },
    },
  );

  return result.json();
}
