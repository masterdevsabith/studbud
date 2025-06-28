import TeacherHomework from "../../screens/HomeWork";
import TeacherSideBar from "../../widgets/TeacherSideBar";

export default function HomeWork() {
  return (
    <section className="w-full flex items-center justify-center h-screen overflow-hidden ">
      <TeacherSideBar />
      <TeacherHomework />
    </section>
  );
}
