import MainSection from "./screens/MainSection";
import TeacherSideBar from "./widgets/TeacherSideBar";

export default function TeachersDashboard() {
  return (
    <section className="w-full flex ">
      <div className=" ">
        <TeacherSideBar />
      </div>

      <MainSection />
    </section>
  );
}
