export default async function getBuyHistory() {
  const result = await fetch(
    "https://business-management-back-end.onrender.com/api/v1/buy",
    {
      next: {
        revalidate: 10,
      },
    },
  );

  return result.json();
}
