"use client";

export default function Home() {
  const handleNavigate = () => {
    window.open("/dashboard", "_self");
  };

  return (
    <main className="flex items-center justify-center h-dvh bg-neutral-900">
      <div>
        <h1 className="text-center text-3xl text-white">
          Navigate to{" "}
          <code className="bg-neutral-800 p-1 rounded-sm">/dashboard</code>
        </h1>
        <div className="flex items-center justify-center pt-6">
          <button
            className="px-6 py-2 rounded-xl bg-neutral-800 text-white border border-gray-300 cursor-pointer"
            onClick={handleNavigate}
          >
            <code>Navigate</code>
          </button>
        </div>
      </div>
    </main>
  );
}
