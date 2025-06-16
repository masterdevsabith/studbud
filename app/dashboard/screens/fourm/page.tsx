import Forum from "../../widgets/Fourm";
import Sidebar from "../../widgets/Sidebar";
import Task from "../../widgets/Task";

export default function Homework() {
  return (
    <main className="flex h-screen w-full p-0 m-0 overflow-y-hidden">
      <div className="w-1/5 overflow-y-hidden">
        <Sidebar />
      </div>
      <div className="w-3/5 overflow-y-scroll">
        <Forum />
      </div>
      <div className="w-1/5 bg-gray-50 overflow-y-hidden">
        <Task />
      </div>
    </main>
  );
}
