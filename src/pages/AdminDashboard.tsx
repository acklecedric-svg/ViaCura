/**
 * @krisspy-file
 * @type page
 * @name "AdminDashboard"
 * @title "Admin Dashboard"
 * @description "Administrative backend interface for system management and monitoring"
 * @routes ["/admin/dashboard"]
 * @flowName "admin-backend"
 * @layout "AdminLayout"
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Pill,
  FileText,
  BarChart3,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('today');

  // Mock data for system overview
  const systemMetrics = {
    activeUsers: 1247,
    appointmentsToday: 89,
    systemHealth: 98,
    uptime: '99.9%',
  };

  // Mock data for performance metrics
  const performanceMetrics = [
    { label: 'API Response Time', value: '245ms', status: 'good' },
    { label: 'Database Latency', value: '45ms', status: 'good' },
    { label: 'Error Rate', value: '0.02%', status: 'good' },
    { label: 'Queue Depth', value: '12 items', status: 'warning' },
  ];

  // Mock data for recent activity
  const recentActivity = [
    { id: 1, message: 'New user registration from Admin Panel', time: '5 mins ago', type: 'success' },
    { id: 2, message: 'Pharmacy inventory updated', time: '12 mins ago', type: 'info' },
    { id: 3, message: 'Health Department Report generated', time: '1 hour ago', type: 'success' },
    { id: 4, message: 'System backup completed', time: '3 hours ago', type: 'success' },
  ];

  const managementSections = [
    {
      title: 'User Access Management',
      icon: Users,
      href: '/admin/users',
      count: '12 pending',
      color: 'from-blue to-blue-600',
    },
    {
      title: 'Pharmacy Integration',
      icon: Pill,
      href: '/admin/pharmacy',
      count: '8 active',
      color: 'from-green to-green-600',
    },
    {
      title: 'Health Department Reporting',
      icon: FileText,
      href: '/admin/reports',
      count: '3 new',
      color: 'from-yellow to-yellow-600',
    },
    {
      title: 'Billing & Insurance',
      icon: BarChart3,
      href: '/admin/analytics',
      count: 'View details',
      color: 'from-purple to-purple-600',
    },
  ];

  return (
    <div className="p-lg space-y-lg h-full overflow-y-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-secondary mt-1">System Overview & Management</p>
        </div>
        <div className="flex items-center gap-md">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-md py-md bg-secondary text-primary border border-primary rounded-lg outline-none hover:border-blue transition-colors"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {/* Active Users */}
        <div className="bg-secondary border border-primary rounded-lg p-lg hover:border-blue transition-colors">
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-sm font-semibold text-secondary">Active Users</h3>
            <Users className="w-5 h-5 text-blue" />
          </div>
          <p className="text-3xl font-bold text-primary">{systemMetrics.activeUsers}</p>
          <p className="text-xs text-green mt-md flex items-center gap-sm">
            <TrendingUp size={14} /> +12% from last week
          </p>
        </div>

        {/* Appointments Today */}
        <div className="bg-secondary border border-primary rounded-lg p-lg hover:border-green transition-colors">
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-sm font-semibold text-secondary">Appointments Today</h3>
            <Clock className="w-5 h-5 text-green" />
          </div>
          <p className="text-3xl font-bold text-primary">{systemMetrics.appointmentsToday}</p>
          <p className="text-xs text-green mt-md flex items-center gap-sm">
            <CheckCircle2 size={14} /> All on schedule
          </p>
        </div>

        {/* System Health */}
        <div className="bg-secondary border border-primary rounded-lg p-lg hover:border-green transition-colors">
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-sm font-semibold text-secondary">System Health</h3>
            <Activity className="w-5 h-5 text-green" />
          </div>
          <p className="text-3xl font-bold text-primary">{systemMetrics.systemHealth}%</p>
          <p className="text-xs text-green mt-md flex items-center gap-sm">
            <CheckCircle2 size={14} /> Excellent
          </p>
        </div>

        {/* Uptime */}
        <div className="bg-secondary border border-primary rounded-lg p-lg hover:border-blue transition-colors">
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-sm font-semibold text-secondary">Uptime</h3>
            <Activity className="w-5 h-5 text-blue" />
          </div>
          <p className="text-3xl font-bold text-primary">{systemMetrics.uptime}</p>
          <p className="text-xs text-secondary mt-md">Guaranteed availability</p>
        </div>
      </div>

      {/* Management Sections */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-md">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {managementSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.href}
                onClick={() => navigate(section.href)}
                className="bg-secondary border border-primary rounded-lg p-lg hover:border-blue hover:shadow-lg transition-all group text-left"
              >
                <div className="flex items-start justify-between mb-md">
                  <div className={`bg-gradient-to-br ${section.color} p-md rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-secondary group-hover:text-blue transition-colors" />
                </div>
                <h3 className="font-semibold text-primary mb-1">{section.title}</h3>
                <p className="text-sm text-secondary">{section.count}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Performance Metrics */}
        <div className="lg:col-span-2 bg-secondary border border-primary rounded-lg p-lg">
          <h2 className="text-lg font-bold text-primary mb-md">Performance Metrics</h2>
          <div className="space-y-md">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-md bg-primary/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-primary">{metric.label}</p>
                  <p className="text-xs text-secondary mt-1">{metric.value}</p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    metric.status === 'good' ? 'bg-green' : 'bg-warning'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-secondary border border-primary rounded-lg p-lg">
          <h2 className="text-lg font-bold text-primary mb-md">System Status</h2>
          <div className="space-y-md">
            <div className="flex items-center justify-between p-md bg-primary/30 rounded-lg">
              <div className="flex items-center gap-md">
                <CheckCircle2 className="w-5 h-5 text-green" />
                <span className="text-sm text-primary">All Systems Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-md bg-primary/30 rounded-lg">
              <div className="flex items-center gap-md">
                <Activity className="w-5 h-5 text-blue" />
                <span className="text-sm text-primary">API Responsive</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-md bg-primary/30 rounded-lg">
              <div className="flex items-center gap-md">
                <CheckCircle2 className="w-5 h-5 text-green" />
                <span className="text-sm text-primary">Database Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-secondary border border-primary rounded-lg p-lg">
        <h2 className="text-lg font-bold text-primary mb-md">Recent Activity</h2>
        <div className="space-y-md">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-md p-md border-l-2 border-blue bg-primary/20 rounded"
            >
              <CheckCircle2 className="w-5 h-5 text-green flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary">{activity.message}</p>
                <p className="text-xs text-secondary mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs Section */}
      <div className="bg-secondary border border-primary rounded-lg p-lg">
        <h2 className="text-lg font-bold text-primary mb-md">Audit Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary">
                <th className="text-left py-md px-md text-secondary font-semibold">User</th>
                <th className="text-left py-md px-md text-secondary font-semibold">Action</th>
                <th className="text-left py-md px-md text-secondary font-semibold">Module</th>
                <th className="text-left py-md px-md text-secondary font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-primary/50 hover:bg-primary/20 transition-colors">
                  <td className="py-md px-md text-primary">Admin User #{i}</td>
                  <td className="py-md px-md text-primary">Data Export</td>
                  <td className="py-md px-md text-secondary">Analytics</td>
                  <td className="py-md px-md text-secondary">2024-01-15 10:{30 + i}:00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
