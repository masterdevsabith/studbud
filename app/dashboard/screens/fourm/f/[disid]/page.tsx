import DiscussionClient from "@/app/dashboard/widgets/DiscussionClient";

interface Props {
  params: {
    disid: string;
  };
}

export default async function ({ params }: Props) {
  const { disid } = params;
  return <DiscussionClient disid={disid} />;
}
