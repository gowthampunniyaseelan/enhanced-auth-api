const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');

const loadRoutes = () => {
    return [
        ...authRoutes,
        ...profileRoutes,
    ];
};

module.exports = { loadRoutes };
