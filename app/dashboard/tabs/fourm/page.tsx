import Forum from "../../widgets/Fourm";
import Sidebar from "../../widgets/Sidebar";

export default function Homework() {
  return (
    <main className="flex h-screen w-full p-0 m-0 overflow-y-hidden">
      <div className="w-1/5 overflow-y-hidden">
        <Sidebar />
      </div>
      <div className="w-full overflow-y-scroll scrollbar-hide">
        <Forum />
      </div>
    </main>
  );
}
