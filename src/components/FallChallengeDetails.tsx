export const fallChallengePoints = [
  "Virtual, self-paced format to fit your schedule and any fitness level. Workouts programmed by Erin Murphy, PT, DPT on an easy-to-use app.",
  "3 days/week strength, 30–45 minutes, with shorter streamlined workout suggestions as needed.",
  "2 days/week mobility and focused core connection.",
  "Plus bonus educational content, accountability, encouragement, and support.",
];

export default function FallChallengeDetails() {
  return (
    <ul className="space-y-3 font-inter text-olive/80">
      {fallChallengePoints.map((point) => (
        <li key={point} className="flex items-start gap-3">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"
            aria-hidden="true"
          />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
