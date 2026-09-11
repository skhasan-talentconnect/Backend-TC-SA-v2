import jwt from 'jsonwebtoken';
import Auth from '../models/auth-model.js';
import { googleClient } from '../utils/google-client.js';

export const handleGoogleAuthService = async (tokenId, accountType) => {
  if (!tokenId) {
    throw { status: 400, message: 'Google tokenId is required' };
  }
  if (!accountType || !['school_user', 'school'].includes(accountType)) {
      throw { status: 400, message: 'Invalid account type for school portal.' };
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID || '809028962389-buh0m92ilhd1n27vkuhi1og76g9kb5v2.apps.googleusercontent.com',
  });

  const payload = ticket.getPayload();
  const { email } = payload;

  let existingAuth = await Auth.findOne({ email });

  if (existingAuth) {
      if (accountType === 'school' && existingAuth.userType !== 'school') {
          throw { status: 401, message: 'Invalid credentials or account type.' };
      }
      if (accountType === 'school_user' && !['student', 'parent'].includes(existingAuth.userType)) {
          throw { status: 401, message: 'Invalid credentials or account type.' };
      }
  } else {
    // If not existing, assign userType based on accountType
    const userType = accountType === 'school' ? 'school' : 'student';
    existingAuth = new Auth({
      email,
      authProvider: 'google',
      userType,
      isEmailVerified: true,
    });
    await existingAuth.save();
  }

  const token = jwt.sign(
    { id: existingAuth._id, email: existingAuth.email, userType: existingAuth.userType },
    process.env.SECRET,
    { expiresIn: '7d' }
  );

  return { auth: existingAuth, token };
};
