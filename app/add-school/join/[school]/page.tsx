import axios from "axios";
import JoinLinkClient from "../../widgets/JoinLinkClient"; // import the client component

interface Props {
  params: {
    school: string;
  };
}

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const baseUrl = process.env.APP_BASE_URL;

export default async function JoinLink({ params }: Props) {
  const { school } = params;

  const response = await axios.get(
    `${baseUrl}/api/v1/getSubdomainList/${school}`
  );
  const adminData = response.data[0];

  const url = `http://${school}.${rootDomain}:${process.env.PORT}`;

  return <JoinLinkClient url={url} />;
}
