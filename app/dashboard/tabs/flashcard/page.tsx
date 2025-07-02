import FlashCards from "../../widgets/FlashCards";
import Sidebar from "../../widgets/Sidebar";
import Task from "../../widgets/Task";

export default function Homework() {
  return (
    <main className="flex h-screen w-full p-0 m-0 overflow-y-hidden">
      <div className="overflow-y-hidden">
        <Sidebar />
      </div>
      <div className="w-full overflow-y-scroll scrollbar-hide">
        <FlashCards />
      </div>
    </main>
  );
}
