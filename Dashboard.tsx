import AppNav from "@/components/AppNav";
import StatCard from "@/components/StatCard";
import ConvictionGauge from "@/components/ConvictionGauge";
import { DollarSign, Activity, FileText, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const portfolioData = [
  { date: "Jan", value: 12400 },
  { date: "Feb", value: 15200 },
  { date: "Mar", value: 13800 },
  { date: "Apr", value: 18600 },
  { date: "May", value: 17200 },
  { date: "Jun", value: 22100 },
  { date: "Jul", value: 24800 },
];

const theses = [
  { token: "SOL", thesis: "L1 dominance via Firedancer", score: 87, allocation: 35, trend: "up" },
  { token: "JUP", thesis: "DEX aggregator moat", score: 72, allocation: 20, trend: "up" },
  { token: "PYTH", thesis: "Oracle infra play", score: 64, allocation: 15, trend: "down" },
  { token: "JTO", thesis: "Liquid staking growth", score: 58, allocation: 10, trend: "up" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-8 animate-fade-in">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Portfolio Value"
            value="$24,812"
            change="+12.4% (30d)"
            positive
            icon={<DollarSign className="w-4 h-4" />}
            mono
          />
          <StatCard
            label="Conviction Health"
            value="74"
            change="+3 pts"
            positive
            icon={<Shield className="w-4 h-4" />}
            mono
          />
          <StatCard
            label="Active Theses"
            value="4"
            icon={<FileText className="w-4 h-4" />}
          />
          <StatCard
            label="Behavioral Stability"
            value="82"
            change="-2 pts"
            positive={false}
            icon={<Activity className="w-4 h-4" />}
            mono
          />
        </div>

        {/* Chart + Gauges */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">Portfolio Performance</h2>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(215, 20%, 55%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 20%, 55%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 9%)",
                    border: "1px solid hsl(222, 30%, 16%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-6">
            <h2 className="text-sm font-medium text-muted-foreground self-start">Conviction Overview</h2>
            <ConvictionGauge score={74} label="Overall Health" size="lg" />
            <div className="flex gap-6">
              <ConvictionGauge score={82} label="Clarity" />
              <ConvictionGauge score={68} label="Risk Align" />
            </div>
          </div>
        </div>

        {/* Active Theses */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-medium text-muted-foreground">Active Theses</h2>
          </div>
          <div className="divide-y divide-border">
            {theses.map((t) => (
              <div key={t.token} className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-mono text-sm font-semibold text-primary">{t.token.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{t.token}</div>
                    <div className="text-xs text-muted-foreground">{t.thesis}</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Allocation</div>
                    <div className="text-sm font-mono">{t.allocation}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Score</div>
                    <div className="text-sm font-mono font-semibold">{t.score}</div>
                  </div>
                  {t.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
