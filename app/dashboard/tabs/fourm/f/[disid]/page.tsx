import DiscussionClient from "@/app/dashboard/widgets/DiscussionClient";
import Sidebar from "@/app/dashboard/widgets/Sidebar";

interface Props {
  params: {
    disid: string;
  };
}

export default async function ({ params }: Props) {
  const { disid } = params;
  return (
    <main className="flex h-screen w-full p-0 m-0 overflow-y-hidden">
      <div className="w-1/5 overflow-y-hidden">
        <Sidebar />
      </div>
      <div className="w-full overflow-y-scroll scrollbar-hide">
        <DiscussionClient disid={disid} />
      </div>
    </main>
  );
}
