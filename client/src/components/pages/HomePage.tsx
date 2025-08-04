import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Navigation } from '../navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Users,
  HandHeart,
  MapPin,
  Clock,
  Star,
  Quote,
  CheckCircle,
  ArrowRight,
  Calendar,
} from 'lucide-react';

// Types for the API data
interface HelpRequest {
  _id: string;
  title: string;
  description: string;
  category?: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface Elder {
  _id: string;
  name: string;
  age: number;
  location: {
    address: string;
  };
  requests: HelpRequest[];
  avatar?: string;
}

interface CommunityStats {
  elders: number;
  volunteers: number;
  openRequests: number;
  urgentRequests: number;
}

interface Testimonial {
  _id: string;
  type: 'success_story' | 'volunteer_review';
  name: string;
  age?: number;
  role: string;
  content: string;
  rating?: number;
  dateCompleted?: string;
  avatar?: string;
}

interface SuccessStory {
  _id: string;
  elderName: string;
  elderAge: number;
  volunteerName: string;
  helpType: string;
  story: string;
  completedDate: string;
  avatar?: string;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [elders, setElders] = useState<Elder[]>([]);
  const [latestHelpRequests, setLatestHelpRequests] = useState<
    (HelpRequest & { elder: Elder })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [helpCategories, setHelpCategories] = useState<string[]>([]);
  const [stats, setStats] = useState<CommunityStats>({
    elders: 0,
    volunteers: 0,
    openRequests: 0,
    urgentRequests: 0,
  });
  const [statsLoaded, setStatsLoaded] = useState(false);

  // Fetch elders and stats from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all elders data
        const eldersResponse = await fetch(
          'http://localhost:3000/api/data/elders'
        );
        console.log(eldersResponse, 'resp');
        const eldersResponseData = await eldersResponse.json();
        const eldersData = eldersResponseData.data || eldersResponseData;
        setElders(eldersData);

        // Create flattened array of all help requests with elder info
        const flattenedRequests: (HelpRequest & { elder: Elder })[] = [];
        eldersData.forEach((elder: Elder) => {
          const openRequests =
            elder.requests?.filter((req) => req.status === 'open') || [];
          openRequests.forEach((request) => {
            flattenedRequests.push({
              ...request,
              elder: elder,
            });
          });
        });

        // Sort by creation date (newest first) and take only the latest 5
        flattenedRequests.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLatestHelpRequests(flattenedRequests.slice(0, 6));

        // Fetch stats
        const statsResponse = await fetch('/api/data/stats');
        const statsResponseData = await statsResponse.json();
        const statsData = statsResponseData.data || statsResponseData;
        setStats(statsData);
        setStatsLoaded(true);

        // Extract unique help categories from elders' help requests
        const allHelpRequests = eldersData.flatMap(
          (elder: Elder) => elder.requests || []
        );
        const uniqueCategories = [
          ...new Set(
            allHelpRequests.map((request: HelpRequest) => request.category)
          ),
        ].filter(Boolean) as string[];
        setHelpCategories(uniqueCategories);

        // TODO: Fetch testimonials and success stories from API
        // For now, keep some sample data or fetch from a dedicated endpoint
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Banner Section */}
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-2xl p-8 md:p-12 mb-16 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative text-center">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
                <HandHeart className="h-20 w-20 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Join Our Community of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}
                Caring Hearts
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Together, we're building a network where every elder gets the help
              they need and every volunteer makes a meaningful difference.
              <strong className="text-foreground">
                {' '}
                Your kindness matters.
              </strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="min-w-[200px] bg-gray-200 hover:bg-gray-300 text-black hover:text-black dark:bg-gray-600 dark:text-black dark:hover:bg-gray-500 dark:hover:text-black shadow-lg hover:shadow-xl transition-all duration-200"
              >
                I Need Help
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/requests')}
                className="min-w-[200px] bg-gray-200 hover:bg-gray-300 text-black hover:text-black dark:bg-gray-600 dark:text-black dark:hover:bg-gray-500 dark:hover:text-black shadow-lg hover:shadow-xl transition-all duration-200"
              >
                I Want to Help
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Matching</h3>
            <p className="text-muted-foreground">
              Our smart system connects elders with nearby volunteers based on
              needs and availability.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <HandHeart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Various Services</h3>
            <p className="text-muted-foreground">
              From grocery shopping to tech support, volunteers can help with a
              wide range of daily tasks.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Safe & Trusted</h3>
            <p className="text-muted-foreground">
              All volunteers are verified, and we provide secure communication
              and tracking features.
            </p>
          </Card>
        </div>

