import React, { useMemo, useState } from "react";
import {
  Users,
  BookMarked,
  Star,
  MessageSquare,
  Target,
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  CalendarCheck,
  Trophy,
  ClipboardList,
  TimerReset,
  User,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

const classMetrics = [
  {
    title: "Active Classes",
    value: "6",
    change: "+1",
    label: "this semester",
    icon: Users,
    tone: "neutral",
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: "+0.3",
    label: "vs last term",
    icon: Star,
    tone: "positive",
  },
  {
    title: "AI Adoption",
    value: "87%",
    change: "+11%",
    label: "students using recommendations",
    icon: Sparkles,
    tone: "positive",
  },
  {
    title: "Feedback Response",
    value: "3 hrs",
    change: "-30m",
    label: "avg acknowledgement time",
    icon: MessageSquare,
    tone: "positive",
  },
];

const engagementData = [
  {
    course: "ML Foundations",
    attendance: 92,
    assignments: 88,
    satisfaction: 4.7,
  },
  {
    course: "Educational Psychology",
    attendance: 89,
    assignments: 82,
    satisfaction: 4.6,
  },
  {
    course: "Data Visualization",
    attendance: 94,
    assignments: 90,
    satisfaction: 4.9,
  },
  {
    course: "Learning Analytics",
    attendance: 87,
    assignments: 80,
    satisfaction: 4.5,
  },
];

const chartConfig = {
  attendance: { label: "Attendance %", color: "hsl(210 90% 55%)" },
  assignments: { label: "Assignment Completion %", color: "hsl(266 85% 62%)" },
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const teacherSuggestedPrompts = [
  "Help me personalise feedback for students who struggle with data storytelling.",
  "Give me three strategies to boost engagement in Machine Learning labs next week.",
  "How can I prepare students for the upcoming assessment based on current metrics?",
];

const studentHighlights = [
  {
    name: "Priya Sharma",
    course: "Machine Learning Foundations",
    progress: "Top 5% improvement in concept mastery",
    action: "Invite to mentor struggling peers during labs.",
  },
  {
    name: "Arjun Patel",
    course: "Educational Psychology",
    progress: "Consistent participation with insightful reflections",
    action: "Feature in upcoming pedagogy case study discussion.",
  },
  {
    name: "Sara Johnson",
    course: "Data Visualization Studio",
    progress: "Outstanding visual storytelling submissions",
    action: "Recommend for inter-department design sprint.",
  },
];

const feedbackStream = [
  {
    author: "Student Cohort A",
    sentiment: "positive",
    content:
      "Interactive lab sessions helped clarify neural network concepts. Keep the guided project walkthroughs!",
    time: "2 days ago",
  },
  {
    author: "Parent Outreach",
    sentiment: "neutral",
    content:
      "Appreciate the weekly summaries. Could we get advance notice for major assessment dates?",
    time: "3 days ago",
  },
  {
    author: "Student Cohort B",
    sentiment: "improve",
    content:
      "Friday Q&A hour is helpful, but we’d love more recorded micro-lessons on reinforcement learning.",
    time: "5 days ago",
  },
];

const teacherGoals = [
  {
    title: "Enhance Student Mentoring",
    status: "On Track",
    detail: "Launch peer-led coaching circles for capstone projects.",
  },
  {
    title: "Boost Assessment Adoption",
    status: "Planning",
    detail:
      "Introduce adaptive quizzes focused on higher-order thinking this month.",
  },
  {
    title: "Improve Course Materials",
    status: "In Progress",
    detail:
      "Update slides with interactive elements and real-time polling features.",
  },
];

const scheduleGlance = [
  {
    icon: CalendarCheck,
    title: "AI in Education Workshop",
    time: "Tomorrow • 10:00 AM",
    detail: "Facilitating hands-on session for faculty development.",
  },
  {
    icon: ClipboardList,
    title: "Semester Planning Sync",
    time: "Friday • 2:00 PM",
    detail: "Align curriculum milestones with departmental goals.",
  },
  {
    icon: TimerReset,
    title: "Performance Review",
    time: "Next Monday • 11:30 AM",
    detail: "Review personalized AI insights for Student Cohort B.",
  },
];

const TeacherPortal = () => {
  const { user } = useUser();
  const firstName = user?.firstName || "Teacher";
  const fullName =
    user?.fullName || `${firstName} ${user?.lastName ?? ""}`.trim();
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = "gemini-2.5-flash";

  const teacherContext = useMemo(() => {
    const metricsSummary = classMetrics
      .map((metric) => `${metric.title}: ${metric.value} (${metric.label})`)
      .join("\n");
    const engagementSummary = engagementData
      .map(
        (course) =>
          `${course.course} | Attendance: ${course.attendance}% | Assignments: ${course.assignments}% | Satisfaction: ${course.satisfaction}`
      )
      .join("\n");
    const highlightsSummary = studentHighlights
      .map(
        (highlight) =>
          `${highlight.name} (${highlight.course}): ${highlight.progress}. Action: ${highlight.action}`
      )
      .join("\n");
    const feedbackSummary = feedbackStream
      .map(
        (feedback) =>
          `${feedback.author} (${feedback.sentiment}): ${feedback.content}`
      )
      .join("\n");
    const goalsSummary = teacherGoals
      .map((goal) => `${goal.title} - ${goal.status}: ${goal.detail}`)
      .join("\n");

    return `Teacher name: ${fullName || "Unnamed"}
Key metrics:
${metricsSummary}

Class engagement data:
${engagementSummary}

Student highlights:
${highlightsSummary}

Recent feedback and insights:
${feedbackSummary}

Current growth objectives:
${goalsSummary}`.trim();
  }, [fullName]);

  const systemPrompt = useMemo(
    () =>
      `You are EduVision AI Coach, an insightful assistant for educators. Craft responses that reference classroom analytics, student highlights, and goals provided in the context. Offer actionable strategies, tie them to concrete metrics when possible, and conclude with an uplifting suggestion.

Teacher Context:
${teacherContext}`,
    [teacherContext]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your EduVision AI coach. Ask me about enhancing classroom impact, refining feedback, or planning next steps using your latest analytics.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendToGemini = async (userMessage: string) => {
    if (!geminiApiKey) {
      throw new Error(
        "Gemini API key is missing. Add VITE_GEMINI_API_KEY to your environment."
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

    const historyPayload = messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        ...historyPayload,
        {
          role: "user",
          parts: [
            {
              text: `Teacher question: ${userMessage}

Respond with specific recommendations that align to the provided metrics and objectives. Always suggest a concrete next step.`,
            },
          ],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Failed to generate AI response.");
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I couldn’t generate a response. Please try again.";

    setMessages((prev) => [...prev, { role: "assistant", content: text }]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setQuestion("");
    setError(null);
    setLoading(true);

    try {
      await sendToGemini(trimmed);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I ran into a problem generating advice. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setQuestion(prompt);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 pb-16 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-purple-200">
                Teacher Portal
              </p>
              <h1 className="mt-3 text-4xl font-bold lg:text-5xl">
                Welcome back, {firstName}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200">
                Monitor class performance, view real-time feedback, and leverage
                AI-driven insights to build transformative learning experiences.
              </p>
            </div>
            <div className="flex items-center gap-4 self-end rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <div className="text-right">
                <p className="text-sm text-slate-200">Signed in as</p>
                <p className="font-semibold">
                  {user?.fullName ||
                    `${firstName} ${user?.lastName ?? ""}`.trim()}
                </p>
              </div>
              <UserButton afterSignOutUrl="/" showName={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto -mt-10 space-y-12 px-4 pb-20">
        <section className="grid gap-6 xl:grid-cols-4">
          {classMetrics.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-slate-900/90 p-2 text-white shadow-inner">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      card.tone === "positive"
                        ? "text-emerald-500"
                        : card.tone === "negative"
                        ? "text-rose-500"
                        : "text-purple-400"
                    )}
                  >
                    {card.change}
                  </span>
                </div>
                <h3 className="mt-6 text-sm font-medium text-slate-500">
                  {card.title}
                </h3>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{card.label}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Class Engagement Overview
                </h2>
                <p className="text-sm text-slate-500">
                  Compare attendance and assignment completion across cohorts.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ChartContainer config={chartConfig} className="h-80">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="course"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={16} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="attendance"
                    fill="var(--color-attendance)"
                    radius={[6, 6, 0, 0]}
                    barSize={22}
                  />
                  <Bar
                    dataKey="assignments"
                    fill="var(--color-assignments)"
                    radius={[6, 6, 0, 0]}
                    barSize={22}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-500/20 to-blue-500/10 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Target className="h-10 w-10 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Weekly Instruction Plan
                  </h3>
                  <p className="text-sm text-slate-600">
                    AI-curated focus areas to amplify classroom impact.
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <BookMarked className="mt-0.5 h-4 w-4 text-purple-500" />
                  Integrate case-based scenarios into the ML lab to reinforce
                  conceptual applications.
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="mt-0.5 h-4 w-4 text-purple-500" />
                  Share aggregated cohort analytics during Friday reflection
                  sessions.
                </li>
                <li className="flex items-start gap-2">
                  <Trophy className="mt-0.5 h-4 w-4 text-purple-500" />
                  Recognize top collaborative teams to sustain motivation.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Growth Objectives
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {teacherGoals.map((goal) => (
                  <li
                    key={goal.title}
                    className="rounded-xl border border-slate-100 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">{goal.title}</p>
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-500">
                        {goal.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">{goal.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Student Highlights
              </h3>
            </div>
            <div className="mt-4 space-y-4">
              {studentHighlights.map((highlight) => (
                <div
                  key={highlight.name}
                  className="rounded-xl border border-slate-100 p-4 transition hover:border-purple-200"
                >
                  <p className="text-sm uppercase tracking-wide text-purple-500">
                    {highlight.course}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {highlight.name}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {highlight.progress}
                  </p>
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Action: {highlight.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Recent Feedback & Insights
              </h3>
            </div>
            <div className="mt-4 space-y-4">
              {feedbackStream.map((feedback) => (
                <div
                  key={feedback.author}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      {feedback.author}
                    </p>
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wide",
                        feedback.sentiment === "positive"
                          ? "text-emerald-500"
                          : feedback.sentiment === "improve"
                          ? "text-rose-500"
                          : "text-slate-400"
                      )}
                    >
                      {feedback.sentiment === "improve"
                        ? "Needs Attention"
                        : feedback.sentiment === "positive"
                        ? "Positive"
                        : "Neutral"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    “{feedback.content}”
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{feedback.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                Talk to EduVision AI
              </h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Get coaching grounded in your class analytics, goals, and student
              highlights.
            </p>

            {!geminiApiKey && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                Gemini API key missing. Add{" "}
                <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">
                  VITE_GEMINI_API_KEY
                </code>{" "}
                to your environment to enable AI coaching.
              </div>
            )}

            <div className="mt-4">
              <div className="max-h-[500px] space-y-4 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={cn(
                      "flex items-start gap-3",
                      message.role === "user" && "flex-row-reverse"
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
                        message.role === "assistant"
                          ? "bg-gradient-to-br from-purple-500 to-purple-600"
                          : "bg-gradient-to-br from-blue-500 to-blue-600"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={cn(
                        "group relative max-w-[85%] rounded-2xl px-5 py-3 shadow-sm transition-all",
                        message.role === "assistant"
                          ? "rounded-tl-sm bg-white border border-slate-200 text-slate-800"
                          : "rounded-tr-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      )}
                    >
                      {/* Message Content with better formatting */}
                      <div
                        className={cn(
                          "prose prose-sm max-w-none",
                          message.role === "assistant"
                            ? "prose-slate"
                            : "prose-invert prose-headings:text-white prose-p:text-white/90 prose-strong:text-white"
                        )}
                      >
                        <p className="whitespace-pre-wrap break-words leading-relaxed">
                          {message.content.split("\n").map((line, i, arr) => {
                            // Handle bullet points
                            if (
                              line.trim().startsWith("- ") ||
                              line.trim().startsWith("• ")
                            ) {
                              return (
                                <span key={i} className="block pl-4">
                                  <span className="mr-2">•</span>
                                  {line.replace(/^[-•]\s*/, "")}
                                </span>
                              );
                            }
                            // Handle numbered lists
                            if (/^\d+\.\s/.test(line.trim())) {
                              return (
                                <span key={i} className="block pl-4">
                                  {line}
                                </span>
                              );
                            }
                            // Regular line
                            return (
                              <span key={i}>
                                {line || "\u00A0"}
                                {i < arr.length - 1 && <br />}
                              </span>
                            );
                          })}
                        </p>
                      </div>

                      {/* Decorative gradient overlay for assistant messages */}
                      {message.role === "assistant" && (
                        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-50/50 to-blue-50/30 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-sm">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 px-5 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.3s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-sm">
                  <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-rose-200 flex items-center justify-center">
                    <span className="text-xs font-bold">!</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Error</p>
                    <p className="mt-1 text-xs text-rose-600 break-words">
                      {error.length > 200
                        ? `${error.substring(0, 200)}...`
                        : error}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <label className="sr-only" htmlFor="teacher-ai-question">
                  Ask the AI coach
                </label>
                <input
                  id="teacher-ai-question"
                  type="text"
                  placeholder="E.g. Recommend strategies to improve peer collaboration..."
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  disabled={!geminiApiKey || loading}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                  disabled={
                    !geminiApiKey || loading || question.trim().length === 0
                  }
                >
                  {loading ? (
                    "Coaching..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Ask Coach
                    </>
                  )}
                </button>
              </form>

              <div className="flex flex-wrap gap-2">
                {teacherSuggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handlePromptClick(prompt)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                    disabled={!geminiApiKey || loading}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-400">
                EduVision AI uses your latest metrics and goals. Responses stay
                private to your account.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h4 className="text-sm font-semibold text-slate-900">
                Upcoming Focus
              </h4>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                {scheduleGlance.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <item.icon className="mt-1 h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-purple-500">
                        {item.time}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherPortal;
