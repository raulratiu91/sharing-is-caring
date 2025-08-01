"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "../navigation/Navigation";
import { VolunteerStatsCards } from "./stats/VolunteerStatsCards";
import {
  Heart,
  Star,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
  Award,
  Users,
  Clock,
  ShoppingCart,
  Pill,
  Phone,
  Car,
  Home,
  Quote,
  Sparkles,
} from "lucide-react";

interface HelpedRequest {
  id: string;
  elderName: string;
  elderInitials: string;
  category: string;
  title: string;
  description: string;
  completedDate: string;
  location: string;
  rating: number;
  testimonial?: string;
  urgency: "low" | "medium" | "high";
}

interface CarerProfile {
  name: string;
  initials: string;
  joinDate: string;
  location: string;
  totalHelps: number;
  averageRating: number;
  personalStory: string;
  motivation: string;
  helpedRequests: HelpedRequest[];
}

const categoryIcons = {
  Medications: Pill,
  Groceries: ShoppingCart,
  "Tech Support": Phone,
  Transportation: Car,
  "Home Tasks": Home,
};

const mockCarerProfile: CarerProfile = {
  name: "Adam Bobrow",
  initials: "AB",
  joinDate: "March 2024",
  location: "Downtown Area",
  totalHelps: 17,
  averageRating: 4.9,
  personalStory: `I started volunteering with CareConnect after my grandmother passed away. She lived alone for many years, and I saw firsthand how much small acts of kindness meant to her - whether it was a neighbor picking up groceries or someone helping with technology.

I realized that there are so many wonderful elders in our community who just need a little support to maintain their independence and dignity. Every time I help someone, I think about my grandmother and how grateful she would have been for this kind of community support.`,
  motivation: "Making sure no elder feels alone or forgotten in our community.",
  helpedRequests: [
    {
      id: "1",
      elderName: "Margaret Johnson",
      elderInitials: "MJ",
      category: "Medications",
      title: "Pick up prescription",
      description: "Picked up blood pressure medication from CVS",
      completedDate: "2 days ago",
      location: "Downtown",
      rating: 5,
      testimonial:
        "Sarah was so kind and even called to make sure she got the right medication. She's an angel!",
      urgency: "high",
    },
    {
      id: "2",
      elderName: "Robert Chen",
      elderInitials: "RC",
      category: "Groceries",
      title: "Weekly grocery shopping",
      description:
        "Helped with weekly grocery shopping, followed detailed list",
      completedDate: "1 week ago",
      location: "Westside",
      rating: 5,
      testimonial:
        "Sarah remembered all my preferences and even found better deals on some items. Wonderful helper!",
      urgency: "medium",
    },
    {
      id: "3",
      elderName: "Eleanor Martinez",
      elderInitials: "EM",
      category: "Tech Support",
      title: "Set up video calls",
      description:
        "Helped set up video calling app to connect with grandchildren",
      completedDate: "2 weeks ago",
      location: "Eastside",
      rating: 5,
      testimonial:
        "So patient and kind. Now I can see my grandchildren every week thanks to Sarah!",
      urgency: "low",
    },
    {
      id: "4",
      elderName: "Frank Rodriguez",
      elderInitials: "FR",
      category: "Transportation",
      title: "Doctor appointment ride",
      description: "Provided transportation to cardiology appointment",
      completedDate: "3 weeks ago",
      location: "Northside",
      rating: 5,
      testimonial:
        "Sarah was punctual, friendly, and even waited during my appointment. Truly caring person.",
      urgency: "medium",
    },
    {
      id: "5",
      elderName: "Dorothy Williams",
      elderInitials: "DW",
      category: "Home Tasks",
      title: "Light bulb replacement",
      description:
        "Replaced several light bulbs and checked smoke detector batteries",
      completedDate: "1 month ago",
      location: "Central",
      rating: 5,
      urgency: "low",
    },
  ],
};