        {/* Latest Help Requests Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Latest Help Requests
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are the 5 most recent requests from community members who
              need your assistance. Your help can make their day brighter and
              easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </Card>
              ))
            ) : latestHelpRequests.length > 0 ? (
              // Real data from MongoDB - display latest help requests
              latestHelpRequests.map((requestWithElder) => {
                const { elder, ...request } = requestWithElder;

                const priorityColors = {
                  high: 'border-l-red-500 bg-red-50 dark:bg-red-950/30',
                  medium:
                    'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30',
                  low: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30',
                };

                const priorityBadgeColors = {
                  high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
                  medium:
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
                  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
                };

                const getInitial = (name: string) =>
                  name.charAt(0).toUpperCase();
                const getTimeSinceCreated = (dateString: string) => {
                  const date = new Date(dateString);
                  const now = new Date();
                  const diffHours = Math.floor(
                    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
                  );

                  if (diffHours < 1) return 'Less than 1 hour ago';
                  if (diffHours === 1) return '1 hour ago';
                  if (diffHours < 24) return `${diffHours} hours ago`;

                  const diffDays = Math.floor(diffHours / 24);
                  if (diffDays === 1) return '1 day ago';
                  return `${diffDays} days ago`;
                };

                const getRequestTypeEmoji = (title: string) => {
                  const lowerTitle = title.toLowerCase();
                  if (
                    lowerTitle.includes('medication') ||
                    lowerTitle.includes('pharmacy')
                  )
                    return '💊';
                  if (
                    lowerTitle.includes('grocery') ||
                    lowerTitle.includes('shopping')
                  )
                    return '🛒';
                  if (
                    lowerTitle.includes('tech') ||
                    lowerTitle.includes('technology') ||
                    lowerTitle.includes('computer') ||
                    lowerTitle.includes('phone')
                  )
                    return '📱';
                  if (
                    lowerTitle.includes('transport') ||
                    lowerTitle.includes('ride') ||
                    lowerTitle.includes('drive')
                  )
                    return '🚗';
                  if (
                    lowerTitle.includes('walk') ||
                    lowerTitle.includes('exercise')
                  )
                    return '🚶';
                  if (
                    lowerTitle.includes('garden') ||
                    lowerTitle.includes('plant')
                  )
                    return '🌱';
                  if (
                    lowerTitle.includes('cook') ||
                    lowerTitle.includes('meal')
                  )
                    return '🍳';
                  return '🤝';
                };

                return (
                  <Card
                    key={request._id}
                    className={`p-6 hover:shadow-lg transition-all duration-200 border-l-4 ${
                      priorityColors[request.priority]
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {elder.avatar ? (
                          <img
                            src={elder.avatar}
                            alt={`${elder.name}'s profile`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {getInitial(elder.name)}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {elder.name}, {elder.age}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {elder.location?.address ||
                                'Location not specified'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeSinceCreated(request.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-foreground mb-4 max-h-12 overflow-hidden">
                      {request.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          priorityBadgeColors[request.priority]
                        }`}
                      >
                        {getRequestTypeEmoji(request.title)} {request.title}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/user/${elder._id}/about`)}
                        className="text-black border-black hover:bg-gray-200 hover:text-black dark:text-black dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-black"
                      >
                        View Profile
                      </Button>
                    </div>
                  </Card>
                );
              })
            ) : (
              // No data available
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No help requests available at the moment.
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/requests')}
              className="min-w-[200px] border-black text-black hover:bg-gray-200 hover:text-black dark:text-black dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-black"
            >
              View All Requests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Example Needs Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            How We Help
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Here are some examples of the assistance our volunteers provide to
            elders in our community:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpCategories.length > 0
              ? helpCategories.map((category, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium">{category}</p>
                  </Card>
                ))
              : // Fallback to default categories while loading
                [
                  'Grocery Shopping',
                  'Medication Pickup',
                  'Tech Support',
                  'Transportation',
                  'Light Housework',
                  'Pet Care',
                  'Friendly Calls',
                  'Small Repairs',
                ].map((need, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium">{need}</p>
                  </Card>
                ))}
          </div>
        </div>

        {/* Success Stories & Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stories of Kindness & Connection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from our community members about the meaningful
              connections and positive impact we're creating together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {successStories.length > 0 ? (
              successStories.slice(0, 2).map((story, index) => (
                <Card
                  key={story._id}
                  className={`p-6 ${
                    index === 0
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800'
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-2 ${
                        index === 0 ? 'bg-green-500' : 'bg-blue-500'
                      } rounded-full`}
                    >
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Help Successfully Provided
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Completed{' '}
                          {new Date(story.completedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <Quote
                      className={`absolute -top-2 -left-2 h-8 w-8 ${
                        index === 0
                          ? 'text-green-300 dark:text-green-700'
                          : 'text-blue-300 dark:text-blue-700'
                      }`}
                    />
                    <p className="text-foreground pl-6 italic">
                      "{story.story}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        index === 0
                          ? 'bg-gradient-to-br from-green-400 to-green-600'
                          : 'bg-gradient-to-br from-blue-400 to-blue-600'
                      } flex items-center justify-center text-white font-bold`}
                    >
                      {story.elderName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {story.elderName}, {story.elderAge}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Elder Member
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              // Fallback content while loading
              <>
                <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-green-500 rounded-full">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Help Successfully Provided
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Completed 3 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-green-300 dark:text-green-700" />
                    <p className="text-foreground pl-6 italic">
                      "Sarah helped me set up my smartphone and taught me how to
                      video call my daughter. Now I can see my grandchildren
                      every week! It's brought so much joy to my life."
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                      D
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Dorothy, 76</p>
                      <p className="text-sm text-muted-foreground">
                        Elder Member
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-blue-500 rounded-full">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Help Successfully Provided
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Completed 1 week ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-300 dark:text-blue-700" />
                    <p className="text-foreground pl-6 italic">
                      "James picked up my medications and groceries when I was
                      recovering from surgery. His kindness and regular
                      check-ins made me feel truly cared for during a difficult
                      time."
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      H
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Henry, 83</p>
                      <p className="text-sm text-muted-foreground">
                        Elder Member
                      </p>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Volunteer Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.length > 0 ? (
              testimonials
                .filter((t) => t.type === 'volunteer_review')
                .slice(0, 2)
                .map((testimonial, index) => (
                  <Card
                    key={testimonial._id}
                    className={`p-6 ${
                      index === 0
                        ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800'
                        : 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full ${
                          index === 0
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                            : 'bg-gradient-to-br from-orange-500 to-red-500'
                        } flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Volunteer since{' '}
                          {testimonial.dateCompleted
                            ? new Date(testimonial.dateCompleted).getFullYear()
                            : '2024'}
                        </p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <Quote
                        className={`absolute -top-2 -left-2 h-6 w-6 ${
                          index === 0
                            ? 'text-purple-300 dark:text-purple-700'
                            : 'text-orange-300 dark:text-orange-700'
                        }`}
                      />
                      <p className="text-foreground pl-4">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </Card>
                ))
            ) : (
              // Fallback content while loading
              <>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      S
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Sarah M.
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Volunteer since 2024
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-purple-300 dark:text-purple-700" />
                    <p className="text-foreground pl-4">
                      "Volunteering with iCard has been incredibly rewarding.
                      Every time I help someone, I receive so much more in
                      return. The smiles and gratitude make every moment
                      worthwhile."
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      J
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        James K.
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Volunteer since 2023
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-orange-300 dark:text-orange-700" />
                    <p className="text-foreground pl-4">
                      "I've learned so much from the elders I help. Their wisdom
                      and life stories are incredible. This platform has
                      connected me with amazing people I now consider friends."
                    </p>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <Card className="relative p-8 md:p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <HandHeart className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of caring individuals who are already making their
              communities stronger. Whether you need help or want to help
              others, your story starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="min-w-[200px] bg-gray-200 text-black hover:bg-gray-300 hover:text-black dark:bg-gray-600 dark:text-black dark:hover:bg-gray-500 dark:hover:text-black shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign Up as Elder
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px] border-2 border-gray-200 text-black hover:bg-gray-200 hover:text-black dark:border-gray-400 dark:text-black dark:hover:bg-gray-600 dark:hover:text-black shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign Up as Volunteer
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {statsLoaded ? (
                    stats.elders
                  ) : (
                    <div className="w-12 h-8 bg-white/20 rounded animate-pulse mx-auto"></div>
                  )}
                </div>
                <div className="text-blue-100">Elders Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {statsLoaded ? (
                    stats.volunteers
                  ) : (
                    <div className="w-12 h-8 bg-white/20 rounded animate-pulse mx-auto"></div>
                  )}
                </div>
                <div className="text-blue-100">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {statsLoaded ? (
                    stats.openRequests
                  ) : (
                    <div className="w-12 h-8 bg-white/20 rounded animate-pulse mx-auto"></div>
                  )}
                </div>
                <div className="text-blue-100">Open Requests</div>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">iCare</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Building stronger communities through mutual support and care.
          </p>
        </div>
      </footer>
    </div>
  );
};
