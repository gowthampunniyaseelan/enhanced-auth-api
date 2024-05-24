const User = require('../models/User');
const bcrypt = require('bcryptjs');
const verifyUserOrAdmin = require("../util/verifyUserOrAdmin")
const profileService = {
    async getProfile(userId,req,res) {
        try {
            let user;
            if(await verifyUserOrAdmin(req,res)){
              user = await User.find({_id: userId});
            }else{
              user = await User.find({_id: userId,isPublic:true});
            }
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateProfile(userId, updatedData) {
        try {
            const { isAdmin, ...filteredData } = updatedData;
            const salt = await bcrypt.genSalt(10);
            if(updatedData.password){
              const hashedPassword = await bcrypt.hash(updatedData.password, salt);
              filteredData.password = hashedPassword
            }
            
            const user = await User.findByIdAndUpdate(userId, filteredData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return { message: 'Profile updated successfully',user};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async listPublicProfiles() {
        try {
            const publicProfiles = await User.find({ isPublic: true });
            return publicProfiles;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async listAllProfiles() {
        try {
            const allProfiles = await User.find();
            return allProfiles;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getRoleProfile(userRole,req,res) {
      try {
          let user;
          if(await verifyUserOrAdmin(req,res)){
            user = await User.find({role: userRole});
          }else{
            user = await User.find({role: userRole,isPublic:true});
          }
          if (!user) {
              throw new Error('User not found');
          }
          return user;
      } catch (error) {
          throw new Error(error.message);
      }
  },
    
};

module.exports = profileService;
