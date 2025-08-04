import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  CheckCircle,
  Clock,
  User,
  MapPin,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import '../styles/animations.css';
import { Navigation } from '@/components/navigation/Navigation';
import { useTheme } from '../hooks/useTheme';

interface RequestItem {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface StoryCard {
  id: string;
  image: string;
  title: string;
  description: string;
  date?: string;
}

interface ElderProfile {
  id: string;
  name: string;
  age: number;
  story: string;
  storyCards: StoryCard[];
  requests: RequestItem[];
  background: string;
  interests: string[];
  location: string;
  avatar?: string;
}

export function UserAboutPage() {
  const { userId } = useParams<{ userId: string }>();
  const [elder, setElder] = useState<ElderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [scrollY, setScrollY] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const { theme } = useTheme();

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchElderProfile = async () => {
      try {
        setLoading(true);

        if (!userId) {
          setElder(null);
          return;
        }

        // Fetch data from MongoDB API
        const response = await fetch(
          `http://localhost:3000/api/data/elders/${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          // Transform MongoDB data to match our ElderProfile interface
          const elderData = result.data;

          const transformedElder: ElderProfile = {
            id: elderData._id,
            name: elderData.name,
            age: elderData.age,
            story: elderData.story,
            storyCards: elderData.storyCards || [],
            requests: elderData.requests.map(
              (req: {
                _id: string;
                title: string;
                description: string;
                status: 'open' | 'closed';
                priority: 'low' | 'medium' | 'high';
                createdAt: string;
              }) => ({
                id: req._id,
                title: req.title,
                description: req.description,
                status: req.status,
                priority: req.priority,
                createdAt: new Date(req.createdAt).toLocaleDateString(),
              })
            ),
            background: elderData.background,
            interests: elderData.interests,
            location:
              elderData.location?.address ||
              elderData.location ||
              'Location not specified',
            avatar: elderData.avatar,
          };

          setElder(transformedElder);
        } else {
          setElder(null);
        }
      } catch (error) {
        console.error('Failed to fetch elder profile:', error);
        setElder(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchElderProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}
      >
        <div className="text-center space-y-4">
          <div
            className={`animate-spin w-12 h-12 border-4 border-t-transparent rounded-full mx-auto ${
              theme === 'dark' ? 'border-blue-400' : 'border-blue-500'
            }`}
          ></div>
          <div
            className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Loading elder's story...
          </div>
        </div>
      </div>
    );
  }

  if (!elder) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-red-50 via-white to-pink-50'
        }`}
      >
        <div className="text-center space-y-4">
          <div className="text-6xl">😔</div>
          <div
            className={`text-lg ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}
          >
            Elder profile not found
          </div>
        </div>
      </div>
    );
  }

  const openRequests = elder.requests.filter((req) => req.status === 'open');
  const closedRequests = elder.requests.filter(
    (req) => req.status === 'closed'
  );

  // Sort requests by priority (high -> medium -> low)
  const sortByPriority = (requests: RequestItem[]) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return requests.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  };

  const activeRequests =
    activeTab === 'open'
      ? sortByPriority([...openRequests])
      : sortByPriority([...closedRequests]);

  const scrollToRequests = () => {
    const requestsSection = document.getElementById('requests-section');
    if (requestsSection) {
      requestsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const nextStoryCard = () => {
    if (elder?.storyCards) {
      setCurrentStoryIndex((prev) => (prev + 1) % elder.storyCards.length);
    }
  };

  const prevStoryCard = () => {
    if (elder?.storyCards) {
      setCurrentStoryIndex(
        (prev) => (prev - 1 + elder.storyCards.length) % elder.storyCards.length
      );
    }
  };

  const goToStoryCard = (index: number) => {
    setCurrentStoryIndex(index);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      <Navigation />
      <div
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

        {/* Floating Elements with Interactive Info */}
        <div
          className="absolute top-20 left-10 animate-bounce cursor-pointer group"
          onClick={scrollToRequests}
        >
          <div className="relative">
            <Heart className="h-8 w-8 text-pink-400 group-hover:text-pink-500 transition-colors" />
            {openRequests.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                {openRequests.length}
              </div>
            )}
            {/* Tooltip */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Click to see {openRequests.length} open request
              {openRequests.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 left-20 cursor-pointer group">
          <div
            className={`relative backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
              theme === 'dark'
                ? 'bg-gray-800/30 border-gray-600/50 hover:bg-gray-800/50'
                : 'bg-white/30 border-white/50 hover:bg-white/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {elder.location}
              </span>
            </div>
            {/* Enhanced Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              <div className="font-medium">📍 Location</div>
              <div className="text-gray-300">{elder.location}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
            </div>
          </div>
        </div>

        <div className="text-center z-10 space-y-6 animate-fade-in">
          {elder.avatar && (
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float">
              <img
                src={elder.avatar}
                alt={elder.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1
            className={`text-6xl font-bold animate-slide-up ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            {elder.name}
          </h1>
          <p
            className={`text-2xl animate-slide-up delay-200 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {elder.age} years old • <MapPin className="inline h-5 w-5" />{' '}
            {elder.location}
          </p>

          {/* Quick Status Overview */}
          <div className="flex justify-center space-x-4 animate-slide-up delay-500">
            <div
              className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg cursor-pointer hover:bg-white transition-colors"
              onClick={scrollToRequests}
            >
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-500" />
                <div
                  className={`text-center ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  <div className="text-lg font-bold">{openRequests.length}</div>
                  <div
                    className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Open
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                <div
                  className={`text-center ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  <div className="text-lg font-bold">
                    {closedRequests.length}
                  </div>
                  <div
                    className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Done
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-red-500 rounded-full"></div>
                <div
                  className={`text-center ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  <div className="text-lg font-bold">
                    {
                      elder.requests.filter(
                        (r) => r.priority === 'high' && r.status === 'open'
                      ).length
                    }
                  </div>
                  <div
                    className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Urgent
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div
                  className={`text-center ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  <div className="text-lg font-bold">
                    {elder.interests.length}
                  </div>
                  <div
                    className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Hobbies
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          {openRequests.length > 0 && (
            <button
              onClick={scrollToRequests}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up delay-700"
            >
              <Heart className="inline h-5 w-5 mr-2" />
              View {openRequests.length} Help Request
              {openRequests.length !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>

      <div className="w-full px-6 py-12 space-y-16 relative z-10">
        {/* Story Section with Parallax */}
        <section
          className={`backdrop-blur-sm rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 w-full mb-12 ${
            theme === 'dark'
              ? 'bg-gray-800/80 text-white'
              : 'bg-white/80 text-gray-800'
          }`}
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <h2
            className={`text-3xl font-semibold mb-6 flex items-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            <User className="h-8 w-8 mr-3 text-blue-500" />
            Their Story
          </h2>
          <p
            className={`text-lg leading-relaxed mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {elder.story}
          </p>

          {/* Photo Story Carousel */}
          {elder.storyCards && elder.storyCards.length > 0 && (
            <div className="mt-8">
              <h3
                className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                Life Moments
              </h3>
              <div className="relative">
                {/* Main Card Display */}
                <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentStoryIndex * 100}%)`,
                    }}
                  >
                    {elder.storyCards.map((card) => (
                      <div key={card.id} className="w-full flex-shrink-0">
                        <div className="relative">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex justify-between items-end">
                              <div>
                                <h4 className="text-xl font-semibold mb-2">
                                  {card.title}
                                </h4>
                                <p className="text-white/90 text-sm leading-relaxed">
                                  {card.description}
                                </p>
                              </div>
                              {card.date && (
                                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                                  {card.date}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {elder.storyCards.length > 1 && (
                  <>
                    <button
                      onClick={prevStoryCard}
                      className="absolute left-4 top-5/12 transform -translate-y-1/2 -translate-x-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                    >
                      <ChevronLeft className="h-4 w-6 text-gray-700" />
                    </button>
                    <button
                      onClick={nextStoryCard}
                      className="absolute right-4 top-5/12 transform -translate-y-1/2 translate-x-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                    >
                      <ChevronRight className="h-4 w-6 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Pagination Dots */}
                {elder.storyCards.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {elder.storyCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToStoryCard(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentStoryIndex
                            ? 'bg-blue-500 scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Interactive Requests Section - GitHub PR Style */}
        <section
          id="requests-section"
          className={`backdrop-blur-sm rounded-2xl p-8 shadow-xl w-full ${
            theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'
          }`}
        >
          <h2
            className={`text-3xl font-semibold mb-6 flex items-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            <Clock className="h-8 w-8 mr-3 text-green-500" />
            Help Requests
          </h2>

          {/* Tab Navigation */}
          <div
            className={`flex space-x-1 mb-6 rounded-lg p-1 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <button
              onClick={() => setActiveTab('open')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'open'
                  ? theme === 'dark'
                    ? 'bg-gray-600 text-green-400 shadow-sm'
                    : 'bg-white text-green-700 shadow-sm'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Clock className="inline h-4 w-4 mr-2" />
              Open ({openRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'closed'
                  ? theme === 'dark'
                    ? 'bg-gray-600 text-purple-400 shadow-sm'
                    : 'bg-white text-purple-700 shadow-sm'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <CheckCircle className="inline h-4 w-4 mr-2" />
              Closed ({closedRequests.length})
            </button>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {activeRequests.map((request, index) => (
              <div
                key={request.id}
                className={`border rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-white'
                } ${
                  request.priority === 'high' && request.status === 'open'
                    ? 'border-l-4 border-l-red-500 border-red-200 bg-red-50/30'
                    : request.priority === 'medium' && request.status === 'open'
                    ? 'border-l-4 border-l-yellow-500 border-yellow-200 bg-yellow-50/30'
                    : theme === 'dark'
                    ? 'border-gray-600'
                    : 'border-gray-200'
                }`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {request.status === 'open' ? (
                        <div className="relative">
                          <Clock className="h-5 w-5 text-green-500" />
                          {request.priority === 'high' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      ) : (
                        <CheckCircle className="h-5 w-5 text-purple-500" />
                      )}
                      <h3
                        className={`text-lg font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {request.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          request.priority
                        )}`}
                      >
                        {request.priority}
                        {request.priority === 'high' &&
                          request.status === 'open' &&
                          ' ⚡'}
                      </span>
                    </div>
                    <p
                      className={`mb-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {request.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}
                      >
                        Created: {request.createdAt}
                      </p>
                      {request.status === 'open' && (
                        <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                          <Heart className="inline h-3 w-3 mr-1" />
                          Offer Help
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Background Section */}
        <section
          className={`rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 w-full ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-amber-900/50 to-orange-900/50'
              : 'bg-gradient-to-r from-amber-50 to-orange-50'
          }`}
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <h2
            className={`text-3xl font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            Background
          </h2>
          <p
            className={`leading-relaxed text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {elder.background}
          </p>
        </section>

        {/* Interests Section */}
        <section
          className={`backdrop-blur-sm rounded-2xl p-8 shadow-xl w-full ${
            theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'
          }`}
        >
          <h2
            className={`text-3xl font-semibold mb-6 flex items-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            <Star className="h-8 w-8 mr-3 text-yellow-500" />
            Interests & Hobbies
          </h2>
          <div className="flex flex-wrap gap-4">
            {elder.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium hover:scale-110 transition-transform duration-200 cursor-pointer shadow-md"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white shadow-2xl w-full">
          <h3 className="text-3xl font-bold">Ready to Make a Difference?</h3>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Every small act of kindness creates ripples of joy. Connect with{' '}
            {elder.name} and be part of their story.
          </p>
          <div className="space-x-6">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Heart className="inline h-5 w-5 mr-2" />
              Reach Out to Help
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
