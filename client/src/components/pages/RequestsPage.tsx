import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Navigation } from '../navigation/Navigation';
import {
  Heart,
  MapPin,
  Clock,
  ArrowLeft,
  Phone,
  Calendar,
  User,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HelpRequest {
  id: string;
  name: string;
  age: number;
  location: string;
  timeAgo: string;
  description: string;
  background: string;
  urgency: 'High' | 'Medium' | 'Low';
  preferredTime: string;
  contactMethod: string;
  additionalNotes: string;
  category: string;
  categoryColor: string;
  initial: string;
  elderId: string;
}

export const RequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch help requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data/requests');
        if (!response.ok) {
          throw new Error('Failed to fetch help requests');
        }
        const data = await response.json();
        setHelpRequests(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching help requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        border: 'border-l-blue-500',
        avatar: 'from-blue-500 to-blue-600',
        tag: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      },
      green: {
        border: 'border-l-green-500',
        avatar: 'from-green-500 to-green-600',
        tag: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      },
      purple: {
        border: 'border-l-purple-500',
        avatar: 'from-purple-500 to-purple-600',
        tag: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      },
      orange: {
        border: 'border-l-orange-500',
        avatar: 'from-orange-500 to-orange-600',
        tag: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      },
      teal: {
        border: 'border-l-teal-500',
        avatar: 'from-teal-500 to-teal-600',
        tag: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
      },
      indigo: {
        border: 'border-l-indigo-500',
        avatar: 'from-indigo-500 to-indigo-600',
        tag: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
      },
      pink: {
        border: 'border-l-pink-500',
        avatar: 'from-pink-500 to-pink-600',
        tag: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      },
      red: {
        border: 'border-l-red-500',
        avatar: 'from-red-500 to-red-600',
        tag: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      },
      cyan: {
        border: 'border-l-cyan-500',
        avatar: 'from-cyan-500 to-cyan-600',
        tag: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
      },
      violet: {
        border: 'border-l-violet-500',
        avatar: 'from-violet-500 to-violet-600',
        tag: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
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
              onClick={() => navigate('/')}
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
                {' '}
                Community Elders
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              These wonderful community members are looking for assistance. Your
              help can make their day brighter and easier. Choose a request that
              matches your skills and availability.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>
                  {loading
                    ? 'Loading...'
                    : `${helpRequests.length} Active Requests`}
                </span>
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
          {loading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-8 animate-pulse">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              </Card>
            ))
          ) : error ? (
            // Error state
            <Card className="p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Unable to Load Requests
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Again
              </Button>
            </Card>
          ) : helpRequests.length === 0 ? (
            // No requests state
            <Card className="p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Help Requests Available
              </h3>
              <p className="text-muted-foreground">
                There are currently no open help requests. Check back later!
              </p>
            </Card>
          ) : (
            // Render actual requests
            helpRequests.map((request) => {
              const colors = getColorClasses(request.categoryColor);
              const urgencyColor =
                request.urgency === 'High'
                  ? 'text-red-600 dark:text-red-400'
                  : request.urgency === 'Medium'
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-green-600 dark:text-green-400';

              return (
                <Card
                  key={request.id}
                  className={`p-8 hover:shadow-lg transition-all duration-200 ${colors.border}`}
                >
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.avatar} flex items-center justify-center text-white font-bold text-2xl`}
                      >
                        {request.initial}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-1">
                          {request.name}, {request.age}
                        </h3>
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
                            <span className={urgencyColor}>
                              {request.urgency} Priority
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.tag}`}
                      >
                        {request.category}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-start">
                    {/* Request Description */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Help Needed
                        </h4>
                        <p className="text-foreground leading-relaxed">
                          "{request.description}"
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          About {request.name}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {request.background}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Additional Notes
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {request.additionalNotes}
                        </p>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="flex flex-col h-full">
                      <div className="bg-muted/50 rounded-lg p-5 space-y-4 flex-1 border border-border/50">
                        <h4 className="font-semibold text-foreground text-center pb-2 border-b border-border/30">
                          Request Details
                        </h4>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">
                                Preferred Time
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.preferredTime}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">
                                Contact Method
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {request.contactMethod}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <User className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">
                                Urgency Level
                              </p>
                              <p
                                className={`text-sm font-medium ${urgencyColor}`}
                              >
                                {request.urgency}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                        onClick={() =>
                          navigate(`/user/${request.elderId}/about`)
                        }
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        View Profile & Offer Help
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These are just some of the current requests. New help requests are
              posted regularly throughout the day. Check back often or sign up
              for notifications to stay updated.
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
                onClick={() => navigate('/')}
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
