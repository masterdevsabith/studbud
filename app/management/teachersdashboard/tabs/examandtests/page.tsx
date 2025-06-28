import TeacherExam from "../../screens/Exam";
import TeacherSideBar from "../../widgets/TeacherSideBar";

export default function ExamAndTests() {
  return (
    <section className="w-full flex items-center justify-center h-screen overflow-hidden ">
      <TeacherSideBar />
      <TeacherExam />
    </section>
  );
}
