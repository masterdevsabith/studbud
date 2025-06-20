import { getSubdomain } from "@/lib/subdomain";
import { Metadata } from "next";
import { notFound } from "next/navigation";
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

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
  return (
    <section>
      <div>
        <h1>
          Hey {subdomain}.{rootDomain}
        </h1>
      </div>
    </section>
  );
}
