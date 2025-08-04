import { Router } from 'express';
import ElderProfile from '@src/models/ElderProfile';
import UserEnhanced from '@src/models/UserEnhanced';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

// **** Variables **** //
const apiRouter = Router();

// **** Routes **** //

/**
 * Get all elder profiles
 */
apiRouter.get('/elders', async (req, res) => {
  try {
    const elders = await ElderProfile.find({ isActive: true })
      .select('name age location interests avatar openRequestsCount urgentRequestsCount')
      .sort({ createdAt: -1 });
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: elders,
      count: elders.length
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch elder profiles',
      error: error instanceof Error ? error.message : 'Unknown error'
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
        message: 'Elder profile not found'
      });
    }
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: elder
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch elder profile',
      error: error instanceof Error ? error.message : 'Unknown error'
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
      isApproved: true
    })
    .select('name location volunteerInfo.skills volunteerInfo.rating avatar')
    .sort({ 'volunteerInfo.rating': -1 });
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: volunteers,
      count: volunteers.length
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Search elders by location or interests
 */
apiRouter.get('/elders/search', async (req, res) => {
  try {
    const { location, interests, hasOpenRequests } = req.query;
    
    let query: any = { isActive: true };
    
    if (location) {
      query['location.address'] = { $regex: location, $options: 'i' };
    }
    
    if (interests) {
      const interestArray = (interests as string).split(',').map(i => i.trim());
      query.interests = { $in: interestArray };
    }
    
    let elders = await ElderProfile.find(query)
      .select('name age location interests avatar requests')
      .sort({ createdAt: -1 });
    
    // Filter by open requests if requested
    if (hasOpenRequests === 'true') {
      elders = elders.filter(elder => 
        elder.requests.some(req => req.status === 'open')
      );
    }
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: elders,
      count: elders.length
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Search failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Get database statistics
 */
apiRouter.get('/stats', async (req, res) => {
  try {
    const [
      eldersCount,
      volunteersCount,
      openRequestsAgg,
      urgentRequestsAgg
    ] = await Promise.all([
      ElderProfile.countDocuments({ isActive: true }),
      UserEnhanced.countDocuments({ userType: 'volunteer', isActive: true }),
      ElderProfile.aggregate([
        { $unwind: '$requests' },
        { $match: { 'requests.status': 'open' } },
        { $count: 'total' }
      ]),
      ElderProfile.aggregate([
        { $unwind: '$requests' },
        { $match: { 'requests.status': 'open', 'requests.priority': 'high' } },
        { $count: 'total' }
      ])
    ]);
    
    res.status(HttpStatusCodes.OK).json({
      success: true,
      data: {
        elders: eldersCount,
        volunteers: volunteersCount,
        openRequests: openRequestsAgg[0]?.total || 0,
        urgentRequests: urgentRequestsAgg[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// **** Export default **** //
export default apiRouter;
