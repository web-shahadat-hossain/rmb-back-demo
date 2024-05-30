export default async function getUserBalanceHistory() {
  const result = await fetch(
    "https://business-management-back-end.onrender.com/api/v1/create/balance",
    {
      next: {
        revalidate: 10,
      },
    },
  );

  return result.json();
}

//  https://business-management-back-end.onrender.com
