import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Navigation } from "../navigation/Navigation";
import { Heart, Users, HandHeart } from "lucide-react";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <HandHeart className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Sharing is Caring
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connecting elders with volunteers in our community. Get help with
            daily tasks or volunteer to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black"
            >
              I need help
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black"
            >
              I want to help
            </Button>
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

        {/* CTA Section */}
        <Card className="p-8 bg-primary/5 border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join our community today and start helping or get the support you
            need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black"
            >
              Sign Up as Elder
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-blue-600 text-black dark:border-blue-400 hover:text-black hover:border-blue-600"
            >
              Sign Up as Volunteer
            </Button>
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
