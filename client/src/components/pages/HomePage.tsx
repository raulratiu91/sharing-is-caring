import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Navigation } from "../navigation/Navigation";
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
} from "lucide-react";

export const HomePage: React.FC = () => {
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
                {" "}
                Caring Hearts
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Together, we're building a network where every elder gets the help
              they need and every volunteer makes a meaningful difference.
              <strong className="text-foreground">
                {" "}
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
              Elders Who Need Your Help Today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These wonderful community members are looking for assistance. Your
              help can make their day brighter and easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Help Request Card 1 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Maria, 78</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Downtown Area</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>2 hours ago</span>
                </div>
              </div>
              <p className="text-foreground mb-4">
                "I need help picking up my medications from the pharmacy. I have
                difficulty walking long distances."
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  💊 Medication Pickup
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-black border-black hover:bg-gray-200 hover:text-black dark:text-black dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-black"
                >
                  Offer Help
                </Button>
              </div>
            </Card>

            {/* Help Request Card 2 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    R
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Robert, 72
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Riverside District</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>4 hours ago</span>
                </div>
              </div>
              <p className="text-foreground mb-4">
                "Looking for someone to help me set up video calling on my
                tablet to talk with my grandchildren."
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  📱 Tech Support
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-black border-black hover:bg-gray-200 hover:text-black dark:text-black dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-black"
                >
                  Offer Help
                </Button>
              </div>
            </Card>

            {/* Help Request Card 3 */}
            <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    E
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Eleanor, 81
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Oak Hill</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>6 hours ago</span>
                </div>
              </div>
              <p className="text-foreground mb-4">
                "I need assistance with grocery shopping this week. I have a
                list ready and would appreciate the help."
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  🛒 Grocery Shopping
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-black border-black hover:bg-gray-200 hover:text-black dark:text-black dark:border-gray-400 dark:hover:bg-gray-600 dark:hover:text-black"
                >
                  Offer Help
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
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
            {[
              "🛒 Grocery Shopping",
              "💊 Medication Pickup",
              "📱 Tech Support",
              "🚗 Transportation",
              "🏠 Light Housework",
              "🐕 Pet Care",
              "📞 Friendly Calls",
              "🔧 Small Repairs",
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
            {/* Success Story 1 */}
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
                  video call my daughter. Now I can see my grandchildren every
                  week! It's brought so much joy to my life."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div>
                  <p className="font-medium text-foreground">Dorothy, 76</p>
                  <p className="text-sm text-muted-foreground">Elder Member</p>
                </div>
              </div>
            </Card>

            {/* Success Story 2 */}
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
                  recovering from surgery. His kindness and regular check-ins
                  made me feel truly cared for during a difficult time."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div>
                  <p className="font-medium text-foreground">Henry, 83</p>
                  <p className="text-sm text-muted-foreground">Elder Member</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Volunteer Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Volunteer Testimonial 1 */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Sarah M.</h3>
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
                  "Volunteering with iCard has been incredibly rewarding. Every
                  time I help someone, I receive so much more in return. The
                  smiles and gratitude make every moment worthwhile."
                </p>
              </div>
            </Card>

            {/* Volunteer Testimonial 2 */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                  J
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">James K.</h3>
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
                  "I've learned so much from the elders I help. Their wisdom and
                  life stories are incredible. This platform has connected me
                  with amazing people I now consider friends."
                </p>
              </div>
            </Card>
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
                <div className="text-3xl font-bold mb-2">1,247</div>
                <div className="text-blue-100">Elders Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">892</div>
                <div className="text-blue-100">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">3,456</div>
                <div className="text-blue-100">Acts of Kindness</div>
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
