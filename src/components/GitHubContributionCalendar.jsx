function buildWeeks(contributions) {
  if (!contributions.length) return [];

  const firstDate = new Date(`${contributions[0].date}T12:00:00`);
  const padding = Array.from({ length: firstDate.getDay() }, () => null);
  const days = [...padding, ...contributions];
  while (days.length % 7 !== 0) days.push(null);

  return Array.from({ length: days.length / 7 }, (_, weekIndex) =>
    days.slice(weekIndex * 7, weekIndex * 7 + 7),
  );
}

function getContributionLevel(day) {
  if (Number.isInteger(day.level)) return Math.min(4, Math.max(0, day.level));
  if (!day.count) return 0;
  if (day.count < 4) return 1;
  if (day.count < 8) return 2;
  if (day.count < 12) return 3;
  return 4;
}

export function GitHubContributionCalendar({ contributions }) {
  const weeks = buildWeeks(contributions);
  const monthLabels = weeks.flatMap((week, index) => {
    const firstOfMonth = week.find((day) => day?.date.endsWith("-01"));
    if (!firstOfMonth) return [];

    const monthName = new Date(`${firstOfMonth.date}T12:00:00`).toLocaleString(
      "en",
      { month: "short" },
    );
    return [{ index, monthName }];
  });

  return (
    <div className="github-calendar-wrap">
      <div
        className="github-calendar-scroll"
        tabIndex={0}
        aria-label="Contribution calendar, scroll horizontally to see all weeks"
      >
        <div className="github-calendar-weekdays" aria-hidden="true">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="github-calendar-chart">
          <div
            className="github-calendar-months"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--calendar-cell))` }}
            aria-hidden="true"
          >
            {monthLabels.map(({ index, monthName }) => (
              <span key={`${index}-${monthName}`} style={{ gridColumn: index + 1 }}>
                {monthName}
              </span>
            ))}
          </div>
          <div
            className="github-calendar-grid"
            role="img"
            aria-label="GitHub contribution activity for the last year"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--calendar-cell))` }}
          >
            {weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <span
                  key={day?.date || `empty-${weekIndex}-${dayIndex}`}
                  className="github-calendar-cell"
                  data-level={day ? getContributionLevel(day) : "empty"}
                  title={
                    day
                      ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                      : undefined
                  }
                  aria-hidden="true"
                />
              )),
            )}
          </div>
        </div>
      </div>
      <div className="github-calendar-legend" aria-label="Contribution levels">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <i key={level} className="github-calendar-cell" data-level={level} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
