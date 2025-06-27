import GreetingCard from "./GreetingsCard";
import Learning from "./Learnings";

export default function MainSection() {
  return (
    <div className="w-full px-6 pt-4 overflow-y-hidden main-dark">
      <GreetingCard />
      <Learning />
    </div>
  );
}