export function CarerProfile() {
  const [profile, setProfile] = useState<CarerProfile>(mockCarerProfile);
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [editedStory, setEditedStory] = useState(profile.personalStory);
  const [editedMotivation, setEditedMotivation] = useState(profile.motivation);

  const handleSaveStory = () => {
    setProfile({
      ...profile,
      personalStory: editedStory,
      motivation: editedMotivation,
    });
    setIsEditingStory(false);
  };

  const handleCancelEdit = () => {
    setEditedStory(profile.personalStory);
    setEditedMotivation(profile.motivation);
    setIsEditingStory(false);
  };

  const recentHelps = profile.helpedRequests.slice(0, 3);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-left mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            My Volunteer Profile
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Your journey of making a difference in the community
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Header */}
          <Card className="p-6 bg-primary/5 border-primary/20 shadow-lg">
            <CardContent className="pt-0">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
                  <AvatarImage
                    src={`/placeholder.svg?height=96&width=96&text=${profile.initials}`}
                  />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {profile.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {profile.name}
                  </h1>
                  <div className="flex flex-col md:flex-row items-start gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Volunteer since {profile.joinDate}
                    </div>
                  </div>
                </div>
              </div>
              <VolunteerStatsCards
                mode="profile"
                profileData={{
                  totalHelps: profile.totalHelps,
                  averageRating: profile.averageRating,
                }}
              />
            </CardContent>
          </Card>

          {/* Personal Story Section */}
          <Card className="p-6 shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl text-foreground">
                    My Story & Motivation
                  </CardTitle>
                </div>
                {!isEditingStory && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingStory(true)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
              <CardDescription className="text-left text-lg text-muted-foreground">
                Share what drives you to help others and make a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditingStory ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="story" className="text-lg font-medium">
                      Your Story
                    </Label>
                    <Textarea
                      id="story"
                      value={editedStory}
                      onChange={(e) => setEditedStory(e.target.value)}
                      placeholder="Share your personal story and what led you to volunteer..."
                      className="min-h-[150px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-lg font-medium">
                      Your Motivation
                    </Label>
                    <Input
                      id="motivation"
                      value={editedMotivation}
                      onChange={(e) => setEditedMotivation(e.target.value)}
                      placeholder="What motivates you to keep helping?"
                      className="text-base"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveStory}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Quote className="h-8 w-8 text-muted-foreground/40 absolute -top-2 -left-2" />
                    <div className="pl-8">
                      <p className="text-left text-lg leading-relaxed text-foreground whitespace-pre-line">
                        {profile.personalStory}
                      </p>
                    </div>
                  </div>
                  <div className="text-left bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                    <h3 className="font-semibold text-foreground mb-2">
                      What motivates me:
                    </h3>
                    <p className="text-foreground text-lg italic">
                      "{profile.motivation}"
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Impact */}
          <Card className="p-6 shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl text-foreground">
                  Recent Impact
                </CardTitle>
              </div>
              <CardDescription className="text-left text-lg text-muted-foreground">
                Your latest acts of kindness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recentHelps.map((help) => {
                  const IconComponent =
                    categoryIcons[
                      help.category as keyof typeof categoryIcons
                    ] || Heart;
                  return (
                    <Card
                      key={help.id}
                      className="border border-border hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={`/placeholder.svg?height=48&width=48&text=${help.elderInitials}`}
                            />
                            <AvatarFallback>
                              {help.elderInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start text-left justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg text-foreground">
                                  {help.elderName}
                                </h3>
                                <p className="text-muted-foreground">
                                  {help.title}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(help.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <IconComponent className="h-4 w-4" />
                                {help.category}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {help.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {help.completedDate}
                              </div>
                            </div>
                            {help.testimonial && (
                              <div className="text-left bg-primary/5 p-3 rounded-lg border-l-4 border-primary">
                                <p className="text-foreground italic">
                                  "{help.testimonial}"
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Full History */}
          <Card className="text-left p-6 shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl text-foreground">
                  Complete Helping History
                </CardTitle>
              </div>
              <CardDescription className="text-lg text-muted-foreground">
                All {profile.totalHelps} people you've helped in our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.helpedRequests.map((help) => {
                  const IconComponent =
                    categoryIcons[
                      help.category as keyof typeof categoryIcons
                    ] || Heart;
                  return (
                    <div
                      key={help.id}
                      className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 bg-background rounded-lg shadow-sm border border-border">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {help.elderName} - {help.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {help.location} • {help.completedDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(help.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <div className="space-y-4">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Your Achievements
              </h2>
              <p className="text-lg text-muted-foreground">
                Celebrating your contributions to the community
              </p>
            </div>
            <VolunteerStatsCards />
          </div>
        </div>
      </main>

      <Footer text="Thank you for being a volunteer and making a difference in your community." />
    </div>
  );
}
