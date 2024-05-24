const profileService = require('../services/profileService');
const querystring = require('querystring');
const url = require("url");

const profileController = {
   
    async getProfile(req, res) {
      try {
        const parsed = url.parse(req.url);
        const query  = querystring.parse(parsed.query);
        const userId = query.id;
        const userProfile = await profileService.getProfile(userId,req,res);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userProfile));
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }  
    },

    async updateProfile(req, res) {
        try {
            const parsed = url.parse(req.url);
            const query  = querystring.parse(parsed.query);
            const userId = query.id;
            const updatedData = req.body;
            const result = await profileService.updateProfile(userId, updatedData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
    },

    async listPublicProfiles(req, res) {
        try {
            const publicProfiles = await profileService.listPublicProfiles();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(publicProfiles));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
    },

    async listAllProfiles(req, res) {
      try {
        const allProfiles = await profileService.listAllProfiles();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allProfiles));
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
    },
    async getRoleProfile(req, res) {
      try {
        const parsed = url.parse(req.url);
        const query  = querystring.parse(parsed.query);
        const userRole = query.role;
        const userProfile = await profileService.getRoleProfile(userRole,req,res);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userProfile));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }  
    },
};

module.exports = profileController;
