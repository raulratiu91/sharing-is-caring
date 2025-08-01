import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select } from "../ui/select";
import { Navigation } from "../navigation/Navigation";
import type { User } from "../../types/user";
import { User as UserIcon, Save, Camera, MapPin } from "lucide-react";

interface ProfileSettingsProps {
  user?: User;
  onSave?: (user: User) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  user,
  onSave,
}) => {
  // Default user data for demo purposes
  const [profileData, setProfileData] = useState<User>(
    user || {
      id: "1",
      name: "Maria Santos",
      email: "maria.santos@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Anytown, State 12345",
      bio: "I love helping my community and staying connected with technology.",
      userType: "elder",
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        language: "en",
        availabilityRadius: 10,
      },
    }
  );

  const handleInputChange = (field: keyof User, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (
    field: keyof User["preferences"],
    value: string | number | boolean
  ) => {
    setProfileData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave?.(profileData);
    // You would typically make an API call here
    alert("Profile settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />

      <div className="container mx-auto max-w-4xl p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Information Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserIcon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>

          {/* Profile Picture */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-2xl font-bold">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                {profileData.name}
              </h3>
              <p className="text-sm text-muted-foreground capitalize">
                {profileData.userType}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <Select
                id="userType"
                value={profileData.userType}
                onChange={(e) =>
                  handleInputChange(
                    "userType",
                    e.target.value as "elder" | "volunteer"
                  )
                }
              >
                <option value="elder">Elder</option>
                <option value="volunteer">Volunteer</option>
              </Select>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
                className="pl-10"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="lg"
            className="min-w-[200px] border-blue-601 text-black dark:border-blue-400 hover:text-black"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
