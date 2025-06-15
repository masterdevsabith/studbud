import MainSection from "./widgets/MainSection";
import Sidebar from "./widgets/Sidebar";
import Task from "./widgets/Task";

export default function DashboardPage() {
  return (
    <main className="h-screen overflow-y-hidden">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-2/3">
        <MainSection />
      </div>
      <div className="w-1/5 ">
        <Task />
      </div>
    </main>
  );
}
