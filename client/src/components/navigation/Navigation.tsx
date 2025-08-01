import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useTheme } from "../../hooks/useTheme";
import { Heart, Settings, Sun, Moon, Home, User } from "lucide-react";

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">iCare</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="transition-all duration-200 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </Button>

          {location.pathname === "/volunteerProfile" ? (
            <Link to="/volunteerDashboard">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          ) : location.pathname === "/volunteerDashboard" ? (
            <Link to="/volunteerProfile">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black"
              >
                <User className="h-4 w-4 mr-2" />
                My Profile
              </Button>
            </Link>
          ) : location.pathname === "/profile" ? (
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          ) : (
            <Link to="/profile">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black"
              >
                <Settings className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
