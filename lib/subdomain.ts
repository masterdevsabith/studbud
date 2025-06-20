import axios from "axios";

type Subdomain = {
  subdomain: string;
};
export async function getSubdomain(subdomain: string) {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9]/g, "");
  const baseUrl = process.env.APP_BASE_URL;
  const domain = sanitizedSubdomain;
  const response = await axios.get(
    `${baseUrl}/api/v1/getSubdomainList/${domain}`
  );
  return response.data[0]?.subdomain;
}

// export async function getAllSubdomains() {
//   const response = await fetch("http://localhost:8080/api/v1/getSubdomainList");
//   const { data } = await response.json();
//   return data;
// }
