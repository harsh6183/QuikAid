// app/how-it-works/page.tsx
import {
  ShieldCheck,
  MapPin,
  MessageCircle,
  Zap,
  ClipboardList,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "User Submits Report",
      icon: <ClipboardList className="h-6 w-6 text-blue-500" />,
      description:
        "The user fills out a report form with incident details, category, and optional image.",
    },
    {
      title: "Select Authority",
      icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
      description:
        "User chooses which authority to notify (Police, Hospital, etc).",
    },
    {
      title: "Location Captured",
      icon: <MapPin className="h-6 w-6 text-blue-500" />,
      description:
        "The system captures the user's location using Mapbox for accurate tracking.",
    },
    {
      title: "SMS Alert Sent",
      icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
      description:
        "An SMS is automatically sent to the selected authority containing report details and location.",
    },
    {
      title: "Admin Tracks Report",
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      description:
        "Admins view and manage reports from a secure dashboard, updating statuses in real time.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 items-center text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="mt-2 bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-4xl">
            <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              How the Website works?
            </span>
          </h1>

        <div className="mt-8 relative border-l border-neutral-800 pl-6 space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Circle marker */}
              <div className="absolute -left-[13px] top-1">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                  {index + 1}
                </div>
              </div>

              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow hover:border-blue-600 transition">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-neutral-800 p-2 rounded-lg">{step.icon}</div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-neutral-400 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
