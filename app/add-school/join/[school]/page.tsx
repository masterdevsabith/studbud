import axios from "axios";
import Link from "next/link";

interface Props {
  params: {
    school: string;
  };
}
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const baseUrl = process.env.APP_BASE_URL;

export default async function JoinLink(props: Props) {
  const { params } = props;
  const { school } = await params;

  const response = await axios.get(
    `${baseUrl}/api/v1/getSubdomainList/${school}`
  );
  const adminData = response.data[0];
  console.log(adminData);
  const url = `http://${school}.${rootDomain}:${process.env.PORT}`;
  return (
    <section className="bg-neutral-900 h-dvh flex items-center justify-center">
      <div>
        <h1 className="text-white text-xl font-semibold">
          <Link href={url} className="underline">
            {url}
          </Link>
        </h1>

        <h2 className="py-6 text-white text-lg font-medium">Your details</h2>

        <div className="space-y-1 text-white">
          <p>
            <strong>Name:</strong> {adminData.name}
          </p>
          <p>
            <strong>Email:</strong> {adminData.email}
          </p>
          <p>
            <strong>Phone:</strong> {adminData.phonenumber}
          </p>
          <p>
            <strong>Designation:</strong> {adminData.designation}
          </p>
          <p>
            <strong>Capacity:</strong> {adminData.capacity}
          </p>
        </div>
      </div>
    </section>
  );
}
