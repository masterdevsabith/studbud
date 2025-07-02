import CreateMeeting from "../../widgets/CreateMeeting";
import TeacherSideBar from "../../widgets/TeacherSideBar";

export default function Meeting() {
  return (
    <section className="w-full flex items-center justify-center overflow-hidden">
      <div className="">
        <TeacherSideBar />
      </div>
      <CreateMeeting />
    </section>
  );
}
