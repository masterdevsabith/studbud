"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import Link from "next/link";

export default function JoinLinkClient({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="h-dvh bg-gradient-to-br from-sky-950 to-neutral-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl px-10 py-8 w-full max-w-xl text-white">
        <h2 className="text-center text-2xl font-bold mb-4">
          🎓 Your School Portal is Ready
        </h2>
        <p className="text-center text-neutral-300 mb-6">
          Copy and share the link below to access your school’s dashboard.
        </p>

        <div className="flex items-center justify-between gap-3 bg-neutral-800 rounded-xl px-4 py-3">
          <code className="text-sky-400 break-all">{url}</code>
          <button
            onClick={handleCopy}
            className="text-white hover:text-sky-300 transition"
            title="Copy to clipboard"
          >
            <Copy />
          </button>
        </div>

        {copied && (
          <p className="text-center text-green-400 mt-2 text-sm">
            Link copied!
          </p>
        )}

        <div className="text-center mt-6">
          <Link
            href={url}
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-xl transition shadow-md"
          >
            Visit Now
          </Link>
        </div>
      </div>
    </section>
  );
}
