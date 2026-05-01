type Persona = "student" | "teacher";

const includesAny = (text: string, keywords: string[]) =>
  keywords.some((keyword) => text.includes(keyword));

const formatList = (items: string[]) =>
  items.map((item, index) => `${index + 1}. ${item}`).join("\n");

export const getFakeStudentMentorResponse = (question: string) => {
  const text = question.toLowerCase();

  if (includesAny(text, ["machine", "ml", "midterm", "score", "exam"])) {
    return `Based on your Machine Learning Foundations progress, your strongest move is to protect the next 7 days for focused revision.

${formatList([
  "Spend 30 minutes today revising gradient boosting and model evaluation because that is your listed focus area.",
  "Use two short active-recall sessions before the capstone review on Thursday at 4:00 PM.",
  "Turn one weak concept into a peer-study question so you can test whether you can explain it simply.",
])}

Expected impact: if you keep attendance near 96% and finish the capstone milestone on time, you should stay on track for an 88-90% academic score.`;
  }

  if (includesAny(text, ["deadline", "time", "balance", "plan", "schedule"])) {
    return `Your current workload has three near-term deadlines, so use a priority plan instead of studying everything equally.

${formatList([
  "Today: finish the Machine Learning capstone review notes first because it is the closest milestone.",
  "Tomorrow: draft the Educational Psychology reflection essay and add classroom observation notes.",
  "Weekend: polish the Data Visualization storyboard and check accessibility before peer feedback.",
])}

Keep each block to 45 minutes with a 10-minute reset. That gives you progress without overloading your week.`;
  }

  if (includesAny(text, ["participation", "psychology", "class", "discussion"])) {
    return `For Educational Psychology, the fastest improvement is preparation before class, not speaking more randomly.

${formatList([
  "Prepare one discussion question from the assigned reading before every lecture.",
  "Connect one idea to your practicum or classroom observation notes.",
  "After class, write a 3-line reflection so the next essay becomes easier.",
])}

This directly addresses the feedback asking you to elaborate on behaviorist frameworks.`;
  }

  if (includesAny(text, ["attendance", "absent", "attend"])) {
    return `Your attendance is already strong at 94%, with some courses reaching 96%. The goal is maintenance, not emergency recovery.

${formatList([
  "Keep the 30-day attendance streak by avoiding low-value schedule conflicts.",
  "Use missed-session notes only as backup, not as a replacement for labs or discussions.",
  "Pair each class with a 10-minute same-day recap to convert attendance into performance gains.",
])}`;
  }

  return `Here is a personalized action plan from your current EduVision profile:

${formatList([
  "Keep Machine Learning Foundations as the top academic priority because the capstone review is closest.",
  "Use Educational Psychology participation as your growth lever by preparing one question before each lecture.",
  "Reserve one focused block for Data Visualization accessibility and narrative polish.",
])}

Your metrics are healthy: 94% attendance, 88% academic growth, and 18 of 20 assignments complete. The next step is consistency, not a major strategy change.`;
};

export const getFakeTeacherCoachResponse = (question: string) => {
  const text = question.toLowerCase();

  if (includesAny(text, ["feedback", "personalise", "personalize", "struggle"])) {
    return `Use a three-part feedback pattern for students who struggle with data storytelling:

${formatList([
  "Start with one specific strength, such as chart selection or narrative structure.",
  "Name one improvement target, such as reducing visual clutter or clarifying the insight before the chart.",
  "Give one next action: revise the dashboard title, add an annotation, or test the color palette for accessibility.",
])}

For this cohort, prioritize Sara Johnson as an example model and pair her rubric with two anonymized before-and-after submissions.`;
  }

  if (includesAny(text, ["engagement", "lab", "machine", "ml", "peer"])) {
    return `To lift engagement in Machine Learning labs, use the current 92% attendance as an advantage and shift the lab from passive completion to visible checkpoints.

${formatList([
  "Open with a 5-minute prediction task before students touch the model.",
  "Create peer pairs where high-growth students mentor one concept, not the whole assignment.",
  "Close with an exit ticket asking students to explain one model decision in plain language.",
])}

This should improve both assignment completion and confidence before the next assessment.`;
  }

  if (includesAny(text, ["assessment", "prepare", "quiz", "exam"])) {
    return `Your assessment prep should focus on the courses with lower completion: Educational Psychology at 82% and Learning Analytics at 80%.

${formatList([
  "Run a 12-question adaptive quiz at the start of the week.",
  "Group questions by misconception so review time is targeted.",
  "Send parents and students the major assessment dates one week early to address recent feedback.",
])}

Concrete next step: publish a short assessment readiness checklist before Friday's reflection session.`;
  }

  if (includesAny(text, ["parent", "notice", "communication"])) {
    return `The parent feedback is asking for predictability. Add a lightweight communication rhythm.

${formatList([
  "Send assessment dates at least 7 days in advance.",
  "Include one sentence on what students should revise first.",
  "Close with office-hour timing so parents know where support exists.",
])}

This improves trust without adding heavy admin work.`;
  }

  return `Here is a coaching recommendation based on your current class analytics:

${formatList([
  "Use ML Foundations as the flagship engagement class because attendance is already 92%.",
  "Target Educational Psychology and Learning Analytics for assignment completion support.",
  "Turn student highlights into peer-led examples so strong work becomes visible and reusable.",
])}

Your strongest next step is to run one structured feedback cycle this week and measure completion changes by course.`;
};

export const getFakeAiResponse = (persona: Persona, question: string) =>
  persona === "student"
    ? getFakeStudentMentorResponse(question)
    : getFakeTeacherCoachResponse(question);

export const getFakeCollegeEvaluation = (collegeInfo: {
  name?: string;
  type?: string;
  accreditation?: string;
  studentCount?: string;
}) => {
  const type = collegeInfo.type?.toLowerCase() || "";
  const accreditation = collegeInfo.accreditation?.toLowerCase() || "";
  const students = Number(collegeInfo.studentCount || 0);

  const infrastructureScore = type.includes("engineering") ? 8.4 : 8.1;
  const facultyScore = students > 3000 ? 8.6 : 9.0;
  const accreditationScore = accreditation.includes("naac") ? 9.1 : 8.2;
  const overallScore = Number(
    ((infrastructureScore + facultyScore + accreditationScore) / 3).toFixed(1)
  );

  return {
    overallScore,
    infrastructure: {
      score: infrastructureScore,
      status: infrastructureScore >= 8.3 ? "Excellent" : "Very Good",
    },
    faculty: {
      score: facultyScore,
      status: facultyScore >= 9 ? "Outstanding" : "Strong",
    },
    accreditation: {
      score: accreditationScore,
      status: accreditationScore >= 9 ? "Excellent" : "Documentation Review Needed",
    },
    recommendations: [
      type.includes("engineering")
        ? "Upgrade computer lab systems and publish equipment refresh timelines."
        : "Create a yearly infrastructure audit with classroom, library, and accessibility checkpoints.",
      students > 3000
        ? "Improve faculty-student mentoring ratios for large departments."
        : "Document faculty development sessions and map them to student outcomes.",
      accreditation.includes("naac")
        ? "Maintain accreditation evidence in one digital repository for faster review."
        : "Prepare a stronger accreditation evidence file with approvals, outcomes, and compliance records.",
      "Add student feedback summaries to the final institutional quality report.",
    ],
  };
};
