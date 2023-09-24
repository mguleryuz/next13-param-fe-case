import ClientCheckoutPage from "./client.page";

async function getAggrement() {
  const res = await fetch(
    "https://62f9ee323c4f110faa8ed350.mockapi.io/api/payment"
  );
  const data = await res.json();
  const decodedContent = decodeURIComponent(data.content);
  return decodedContent;
}

export default async function CheckoutPage() {
  const aggrement = await getAggrement();

  return <ClientCheckoutPage {...{ aggrement }} />;
}
