import GreetingCard from "./GreetingsCard";
import Learning from "./Learnings";

export default function MainSection() {
  return (
    <div className="px-6 pt-4">
      <GreetingCard />
      <Learning />
    </div>
  );
}
