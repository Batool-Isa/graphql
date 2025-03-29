import { useQuery } from "@apollo/client";
import { GET_USER_SKILLS } from "./Profile";

const formatSkillType = (type) =>
  type.replace("skill_", "").replace("-", " ").toUpperCase();

const SkillChart = () => {
  const { loading, error, data } = useQuery(GET_USER_SKILLS);

  if (loading) return <p className="text-center mt-4">Loading skills...</p>;
  if (error) return <p className="text-center text-danger">Error: {error.message}</p>;

  const skills = data?.user?.[0]?.transactions || [];
  const total = skills.reduce((sum, skill) => sum + skill.amount, 0);

  const barWidth = 60;
  const gap = 30;
  const maxBarHeight = 200;
  const svgWidth = skills.length * (barWidth + gap) + 100;
  const svgHeight = 300;
  const xStart = 50;
  const yBase = svgHeight - 50;

  const yTicks = 5; 
  const maxPercent = 100;

  return (
    <div className="container mt-4">
      <div
        className="card shadow-lg p-4"
        style={{ backgroundColor: "#DCD7C9", borderRadius: "15px" }}
      >
        <h3 className="text-center text-dark mb-3">Skills</h3>

        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          {[...Array(yTicks + 1)].map((_, i) => {
            const yValue = (maxPercent / yTicks) * i;
            const yPos = yBase - (yValue / maxPercent) * maxBarHeight;
            return (
              <g key={i}>
                <line
                  x1={xStart}
                  y1={yPos}
                  x2={svgWidth - 20}
                  y2={yPos}
                  stroke="#aaa"
                  strokeWidth="1"
                  strokeDasharray="3,2"
                />
                <text
                  x={xStart - 10}
                  y={yPos + 5}
                  fontSize="12"
                  fill="#333"
                  textAnchor="end"
                >
                  {yValue}%
                </text>
              </g>
            );
          })}

          {/* Y-Axis */}
          <line
            x1={xStart}
            y1={yBase}
            x2={xStart}
            y2={yBase - maxBarHeight}
            stroke="#555"
            strokeWidth="2"
          />

          {/* X-Axis */}
          <line
            x1={xStart}
            y1={yBase}
            x2={svgWidth - 20}
            y2={yBase}
            stroke="#555"
            strokeWidth="2"
          />

          {/* Bars */}
          {skills.map((skill, i) => {
            const percent = (skill.amount / total) * 100;
            const barHeight = (percent / maxPercent) * maxBarHeight;
            const barX = xStart + 10 + i * (barWidth + gap);
            const barY = yBase - barHeight;

            return (
              <g key={skill.type}>
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="#3F4F44"
                  rx="5"
                />
                <text
                  x={barX + barWidth / 2}
                  y={yBase + 20}
                  fontSize="12"
                  fill="#333"
                  textAnchor="middle"
                >
                  {formatSkillType(skill.type)}
                </text>
                <text
                  x={barX + barWidth / 2}
                  y={barY - 10}
                  fontSize="12"
                  fill="#333"
                  textAnchor="middle"
                >
                  {percent.toFixed(1)}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SkillChart;
