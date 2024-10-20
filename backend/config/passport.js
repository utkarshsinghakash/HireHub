import session from "express-session"; // Import express-session
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your database
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = await User.create({
            fullname: profile.displayName,
            email: profile.emails[0].value,
            role: "candidate", // You can also let the user choose a role later
            googleId: profile.id,
            profile: {
              profilePhoto: profile.photos[0].value,
            },
          });
        }

        // Generate JWT token
        const tokenData = {
          userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
