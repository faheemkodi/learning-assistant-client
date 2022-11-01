import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import Row from "react-bootstrap/Row";

const CustomPieChart = ({ data }) => {
  const COLORS = ["#880808", "#E49B0F", "#863B87", "#2E8B57"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <Row className="text-center justify-content-center me-2">
      <ResponsiveContainer
        minWidth={300}
        minHeight={500}
        className="text-center"
      >
        <PieChart>
          <Legend layout="vertical" verticalAlign="top" align="center" />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default CustomPieChart;
