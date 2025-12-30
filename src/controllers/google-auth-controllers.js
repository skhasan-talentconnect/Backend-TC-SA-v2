import { handleGoogleAuthService, handleWebGoogleAuthService } from '../services/google-auth-services.js';

export const googleAuth = async (req, res) => {
  try {
    const { tokenId, userType } = req.body;

    const { auth, token } = await handleGoogleAuthService(tokenId, userType);

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

export const googleWebAuth = async (req, res) => {
  try {
    const { tokenId, userType } = req.body;

    const { auth, token } = await handleWebGoogleAuthService(tokenId, userType);

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