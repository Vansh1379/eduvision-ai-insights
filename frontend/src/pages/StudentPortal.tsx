import React, { useMemo, useState } from "react";
import {
  CalendarCheck,
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  GraduationCap,
  Clock,
  MessageCircle,
  CheckCircle2,
  Bot,
  Send,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

const overviewCards = [
  {
    title: "Overall Attendance",
    value: "94%",
    change: "+2.1%",
    changeLabel: "vs last month",
    icon: CalendarCheck,
    tone: "positive",
  },
  {
    title: "Academic Growth",
    value: "88%",
    change: "+6.4%",
    changeLabel: "semester improvement",
    icon: TrendingUp,
    tone: "positive",
  },
  {
    title: "AI Engagement Score",
    value: "92",
    change: "+1.8",
    changeLabel: "higher than peers",
    icon: Sparkles,
    tone: "neutral",
  },
  {
    title: "Completed Assignments",
    value: "18 / 20",
    change: "On Track",
    changeLabel: "keep momentum",
    icon: CheckCircle2,
    tone: "neutral",
  },
];

const performanceTrend = [
  { month: "Jan", attendance: 92, performance: 76 },
  { month: "Feb", attendance: 94, performance: 78 },
  { month: "Mar", attendance: 95, performance: 81 },
  { month: "Apr", attendance: 93, performance: 83 },
  { month: "May", attendance: 96, performance: 85 },
  { month: "Jun", attendance: 97, performance: 88 },
];

const chartConfig = {
  attendance: {
    label: "Attendance %",
    color: "hsl(210, 100%, 60%)",
  },
  performance: {
    label: "Academic Score",
    color: "hsl(266, 90%, 68%)",
  },
};

const courseProgress = [
  {
    course: "Machine Learning Foundations",
    faculty: "Dr. Priya Nair",
    completion: 82,
    attendance: 96,
    upcoming: "Project review in 3 days",
    focus: "Revise gradient boosting concepts.",
  },
  {
    course: "Educational Psychology",
    faculty: "Prof. Michael Chen",
    completion: 74,
    attendance: 91,
    upcoming: "Reflection essay due Friday",
    focus: "Incorporate classroom observation notes.",
  },
  {
    course: "Data Visualization Studio",
    faculty: "Dr. Aiden Clarke",
    completion: 68,
    attendance: 88,
    upcoming: "Final dashboard submission next week",
    focus: "Polish narrative flow and accessibility.",
  },
];

const aiSuggestions = [
  {
    title: "Boost Concept Retention",
    description:
      "Revisit chapters 4-6 of Machine Learning Foundations. Interactive quizzes improved score by 12% last month.",
    action: "Schedule two 30-minute spaced reviews this week.",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    title: "Improve Class Participation",
    description:
      "Participation dropped in Educational Psychology. Prepare one discussion question per lecture.",
    action: "Share insights from recent practicum observations.",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    title: "Strengthen Presentation Skills",
    description:
      "Feedback highlights opportunities to simplify technical explanations when presenting data stories.",
    action: "Join the Friday workshop on storytelling with visuals.",
    color: "from-emerald-500/20 to-emerald-600/10",
  },
];

const upcomingDeadlines = [
  {
    course: "Machine Learning Foundations",
    item: "Capstone project milestone review",
    due: "Thursday, 4:00 PM",
  },
  {
    course: "Educational Psychology",
    item: "Reflective essay submission",
    due: "Friday, 11:59 PM",
  },
  {
    course: "Data Visualization Studio",
    item: "Storyboard peer feedback",
    due: "Next Monday, 2:00 PM",
  },
];

const teacherFeedback = [
  {
    course: "Educational Psychology",
    teacher: "Prof. Michael Chen",
    message:
      "Insightful connections between theory and fieldwork. Elaborate on behaviorist frameworks in your next reflection.",
    time: "2 days ago",
  },
  {
    course: "Data Visualization Studio",
    teacher: "Dr. Aiden Clarke",
    message:
      "Great narrative structure. Consider integrating accessibility guidelines in your dashboard color palette.",
    time: "4 days ago",
  },
];

const growthMilestones = [
  {
    title: "AI Mentor Milestone",
    detail: "Completed 12 personalized learning paths with 90% satisfaction",
  },
  {
    title: "Peer Collaboration",
    detail: "Facilitated 4 study groups that improved collective scores by 8%",
  },
  {
    title: "Attendance Streak",
    detail: "Maintained 30-day perfect attendance record",
  },
];

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestedPrompts = [
  "Create a two-week plan to raise my Machine Learning Foundations score.",
  "How can I balance deadlines with personal study time this month?",
  "Suggest ways to improve my class participation for Educational Psychology.",
];

const StudentPortal = () => {
  const { user } = useUser();
  const firstName = user?.firstName || "Student";
  const fullName =
    user?.fullName || `${firstName} ${user?.lastName ?? ""}`.trim();
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = "gemini-1.5-flash-latest";

  const studentContext = useMemo(() => {
    const overviewSummary = overviewCards
      .map((card) => `${card.title}: ${card.value} (${card.changeLabel})`)
      .join("\n");
    const courseSummary = courseProgress
      .map(
        (course) =>
          `${course.course} | Completion: ${course.completion}% | Attendance: ${course.attendance}% | Next: ${course.upcoming} | Focus: ${course.focus}`
      )
      .join("\n");
    const deadlinesSummary = upcomingDeadlines
      .map((deadline) => `${deadline.course}: ${deadline.item} (${deadline.due})`)
      .join("\n");
    const feedbackSummary = teacherFeedback
      .map(
        (feedback) =>
          `${feedback.teacher} on ${feedback.course}: ${feedback.message}`
      )
      .join("\n");

    return `Student name: ${fullName || "Unnamed"}
Attendance & performance metrics:
${overviewSummary}

Course progress details:
${courseSummary}

Upcoming deadlines:
${deadlinesSummary}

Recent faculty feedback:
${feedbackSummary}`.trim();
  }, [fullName]);

  const systemPrompt = useMemo(
    () =>
      `You are EduVision AI Mentor, an educational coach who crafts personalized, motivating, and actionable guidance for students.
Use the student-specific context below to ground every response. Provide clear next steps, reference exact scores or deadlines when helpful, and end with an encouraging takeaway.

Student Context:
${studentContext}`,
    [studentContext]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your EduVision AI mentor. Ask me anything about improving your performance, planning studies, or making the most of upcoming deadlines.",
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
              text: `Student question: ${userMessage}

Remember to tailor your answer with the provided student context. If you reference metrics or deadlines, reiterate how the student can act on them.`,
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
            "I ran into an issue generating a response. Please try again in a moment.",
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
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 pb-16 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-blue-200">
                Student Portal
              </p>
              <h1 className="mt-3 text-4xl font-bold lg:text-5xl">
                Welcome back, {firstName}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200">
                Track your academic journey, attendance insights, and AI-powered
                recommendations tailored to keep you ahead of your goals.
              </p>
            </div>
            <div className="flex items-center gap-4 self-end rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
              <div className="text-right">
                <p className="text-sm text-slate-200">Signed in as</p>
                <p className="font-semibold">
                  {user?.fullName || `${firstName} ${user?.lastName ?? ""}`.trim()}
                </p>
              </div>
              <UserButton afterSignOutUrl="/" showName={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto -mt-10 space-y-12 px-4 pb-20">
        <section className="grid gap-6 lg:grid-cols-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
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
                        : "text-blue-500"
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
                <p className="mt-2 text-sm text-slate-500">{card.changeLabel}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Growth & Attendance Trends
                </h2>
                <p className="text-sm text-slate-500">
                  Weekly tracker combining academic performance with attendance
                  consistency.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ChartContainer config={chartConfig} className="h-72">
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    tickMargin={16}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number, name: string) => [
                      `${value}${name === "attendance" ? "%" : ""}`,
                      chartConfig[name as keyof typeof chartConfig]?.label,
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="var(--color-attendance)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="var(--color-performance)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-500/20 to-purple-500/10 p-6 text-slate-900 shadow-sm">
              <div className="flex items-center gap-3">
                <Target className="h-10 w-10 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Weekly Success Plan
                  </h3>
                  <p className="text-sm text-slate-600">
                    AI-generated milestones tailored to your semester goals.
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <BookOpen className="mt-0.5 h-4 w-4 text-blue-500" />
                  Complete 3 concept recaps in Machine Learning Foundations.
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-blue-500" />
                  Attend peer study circle on Saturday for Educational Psychology.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-blue-500" />
                  Submit updated data storytelling outline before Sunday.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Growth Milestones
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {growthMilestones.map((milestone) => (
                  <li
                    key={milestone.title}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 p-3"
                  >
                    <GraduationCap className="mt-0.5 h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-slate-900">
                        {milestone.title}
                      </p>
                      <p>{milestone.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {aiSuggestions.map((suggestion) => (
            <div
              key={suggestion.title}
              className={cn(
                "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
                `bg-gradient-to-br ${suggestion.color}`
              )}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  {suggestion.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                {suggestion.description}
              </p>
              <div className="mt-4 rounded-xl bg-white/60 p-3 text-sm text-slate-600 shadow-inner">
                <span className="font-medium text-slate-900">
                  Recommended action:
                </span>{" "}
                {suggestion.action}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Course Progress
                </h2>
                <p className="text-sm text-slate-500">
                  Keep an eye on completion, attendance, and immediate focus
                  areas.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              {courseProgress.map((course) => (
                <div
                  key={course.course}
                  className="rounded-xl border border-slate-100 p-5 transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {course.course}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {course.faculty}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                      Attendance {course.attendance}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>Completion</span>
                      <span>{course.completion}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-medium text-slate-900">
                      Next milestone:
                    </p>
                    <p>{course.upcoming}</p>
                    <p className="mt-2 text-slate-500">
                      Focus: {course.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Bot className="h-6 w-6 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Talk to EduVision AI
                  </h3>
                  <p className="text-sm text-slate-500">
                    Get tailored strategies grounded in your attendance, grades, and feedback.
                  </p>
                </div>
              </div>

              {!geminiApiKey && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                  Gemini API key missing. Add{" "}
                  <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">
                    VITE_GEMINI_API_KEY
                  </code>{" "}
                  to your environment to enable AI coaching.
                </div>
              )}

              <div className="mt-5 space-y-4">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={cn(
                        "rounded-2xl border p-4 text-sm leading-relaxed shadow-sm",
                        message.role === "assistant"
                          ? "border-purple-100 bg-purple-50 text-slate-700"
                          : "ml-auto w-fit max-w-xl border-blue-100 bg-blue-50 text-slate-700"
                      )}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <label className="sr-only" htmlFor="ai-question">
                    Ask the AI mentor
                  </label>
                  <input
                    id="ai-question"
                    type="text"
                    placeholder="E.g. Help me prepare for the ML midterm..."
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                      "Thinking..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Ask Mentor
                      </>
                    )}
                  </button>
                </form>

                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handlePromptClick(prompt)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      disabled={!geminiApiKey || loading}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-slate-400">
                  EduVision AI keeps your data private. Answers are generated
                  from your latest attendance, progress, and feedback
                  information.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-500" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Upcoming Deadlines
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {upcomingDeadlines.map((deadline) => (
                  <li
                    key={deadline.item}
                    className="rounded-xl border border-slate-100 p-3"
                  >
                    <p className="font-semibold text-slate-900">
                      {deadline.course}
                    </p>
                    <p>{deadline.item}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-blue-500">
                      {deadline.due}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-slate-500" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Faculty Feedback
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                {teacherFeedback.map((feedback) => (
                  <div
                    key={`${feedback.course}-${feedback.teacher}`}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {feedback.course}
                        </p>
                        <p className="text-sm text-slate-500">
                          {feedback.teacher}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">
                        {feedback.time}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      “{feedback.message}”
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentPortal;

