export const SubFinder = () => {
  if (typeof window === "undefined") return null;

  const hostname = window.location.hostname;

  const parts = hostname.split(".");

  let subdomain = "";

  if (parts.length > 2) {
    subdomain[0];
  }
  return subdomain;
};
