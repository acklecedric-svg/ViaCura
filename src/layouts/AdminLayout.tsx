/**
 * @krisspy-file
 * @type layout
 * @name "AdminLayout"
 * @export "default"
 */

import React, { useState } from 'react';
import {
  Menu,
  X,
  BarChart3,
  Users,
  Pill,
  FileText,
  LogOut,
  Settings,
  Bell,
  Search,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
      badge: null,
    },
    {
      label: 'User Management',
      icon: Users,
      href: '/admin/users',
      badge: '12',
    },
    {
      label: 'Pharmacy Partners',
      icon: Pill,
      href: '/admin/pharmacy',
      badge: null,
    },
    {
      label: 'Reports',
      icon: FileText,
      href: '/admin/reports',
      badge: '3',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      badge: null,
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex h-screen bg-primary text-primary overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-secondary border-r border-primary transition-all duration-300 flex flex-col overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-lg flex items-center justify-between border-b border-primary">
          {sidebarOpen && (
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 bg-blue rounded-lg flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">ViaCura+</h1>
                <p className="text-xs text-secondary">Admin</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-md hover:bg-tertiary rounded-lg transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-lg space-y-md">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-lg px-md py-lg rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-blue text-white shadow-lg'
                    : 'text-secondary hover:bg-tertiary hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="flex-1 font-medium text-sm">
                    {item.label}
                  </span>
                )}
                {sidebarOpen && item.badge && (
                  <span
                    className={`px-md py-xs rounded-full text-xs font-semibold ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-tertiary text-secondary'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings & Logout */}
        <div className="p-lg space-y-md border-t border-primary">
          <button className="w-full flex items-center gap-lg px-md py-lg text-secondary hover:bg-tertiary hover:text-primary rounded-lg transition-colors group">
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button className="w-full flex items-center gap-lg px-md py-lg text-secondary hover:bg-danger/10 hover:text-danger rounded-lg transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-secondary border-b border-primary sticky top-0 z-40">
          <div className="px-lg py-md flex items-center justify-between gap-lg">
            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden sm:flex items-center bg-tertiary rounded-lg px-lg py-md border border-primary focus-within:border-blue transition-colors">
              <Search className="w-5 h-5 text-secondary flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent ml-md text-primary placeholder-secondary outline-none"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-lg">
              {/* Mobile Search */}
              <button className="sm:hidden p-md hover:bg-tertiary rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-md hover:bg-tertiary rounded-lg transition-colors relative group"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-danger rounded-full"></span>
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-md w-80 bg-secondary rounded-lg border border-primary shadow-lg z-50">
                    <div className="p-lg border-b border-primary flex items-center justify-between">
                      <h3 className="font-semibold text-primary">Notifications</h3>
                      <button
                        onClick={() => setNotificationOpen(false)}
                        className="p-xs hover:bg-tertiary rounded transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="p-lg border-b border-primary hover:bg-tertiary transition-colors last:border-b-0 cursor-pointer group"
                        >
                          <div className="flex items-start gap-md">
                            <div className="w-3 h-3 rounded-full bg-blue flex-shrink-0 mt-1.5"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-primary group-hover:text-blue transition-colors">
                                System Update #{i}
                              </p>
                              <p className="text-xs text-secondary mt-1">
                                New admin user registration
                              </p>
                              <p className="text-xs text-secondary/50 mt-1">
                                2 minutes ago
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-lg text-center border-t border-primary">
                      <button className="text-sm text-blue hover:text-blue-hover transition-colors flex items-center justify-center gap-sm w-full">
                        View All <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <button className="flex items-center gap-md px-md py-md hover:bg-tertiary rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">A</span>
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <p className="text-sm font-medium text-primary">Admin User</p>
                  <p className="text-xs text-secondary">System Admin</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-primary">
          <div className="h-full">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
