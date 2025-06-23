import { MessageCircle } from "lucide-react";

export default function Chat() {
  return (
    <div className="fixed bottom-6 right-6 shadow shadow-sky-200 bg-black px-4 py-4 rounded-full">
      <div>
        <div className="fixed bottom-24 animate-bounce right-0 w-60">
          <span className=" bg-neutral-200 px-2 py-2 rounded-l-md rounded-tr-md">
            <code className="text-neutral-950">Ask me anything</code>
          </span>
        </div>
        <MessageCircle />
      </div>
    </div>
  );
}
