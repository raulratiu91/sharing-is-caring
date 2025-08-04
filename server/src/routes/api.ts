import { Router } from 'express';
import ElderProfile from '@src/models/ElderProfile';
import UserEnhanced from '@src/models/UserEnhanced';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

// **** Variables **** //
const apiRouter = Router();

// **** Routes **** //

/**
 * Search elders by location or interests (MUST come before /elders/:id)
 */
apiRouter.get('/elders/search', async (req, res) => {
  try {
    const { location, interests, hasOpenRequests } = req.query;

    let query: any = { isActive: true };

    if (location) {
      query['location.address'] = { $regex: location, $options: 'i' };
    }

    if (interests) {
      const interestArray = (interests as string)
        .split(',')
        .map((i) => i.trim());
      query.interests = { $in: interestArray };
    }

    let elders = await ElderProfile.find(query)
      .select('name age location interests avatar requests')
      .sort({ createdAt: -1 });

    // Filter by open requests if requested
    if (hasOpenRequests === 'true') {
      elders = elders.filter(
        (elder) =>
          elder.requests && elder.requests.some((req) => req.status === 'open')
      );
    }

    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: elders,
      count: elders.length,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Search failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Get all elder profiles
 */
apiRouter.get('/elders', async (req, res) => {
  try {
    const elders = await ElderProfile.find({ isActive: true })
      .select('name age location interests avatar requests')
      .lean()
      .sort({ createdAt: -1 });

    // Transform to include calculated request counts
    const eldersWithCounts = elders.map((elder) => {
      const openRequests =
        elder.requests?.filter((req) => req.status === 'open') || [];
      const urgentRequests = openRequests.filter(
        (req) => req.priority === 'high'
      );

      return {
        _id: elder._id,
        name: elder.name,
        age: elder.age,
        location: elder.location,
        interests: elder.interests,
        avatar: elder.avatar,
        openRequestsCount: openRequests.length,
        urgentRequestsCount: urgentRequests.length,
        requests: elder.requests,
      };
    });

    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: eldersWithCounts,
      count: eldersWithCounts.length,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch elder profiles',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Get elder profile by ID
 */
apiRouter.get('/elders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const elder = await ElderProfile.findById(id);

    if (!elder) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Elder profile not found',
      });
    }

    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: elder,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch elder profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Get all volunteers
 */
apiRouter.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await UserEnhanced.find({
      userType: 'volunteer',
      isActive: true,
      isApproved: true,
    })
      .select('name location volunteerInfo.skills volunteerInfo.rating avatar')
      .sort({ 'volunteerInfo.rating': -1 });

    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: volunteers,
      count: volunteers.length,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Get all help requests for RequestsPage
 */
apiRouter.get('/requests', async (req, res) => {
  try {
    const elders = await ElderProfile.find({ isActive: true })
      .select('name age location requests story background preferences')
      .lean()
      .sort({ createdAt: -1 });

    // Flatten all requests with elder information
    const allRequests: any[] = [];

    elders.forEach((elder) => {
      if (elder.requests && elder.requests.length > 0) {
        elder.requests
          .filter((request) => request.status === 'open')
          .forEach((request, index) => {
            // Calculate time since creation
            const getTimeSinceCreated = (date: Date) => {
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

            // Map category to display format
            const getCategoryDisplay = (title: string) => {
              const lowerTitle = title.toLowerCase();
              if (
                lowerTitle.includes('medication') ||
                lowerTitle.includes('pharmacy')
              ) {
                return { emoji: '💊', name: 'Medication', color: 'blue' };
              }
              if (
                lowerTitle.includes('grocery') ||
                lowerTitle.includes('shopping')
              ) {
                return {
                  emoji: '🛒',
                  name: 'Grocery Shopping',
                  color: 'purple',
                };
              }
              if (
                lowerTitle.includes('tech') ||
                lowerTitle.includes('technology') ||
                lowerTitle.includes('computer') ||
                lowerTitle.includes('phone')
              ) {
                return { emoji: '📱', name: 'Tech Support', color: 'green' };
              }
              if (
                lowerTitle.includes('transport') ||
                lowerTitle.includes('ride') ||
                lowerTitle.includes('drive')
              ) {
                return { emoji: '🚗', name: 'Transportation', color: 'orange' };
              }
              if (
                lowerTitle.includes('walk') ||
                lowerTitle.includes('exercise')
              ) {
                return { emoji: '🚶', name: 'Exercise', color: 'teal' };
              }
              if (
                lowerTitle.includes('garden') ||
                lowerTitle.includes('plant')
              ) {
                return { emoji: '🌱', name: 'Gardening', color: 'green' };
              }
              if (lowerTitle.includes('cook') || lowerTitle.includes('meal')) {
                return { emoji: '🍳', name: 'Cooking', color: 'orange' };
              }
              if (
                lowerTitle.includes('house') ||
                lowerTitle.includes('clean')
              ) {
                return { emoji: '🏠', name: 'Light Housework', color: 'teal' };
              }
              if (
                lowerTitle.includes('pet') ||
                lowerTitle.includes('dog') ||
                lowerTitle.includes('cat')
              ) {
                return { emoji: '🐕', name: 'Pet Care', color: 'indigo' };
              }
              if (
                lowerTitle.includes('visit') ||
                lowerTitle.includes('chat') ||
                lowerTitle.includes('talk') ||
                lowerTitle.includes('friendly')
              ) {
                return { emoji: '📞', name: 'Friendly Visit', color: 'pink' };
              }
              if (lowerTitle.includes('repair') || lowerTitle.includes('fix')) {
                return { emoji: '🔧', name: 'Small Repairs', color: 'red' };
              }
              return { emoji: '🤝', name: 'General Help', color: 'blue' };
            };

            const category = getCategoryDisplay(request.title);

            allRequests.push({
              id: `${elder._id}-${index}`, // Unique ID combining elder ID and request index
              name: elder.name,
              age: elder.age,
              location: elder.location?.address || 'Location not specified',
              timeAgo: getTimeSinceCreated(request.createdAt),
              description: request.description,
              background:
                elder.background ||
                elder.story ||
                `${elder.name} is a valued member of our community.`,
              urgency:
                request.priority === 'high'
                  ? 'High'
                  : request.priority === 'medium'
                  ? 'Medium'
                  : 'Low',
              preferredTime: elder.preferences?.availableHours
                ? `${elder.preferences.availableHours.start} - ${elder.preferences.availableHours.end}`
                : 'Flexible schedule',
              contactMethod:
                elder.preferences?.preferredContactMethod === 'phone'
                  ? 'Phone call preferred'
                  : elder.preferences?.preferredContactMethod === 'email'
                  ? 'Email preferred'
                  : elder.preferences?.preferredContactMethod === 'inApp'
                  ? 'In-app messaging preferred'
                  : 'Phone call preferred',
              additionalNotes:
                request.urgencyNotes || 'No special requirements mentioned.',
              category: `${category.emoji} ${category.name}`,
              categoryColor: category.color,
              initial: elder.name.charAt(0).toUpperCase(),
              elderId: elder._id,
              requestIndex: index,
            });
          });
      }
    });

    // Sort by creation date (newest first) - properly sort by actual date
    allRequests.sort((a, b) => {
      // Find the original elder and request to get the actual date
      const elderA = elders.find(
        (e) => e._id.toString() === a.elderId.toString()
      );
      const elderB = elders.find(
        (e) => e._id.toString() === b.elderId.toString()
      );

      if (!elderA || !elderB) return 0;

      const requestA = elderA.requests[a.requestIndex];
      const requestB = elderB.requests[b.requestIndex];

      return (
        new Date(requestB.createdAt).getTime() -
        new Date(requestA.createdAt).getTime()
      );
    });

    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: allRequests,
      count: allRequests.length,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch help requests',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Get database statistics
 */
apiRouter.get('/stats', async (req, res) => {
  try {
    const [eldersCount, volunteersCount, openRequestsAgg, urgentRequestsAgg] =
      await Promise.all([
        ElderProfile.countDocuments({ isActive: true }),
        UserEnhanced.countDocuments({ userType: 'volunteer', isActive: true }),
        ElderProfile.aggregate([
          { $unwind: '$requests' },
          { $match: { 'requests.status': 'open' } },
          { $count: 'total' },
        ]),
        ElderProfile.aggregate([
          { $unwind: '$requests' },
          {
            $match: { 'requests.status': 'open', 'requests.priority': 'high' },
          },
          { $count: 'total' },
        ]),
      ]);

    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: {
        elders: eldersCount,
        volunteers: volunteersCount,
        openRequests: openRequestsAgg[0]?.total || 0,
        urgentRequests: urgentRequestsAgg[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// **** Export default **** //
export default apiRouter;
