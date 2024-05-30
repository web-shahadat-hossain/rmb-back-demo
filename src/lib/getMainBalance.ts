export default async function getMainBalance() {
  const result = await fetch(
    "https://rmb-demo-back.onrender.com/api/v1/main/balance",
    {
      next: {
        revalidate: 10,
      },
    },
  );

  return result.json();
}
