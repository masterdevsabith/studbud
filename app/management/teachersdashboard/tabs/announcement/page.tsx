import TeacherAnnouncement from "../../screens/Announcement";
import TeacherSideBar from "../../widgets/TeacherSideBar";

export default function announcement() {
  return (
    <section className="w-full flex items-center justify-center">
      <TeacherSideBar />
      <TeacherAnnouncement />
    </section>
  );
}
