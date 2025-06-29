import MainSection from "./screens/MainSection";
import TeacherSideBar from "./widgets/TeacherSideBar";

export default function TeachersDashboard() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-80">
        <TeacherSideBar />
      </div>
      <MainSection />
    </section>
  );
}
