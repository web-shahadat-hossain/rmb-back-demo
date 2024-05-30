export default async function getRMB() {
  const result = await fetch(
    "https://business-management-back-end.onrender.com/api/v1/main/rmb",
    {
      next: {
        revalidate: 10,
      },
    },
  );

  return result.json();
}
