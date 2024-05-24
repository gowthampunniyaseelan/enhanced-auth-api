const authService = require('../services/authService');
const authController = {
    async register(req, res) {
      try {
        const result = await authService.registerUser(req.body);
        const expirationTime = 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + expirationTime);
        res.setHeader('Set-Cookie', `session_id=${result.token}; Expires=${expirationDate.toUTCString()}; HttpOnly`);
        res.writeHead(201, {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${result.token}`
      });
        res.end(JSON.stringify(result));
      } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
      }
    },

    async login(req, res) {
          try {
              const { email, password } = req.body;
              const result = await authService.loginUser({ email, password });
              const expirationTime = 24 * 60 * 60 * 1000;
              const expirationDate = new Date(Date.now() + expirationTime);
              res.setHeader('Set-Cookie', `session_id=${result.token}; Expires=${expirationDate.toUTCString()}; HttpOnly`);
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${result.token}`
              });
              res.end(JSON.stringify(result));
          } catch (error) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: error.message }));
          }
  },
  oauthCallback: (provider) => (req, res) => {
    passport.authenticate(provider, { session: false }, (err, user) => {
        if (err || !user) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Authentication failed' }));
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        res.end(JSON.stringify({ token }));
    })(req, res);
  },
  async logout(req,res) {
    try{
      return await authService.logout(res);
    }catch(error){
      res.end(JSON.stringify({ error: error.message }));
    }
  }
};

module.exports = authController;
