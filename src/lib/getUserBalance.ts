export default async function getUserBalanceHistory() {
  const result = await fetch(
    "https://rmb-demo-back.onrender.com/api/v1/create/balance",
    {
      next: {
        revalidate: 10,
      },
    },
  );

  return result.json();
}

//  https://rmb-demo-back.onrender.com
