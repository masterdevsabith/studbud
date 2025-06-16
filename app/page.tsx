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
        <div>
          <h2 className="text-center text-xl text-white py-8">Current task</h2>
          <div>
            <code className="text-cyan-600">
              """" Niya """" :{" "}
              <span className="text-red-600">
                """" Code Hero section and navbar ==&gt; Edit the files in{" "}
                <code className="bg-neutral-800 p-1 rounded-sm text-fuchsia-600">
                  /app/components/Hero.tsx
                </code>{" "}
                &{" "}
                <code className="bg-neutral-800 p-1 rounded-sm text-fuchsia-600">
                  /app/components/includes/navar.tsx
                </code>{" "}
                """
              </span>
            </code>

            <br />

            <br />
            <code className="text-cyan-600">
              """" Niya """" :{" "}
              <span className="text-red-600">
                """" Remove the codes in{" "}
                <code className="bg-neutral-800 p-1 rounded-sm text-fuchsia-600">
                  /app/page.tsx
                </code>{" "}
                Then import{" "}
                <code className="bg-neutral-800 p-1 rounded-sm text-fuchsia-600">
                  /app/components/Hero.tsx
                </code>{" "}
                &{" "}
                <code className="bg-neutral-800 p-1 rounded-sm text-fuchsia-600">
                  /app/components/includes/navar.tsx
                </code>{" "}
                in this page """
              </span>
            </code>

            <br />

            <br />
            <code className="text-cyan-600">
              """" Niya """" :{" "}
              <span className="text-red-600">
                """" UI of Navbar and Hero section can be found in{" "}
                <code className="bg-neutral-800 p-1 rounded-sm text-fuchsia-600">
                  /public/assets
                </code>{" "}
                """
              </span>
            </code>
          </div>
        </div>
      </div>
    </main>
  );
}
