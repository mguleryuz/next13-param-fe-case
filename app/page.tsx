import HomePageClient from "./client.page";
import type { PackageProps } from "./components/Package";

async function fetchPackages(): Promise<PackageProps[]> {
  const res = await fetch(
    "https://62f9ee323c4f110faa8ed350.mockapi.io/api/packages"
  );

  if (!res.ok) throw new Error("Error Fetching Packages");
  return await res.json();
}

export default async function HomePage() {
  const packages = await fetchPackages();

  return <HomePageClient packages={packages} />;
}
