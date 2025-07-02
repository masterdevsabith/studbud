import CreateAbsentee from "../../widgets/CreateAbsente";
import TeacherSideBar from "../../widgets/TeacherSideBar";

export default function MarkAttendance() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="">
        <TeacherSideBar />
      </div>
      <CreateAbsentee />
    </section>
  );
}
