import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Footer } from "../ui/footer";
import { Navigation } from "../navigation/Navigation";
import { VolunteerStatsCards } from "./stats/VolunteerStatsCards";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  MessageSquare,
  User,
} from "lucide-react";

export const VolunteerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Volunteer Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Welcome to your volunteer dashboard! Manage your activities, find
            new opportunities, and track your impact.
          </p>
        </div>

        {/* Stats Cards */}
        <VolunteerStatsCards />

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Available Opportunities */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Available Opportunities</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Grocery Shopping",
                  elder: "Mrs. Johnson",
                  location: "Downtown Market",
                  time: "Today, 2:00 PM",
                  distance: "1.2 miles",
                  urgency: "high",
                },
                {
                  id: 2,
                  title: "Tech Support",
                  elder: "Mr. Garcia",
                  location: "Oak Street",
                  time: "Tomorrow, 10:00 AM",
                  distance: "0.8 miles",
                  urgency: "medium",
                },
                {
                  id: 3,
                  title: "Medication Pickup",
                  elder: "Mrs. Chen",
                  location: "Central Pharmacy",
                  time: "Friday, 3:30 PM",
                  distance: "2.1 miles",
                  urgency: "low",
                },
              ].map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">
                      {opportunity.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.urgency === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : opportunity.urgency === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {opportunity.urgency} priority
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Help {opportunity.elder}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {opportunity.time}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {opportunity.distance} away
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400"
                    >
                      Accept Task
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400"
            >
              View All Opportunities
            </Button>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  action: "Completed grocery shopping",
                  elder: "Mrs. Smith",
                  time: "2 hours ago",
                  rating: 5,
                },
                {
                  id: 2,
                  action: "Helped with tech support",
                  elder: "Mr. Wilson",
                  time: "Yesterday",
                  rating: 5,
                },
                {
                  id: 3,
                  action: "Delivered medications",
                  elder: "Mrs. Brown",
                  time: "3 days ago",
                  rating: 4,
                },
              ].map((activity) => (
                <div
                  key={activity.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">
                      {activity.action}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(activity.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">
                    for {activity.elder}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400"
            >
              View All Activity
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-8 bg-primary/5 border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Help More?
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore more opportunities to make a difference in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Browse All Tasks
            </Button>
            <Link to="/volunteerProfile">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400"
              >
                <User className="h-4 w-4 mr-2" />
                View My Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Elders
            </Button>
          </div>
        </Card>
      </main>

      <Footer text="Thank you for being a volunteer and making a difference in your community." />
    </div>
  );
};
