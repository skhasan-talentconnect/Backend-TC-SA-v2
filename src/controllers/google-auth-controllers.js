import { handleGoogleAuthService } from '../services/google-auth-services.js';

export const googleAuth = async (req, res) => {
  try {
    const { tokenId, accountType } = req.body;

    const { auth, token } = await handleGoogleAuthService(tokenId, accountType);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        auth,
        token,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(error.status || 500).json({
      status: 'failed',
      message: error.message || 'Google authentication failed',
    });
  }
};