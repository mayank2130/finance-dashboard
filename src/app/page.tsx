"use client";

import { useState } from "react";
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from "recharts";
import { format, subDays, subMonths } from "date-fns";
import { 
  ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  Wallet, TrendingUp, DollarSign, Users, Bell, Calendar, 
  Search, HelpCircle, Settings, User, BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for our data
interface FinancialMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

export default function HomePage() {
  const [activeTimeframe, setActiveTimeframe] = useState<"day" | "week" | "month" | "year">("month");
  
  // Financial metrics data
  const metrics: FinancialMetric[] = [
    {
      title: "Total Revenue",
      value: "$48,345.20",
      change: 12.5,
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Total Expenses",
      value: "$15,778.90",
      change: -2.3,
      icon: <Wallet className="h-5 w-5 text-red-500" />,
    },
    {
      title: "New Customers",
      value: "328",
      change: 8.1,
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Growth Rate",
      value: "14.2%",
      change: 3.6,
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
    },
  ];

  // Revenue data for charts
  const revenueData = Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), 29 - i), "MMM dd"),
    revenue: 10000 + Math.random() * 18000,
    expenses: 5000 + Math.random() * 7000,
    profit: 3000 + Math.random() * 10000
  }));

  // Monthly data for bar chart
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    name: format(subMonths(new Date(), 11 - i), "MMM"),
    revenue: 25000 + Math.random() * 90000,
    target: 50000 + Math.random() * 50000,
  }));

  // Pie chart data
  const expenseCategories = [
    { name: "Salaries", value: 45 },
    { name: "Marketing", value: 20 },
    { name: "Operations", value: 15 },
    { name: "Equipment", value: 10 },
    { name: "Other", value: 10 },
  ];
  
  // Color palette for pie chart
  const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

  // Transactions data
  const transactions: Transaction[] = [
    {
      id: "TRX-001",
      name: "Acme Corp",
      category: "Software Services",
      date: "Jun 21, 2023",
      amount: 12500,
      status: "completed",
    },
    {
      id: "TRX-002",
      name: "TechGiant Inc",
      category: "Hardware",
      date: "Jun 20, 2023",
      amount: 8750.50,
      status: "completed",
    },
    {
      id: "TRX-003",
      name: "Digital Marketing",
      category: "Marketing",
      date: "Jun 19, 2023",
      amount: 2430,
      status: "pending",
    },
    {
      id: "TRX-004",
      name: "Office Supplies Ltd",
      category: "Supplies",
      date: "Jun 18, 2023",
      amount: 1250.75,
      status: "completed",
    },
    {
      id: "TRX-005",
      name: "Cloud Services Co",
      category: "Infrastructure",
      date: "Jun 17, 2023",
      amount: 4500,
      status: "failed",
    },
  ];

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar-background border-r border-sidebar-border">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-sidebar-primary">FinanceDash</h1>
          </div>
          <div className="px-3">
            <nav className="space-y-1">
              {[
                { name: "Dashboard", icon: <TrendingUp size={18} /> },
                { name: "Transactions", icon: <DollarSign size={18} /> },
                { name: "Accounts", icon: <Wallet size={18} /> },
                { name: "Customers", icon: <Users size={18} /> },
                { name: "Reports", icon: <BarChart2 size={18} /> },
                { name: "Settings", icon: <Settings size={18} /> },
              ].map((item, index) => (
                <a
                  key={item.name}
                  href="#"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    index === 0
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="bg-background border-b border-border">
            <div className="flex justify-between items-center px-8 py-4">
              <h1 className="text-xl font-semibold">Financial Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button className="p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <Search size={18} />
                </button>
                <button className="p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <Calendar size={18} />
                </button>
                <button className="p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <Bell size={18} />
                </button>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <User size={18} />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-8">
            {/* Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {metrics.map((metric) => (
                <div key={metric.title} className="bg-card rounded-xl shadow-sm p-6 border border-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                    </div>
                    <div className="p-2 rounded-full bg-secondary">{metric.icon}</div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span
                      className={cn(
                        "text-sm font-medium flex items-center",
                        metric.change > 0 ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {metric.change > 0 ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      {Math.abs(metric.change)}%
                    </span>
                    <span className="text-muted-foreground text-sm ml-1.5">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Time range selector */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Financial Overview</h2>
              <div className="flex items-center bg-secondary rounded-lg p-1">
                {["day", "week", "month", "year"].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setActiveTimeframe(timeframe as any)}
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-md",
                      activeTimeframe === timeframe
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary-foreground/10"
                    )}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Revenue Line Chart */}
              <div className="bg-card col-span-2 rounded-xl shadow-sm p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Revenue & Expenses</h3>
                  <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                      <YAxis
                        stroke="var(--muted-foreground)"
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${formatCurrency(value)}`, ""]}
                        contentStyle={{
                          backgroundColor: "var(--popover)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Expense Categories */}
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Expense Breakdown</h3>
                  <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, "Percentage"]}
                        contentStyle={{
                          backgroundColor: "var(--popover)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Monthly Performance Bar Chart */}
              <div className="bg-card col-span-2 rounded-xl shadow-sm p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Monthly Performance</h3>
                  <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                      <YAxis
                        stroke="var(--muted-foreground)"
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${formatCurrency(value)}`, ""]}
                        contentStyle={{
                          backgroundColor: "var(--popover)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" name="Target" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Annual Growth */}
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Annual Growth</h3>
                  <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyData}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                      <YAxis
                        stroke="var(--muted-foreground)"
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${formatCurrency(value)}`, ""]}
                        contentStyle={{
                          backgroundColor: "var(--popover)",
                          borderColor: "var(--border)",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--chart-5)"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Recent Transactions</h3>
                <button className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 pl-4 text-left font-medium text-muted-foreground">Transaction ID</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Name</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Category</th>
                      <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                      <th className="pb-3 text-right font-medium text-muted-foreground">Amount</th>
                      <th className="pb-3 pr-4 text-right font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 pl-4">{transaction.id}</td>
                        <td className="py-4 font-medium">{transaction.name}</td>
                        <td className="py-4">{transaction.category}</td>
                        <td className="py-4">{transaction.date}</td>
                        <td className="py-4 text-right font-medium">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="py-4 pr-4 text-right">
                          <span
                            className={cn(
                              "inline-block px-2 py-1 rounded-full text-xs font-medium",
                              {
                                "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400":
                                  transaction.status === "completed",
                                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400":
                                  transaction.status === "pending",
                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400":
                                  transaction.status === "failed",
                              }
                            )}
                          >
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
