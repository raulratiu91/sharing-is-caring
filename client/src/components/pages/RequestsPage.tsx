import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Navigation } from "../navigation/Navigation";
import {
  Heart,
  MapPin,
  Clock,
  ArrowLeft,
  Phone,
  Calendar,
  User,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RequestsPage: React.FC = () => {
  const navigate = useNavigate();

  const helpRequests = [
    {
      id: 1,
      name: "Maria",
      age: 78,
      location: "Downtown Area, 0.8 miles away",
      timeAgo: "2 hours ago",
      description: "I need help picking up my medications from the pharmacy. I have difficulty walking long distances.",
      background: "Retired school teacher who loves reading and gardening. Lives alone but has a supportive daughter who visits weekly.",
      urgency: "Medium",
      preferredTime: "Mornings (9 AM - 12 PM)",
      contactMethod: "Phone call preferred",
      additionalNotes: "Pharmacy is on Main Street, about 3 blocks away. I can provide exact address and prescription details.",
      category: "💊 Medication Pickup",
      categoryColor: "blue",
      initial: "M",
    },
    {
      id: 2,
      name: "Robert",
      age: 72,
      location: "Riverside District, 1.2 miles away",
      timeAgo: "4 hours ago",
      description: "Looking for someone to help me set up video calling on my tablet to talk with my grandchildren.",
      background: "Former engineer who enjoys chess and crossword puzzles. His grandchildren live in another state and he misses them dearly.",
      urgency: "Low",
      preferredTime: "Afternoons (2 PM - 5 PM)",
      contactMethod: "In-person visit preferred",
      additionalNotes: "I have an iPad and decent internet. Just need someone patient to walk me through the setup process.",
      category: "📱 Tech Support",
      categoryColor: "green",
      initial: "R",
    },
    {
      id: 3,
      name: "Eleanor",
      age: 81,
      location: "Oak Hill, 0.5 miles away",
      timeAgo: "6 hours ago",
      description: "I need assistance with grocery shopping this week. I have a list ready and would appreciate the help.",
      background: "Widow who loves cooking for others. Used to host large family dinners but now needs help getting ingredients.",
      urgency: "High",
      preferredTime: "Weekday mornings (10 AM - 1 PM)",
      contactMethod: "Phone call or text",
      additionalNotes: "I have a detailed list and can provide payment in advance. Prefer organic produce when possible.",
      category: "🛒 Grocery Shopping",
      categoryColor: "purple",
      initial: "E",
    },
    {
      id: 4,
      name: "Frank",
      age: 75,
      location: "Maple Street, 2.1 miles away",
      timeAgo: "8 hours ago",
      description: "My car won't start and I need someone to drive me to my doctor's appointment tomorrow morning.",
      background: "Veteran with mobility issues. Very independent but occasionally needs transportation assistance.",
      urgency: "High",
      preferredTime: "Tomorrow 9:30 AM",
      contactMethod: "Phone call only",
      additionalNotes: "Appointment is at City Medical Center. Should take about 2 hours total including wait time.",
      category: "🚗 Transportation",
      categoryColor: "orange",
      initial: "F",
    },
    {
      id: 5,
      name: "Betty",
      age: 79,
      location: "Pine Avenue, 1.8 miles away",
      timeAgo: "12 hours ago",
      description: "I could use help with light cleaning around the house. It's becoming difficult for me to manage.",
      background: "Former librarian who takes pride in her home but is struggling with arthritis in her hands.",
      urgency: "Medium",
      preferredTime: "Weekday afternoons (1 PM - 4 PM)",
      contactMethod: "Text message preferred",
      additionalNotes: "Mainly need help with dusting, light vacuuming, and bathroom cleaning. I have all supplies needed.",
      category: "🏠 Light Housework",
      categoryColor: "teal",
      initial: "B",
    },
    {
      id: 6,
      name: "George",
      age: 84,
      location: "Sunset District, 0.9 miles away",
      timeAgo: "1 day ago",
      description: "My dog needs walking and I'm recovering from a minor surgery. He's very friendly and well-behaved.",
      background: "Widower with a beloved Golden Retriever named Buddy. Recently had knee surgery and can't walk long distances.",
      urgency: "Medium",
      preferredTime: "Morning and evening walks",
      contactMethod: "In-person visit preferred",
      additionalNotes: "Buddy is 8 years old, very gentle, and loves meeting new people. Walks usually last 20-30 minutes.",
      category: "🐕 Pet Care",
      categoryColor: "indigo",
      initial: "G",
    },
    {
      id: 7,
      name: "Dorothy",
      age: 76,
      location: "Garden Lane, 1.4 miles away",
      timeAgo: "1 day ago",
      description: "I'm feeling lonely and would love someone to visit for a chat over tea. I have many stories to share.",
      background: "Former nurse with fascinating life stories. Loves sharing tales from her travels and nursing career.",
      urgency: "Low",
      preferredTime: "Any afternoon (2 PM - 5 PM)",
      contactMethod: "Phone call to arrange",
      additionalNotes: "I make excellent tea and cookies. Would love to hear about your life too - I'm a great listener!",
      category: "📞 Friendly Visit",
      categoryColor: "pink",
      initial: "D",
    },
    {
      id: 8,
      name: "William",
      age: 82,
      location: "Elm Street, 3.2 miles away",
      timeAgo: "2 days ago",
      description: "My kitchen faucet is dripping and I need someone handy to help fix it. I have the replacement parts.",
      background: "Former mechanic who usually fixes everything himself but is having trouble with fine motor skills.",
      urgency: "Medium",
      preferredTime: "Weekends or evenings",
      contactMethod: "Phone call preferred",
      additionalNotes: "I've already purchased the right parts from the hardware store. Just need someone with steady hands to help.",
      category: "🔧 Small Repairs",
      categoryColor: "red",
      initial: "W",
    },
    {
      id: 9,
      name: "Margaret",
      age: 77,
      location: "Rose Boulevard, 0.7 miles away",
      timeAgo: "2 days ago",
      description: "I need help organizing my medicine cabinet and understanding my new prescription schedule.",
      background: "Recently had medication changes and feels overwhelmed by the new routine. Very organized person who wants to maintain independence.",
      urgency: "High",
      preferredTime: "Mornings (10 AM - 12 PM)",
      contactMethod: "In-person visit preferred",
      additionalNotes: "I have pill organizers and a notebook ready. Just need someone to help me create a clear system.",
      category: "💊 Medication Support",
      categoryColor: "cyan",
      initial: "M",
    },
    {
      id: 10,
      name: "Arthur",
      age: 80,
      location: "Cedar Heights, 2.5 miles away",
      timeAgo: "3 days ago",
      description: "Looking for someone to help me learn how to use online banking. I'd like to manage my finances digitally.",
      background: "Former accountant who is very comfortable with numbers but new to computers. Eager to learn and stay current.",
      urgency: "Low",
      preferredTime: "Weekday afternoons (2 PM - 4 PM)",
      contactMethod: "Phone call to schedule",
      additionalNotes: "I have a laptop and all my banking information ready. Just need patient guidance through the process.",
      category: "📱 Tech Support",
      categoryColor: "violet",
      initial: "A",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        border: "border-l-blue-500",
        avatar: "from-blue-500 to-blue-600",
        tag: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      },
      green: {
        border: "border-l-green-500",
        avatar: "from-green-500 to-green-600",
        tag: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      },
      purple: {
        border: "border-l-purple-500",
        avatar: "from-purple-500 to-purple-600",
        tag: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      },
      orange: {
        border: "border-l-orange-500",
        avatar: "from-orange-500 to-orange-600",
        tag: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      },
      teal: {
        border: "border-l-teal-500",
        avatar: "from-teal-500 to-teal-600",
        tag: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
      },
      indigo: {
        border: "border-l-indigo-500",
        avatar: "from-indigo-500 to-indigo-600",
        tag: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      },
      pink: {
        border: "border-l-pink-500",
        avatar: "from-pink-500 to-pink-600",
        tag: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      },
      red: {
        border: "border-l-red-500",
        avatar: "from-red-500 to-red-600",
        tag: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      },
      cyan: {
        border: "border-l-cyan-500",
        avatar: "from-cyan-500 to-cyan-600",
        tag: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
      },
      violet: {
        border: "border-l-violet-500",
        avatar: "from-violet-500 to-violet-600",
        tag: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="text-black border-black hover:bg-gray-200 hover:text-black dark:text-black dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Help Requests from Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Community Elders
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              These wonderful community members are looking for assistance. Your help can make their day brighter and easier.
              Choose a request that matches your skills and availability.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>{helpRequests.length} Active Requests</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>All verified members</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Requests List */}
        <div className="space-y-6">
          {helpRequests.map((request) => {
            const colors = getColorClasses(request.categoryColor);
            const urgencyColor = request.urgency === "High" ? "text-red-600 dark:text-red-400" : 
                               request.urgency === "Medium" ? "text-orange-600 dark:text-orange-400" : 
                               "text-green-600 dark:text-green-400";
            
            return (
              <Card key={request.id} className={`p-8 hover:shadow-lg transition-all duration-200 ${colors.border}`}>
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.avatar} flex items-center justify-center text-white font-bold text-2xl`}>
                      {request.initial}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-1">{request.name}, {request.age}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{request.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{request.timeAgo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          <span className={urgencyColor}>{request.urgency} Priority</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.tag}`}>
                      {request.category}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-start">
                  {/* Request Description */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Help Needed</h4>
                      <p className="text-foreground leading-relaxed">
                        "{request.description}"
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">About {request.name}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {request.background}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Additional Notes</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {request.additionalNotes}
                      </p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex flex-col h-full">
                    <div className="bg-muted/50 rounded-lg p-5 space-y-4 flex-1 border border-border/50">
                      <h4 className="font-semibold text-foreground text-center pb-2 border-b border-border/30">Request Details</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground">Preferred Time</p>
                            <p className="text-sm text-muted-foreground">{request.preferredTime}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground">Contact Method</p>
                            <p className="text-sm text-muted-foreground">{request.contactMethod}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <User className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground">Urgency Level</p>
                            <p className={`text-sm font-medium ${urgencyColor}`}>{request.urgency}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Offer Help
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These are just some of the current requests. New help requests are posted regularly throughout the day.
              Check back often or sign up for notifications to stay updated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Notifications
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/")}
                className="min-w-[200px] text-black border-black hover:bg-gray-200 hover:text-black dark:text-black dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-black"
              >
                Back to Home
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};