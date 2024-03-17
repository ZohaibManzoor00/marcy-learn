"use client";

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ChartProps {
  data: { name: string; totalComplete: number; totalInProgress: number }[];
}

export default function Chart({ data }: ChartProps) {
  const successColor = "#059669"; 
  const inProgressColor = "#0284c7";

  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, bottom: 10 }}>
          <XAxis
            dataKey="name"
            stroke="#333333"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            domain={[0, "dataMax + 1"]}
            stroke="#333333"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="totalComplete"
            name="Completed"
            fill={successColor}
            barSize={20}
          />
          <Bar
            dataKey="totalInProgress"
            name="In Progress"
            fill={inProgressColor}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
