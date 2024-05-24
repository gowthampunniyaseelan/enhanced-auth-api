const profileController = require('../controllers/profileController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require("../middlewares/authMiddleware");
const profileRoutes = [
    {
        path: '/api/profile',
        method: 'GET',
        handler: profileController.getProfile,
        middleware:[authMiddleware]
    },
    {
      path: '/api/all/profile',
      method: 'GET',
      handler: profileController.listAllProfiles,
      middleware:[adminMiddleware]
    },
    {
      path: '/api/public/profile',
      method: 'GET',
      handler: profileController.listPublicProfiles,
      middleware:[authMiddleware]
    },
    {
      path: '/api/role/profile',
      method: 'GET',
      handler: profileController.getRoleProfile,
      middleware:[authMiddleware]
    },
    {
      path: '/api/update/profile',
      method: 'PUT',
      handler: profileController.updateProfile,
      middleware:[authMiddleware]
    },
];

module.exports = profileRoutes;
