import React from "react";
import { Card } from "../../ui/card";
import { CheckCircle, Clock, Users, Star, Award } from "lucide-react";

interface VolunteerStatsCardsProps {
  mode?: "dashboard" | "profile";
  profileData?: {
    totalHelps: number;
    averageRating: number;
  };
}

export const VolunteerStatsCards: React.FC<VolunteerStatsCardsProps> = ({
  mode = "dashboard",
  profileData,
}) => {
  if (mode === "profile") {
    return (
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-sm border border-border">
          <div className="usersAvatar flex justify-center">
            <div className="p-1 rounded-full">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <span className="font-semibold">{profileData?.totalHelps || 17}</span>
          <span className="text-muted-foreground">Lives Touched</span>
        </div>

        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-sm border border-border">
          <div className="flex justify-center">
            <div className="p-1 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <span className="text-muted-foreground">Tasks Completed</span>
        </div>

        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-sm border border-border">
          <div className="flex justify-center">
            <div className="p-1rounded-full">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <span className="text-muted-foreground">Hours Volunteered</span>
        </div>

        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full shadow-sm border border-border">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold">
            {profileData?.averageRating || 4.9}
          </span>
          <span className="text-muted-foreground">average rating</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <Card className="p-6 text-center hover:shadow-lg transition-shadow">
        <div className="usersAvatar flex justify-center mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">8</h3>
        <p className="text-muted-foreground">Lives Touched</p>
      </Card>

      <Card className="p-6 text-center hover:shadow-lg transition-shadow">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">12</h3>
        <p className="text-muted-foreground">Tasks Completed</p>
      </Card>

      <Card className="p-6 text-center hover:shadow-lg transition-shadow">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">24</h3>
        <p className="text-muted-foreground">Hours Volunteered</p>
      </Card>

      <Card className="p-6 text-center hover:shadow-lg transition-shadow">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">4.9</h3>
        <p className="text-muted-foreground">Average Rating</p>
      </Card>
    </div>
  );
};
