"use client";

import { useState } from "react";
import {
  Copy,
  ExternalLink,
  GraduationCap,
  User,
  PackageOpen,
  Mail,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function JoinLinkClient({ url }: { url: string }) {
  const [copiedLink, setCopiedLink] = useState<
    "student" | "teacher" | "message" | null
  >(null);

  const subdomain = url.replace(/^(?:https?:\/\/)?([^./]+)\..+$/, "$1");
  const teachersUrl = `${url}/s/${subdomain}/auth/teachers`;

  const shareMessage = `Dear Students,

Your school portal is now live!
You can access it here:
${url}

Please open the link in a browser and log in using your credentials. For any issues, contact your class teacher.

- School Admin`;

  const handleCopy = (
    type: "student" | "teacher" | "message",
    value: string
  ) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(null), 2000);
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-950 to-neutral-900 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-6 py-8 w-full max-w-2xl text-white space-y-6">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white">
          <GraduationCap size={28} />
          <h2>Your School Portal is Ready</h2>
        </div>

        <p className="text-center text-neutral-300">
          Copy and share the appropriate links below with students and teachers.
        </p>

        {/* Student Portal */}
        <div>
          <div className="flex items-center gap-2 mb-2 font-medium text-white">
            <User size={18} />
            <span>Student Portal</span>
          </div>
          <div className="bg-neutral-800 rounded-xl flex items-center justify-between px-4 py-3 overflow-x-auto">
            <code className="text-sky-400 break-all">{url}</code>
            <button
              onClick={() => handleCopy("student", url)}
              className="ml-4 text-white hover:text-sky-300 transition"
              title="Copy Student URL"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        {/* Teacher Portal */}
        <div>
          <div className="flex items-center gap-2 mb-2 font-medium text-white">
            <PackageOpen size={18} />
            <span>Teacher Portal</span>
          </div>
          <div className="bg-neutral-800 rounded-xl flex items-center justify-between px-4 py-3 overflow-x-auto">
            <code className="text-sky-400 break-all">{teachersUrl}</code>
            <button
              onClick={() => handleCopy("teacher", teachersUrl)}
              className="ml-4 text-white hover:text-sky-300 transition"
              title="Copy Teacher URL"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        {/* Shareable Message */}
        <div>
          <div className="flex items-center gap-2 mb-2 font-medium text-white">
            <Mail size={18} />
            <span>Message to Share with Students</span>
          </div>
          <div className="bg-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 whitespace-pre-wrap overflow-auto max-h-60">
            {shareMessage}
          </div>
          <button
            onClick={() => handleCopy("message", shareMessage)}
            className="mt-2 text-white hover:text-sky-300 text-sm flex items-center gap-1"
            title="Copy Message"
          >
            <Copy size={16} />
            Copy Message
          </button>
        </div>

        {/* Copied Feedback */}
        {copiedLink && (
          <p className="text-center text-green-400 text-sm flex justify-center items-center gap-1">
            <Check size={14} />
            {copiedLink === "student"
              ? "Student link copied!"
              : copiedLink === "teacher"
              ? "Teacher link copied!"
              : "Message copied!"}
          </p>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            href={url}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-xl transition shadow-lg"
          >
            Visit Student Portal <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
