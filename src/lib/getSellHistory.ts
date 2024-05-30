export default async function getSellHistory() {
  const result = await fetch("https://rmb-demo-back.onrender.com/api/v1/sell", {
    next: {
      revalidate: 10,
    },
  });

  return result.json();
}
