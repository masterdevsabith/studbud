import { getSubdomain } from "@/lib/subdomain";
import { Metadata } from "next";
import { notFound } from "next/navigation";
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
import Login from "./auth/Login";

export async function generateMetadata({
  params,
}: {
  params: { subdomain: string };
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomain(subdomain);
  console.log(subdomainData);
  if (!subdomainData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`,
  };
}

export default async function subdomainPage({
  params,
}: {
  params: { subdomain: string };
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomain(subdomain);

  if (!subdomainData) {
    notFound();
  }
  return <Login />;
}
