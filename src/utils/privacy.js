export const getPrivacyPage = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Privacy Policy | Synzy</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #FFD600, #FFEA00);
          color: #333;
          margin: 20;
          padding: 0;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          width: 90%;
          max-width: 900px;
          padding: 40px;
          overflow-y: auto;
          max-height: 90vh;
        }
        h1 {
          color: #ffb300;
          text-align: center;
          font-size: 2.2em;
          margin-bottom: 10px;
        }
        h2 {
          color: #444;
          margin-top: 1.4em;
          font-size: 1.4em;
        }
        p, li {
          font-size: 1em;
          line-height: 1.6;
          color: #555;
        }
        a {
          color: #ffb300;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        ul {
          margin-top: 8px;
          padding-left: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Privacy Policy for Synzy</h1>
        <p><strong>Effective Date:</strong> 5th November 2025</p>
        <p>The Synzy team values your trust and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information through the <strong>Synzy</strong> mobile and web application (“App”).</p>
        
        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> Student and parent names, phone numbers, email addresses, preferences, previous school data, admission-related information, age, profile data, and student IDs.</li>
          <li><strong>Authentication Information:</strong> Mobile number verification (via OTP) and Google account details for login.</li>
          <li><strong>Academic Data:</strong> Attendance, grades, assignments, and exam reports.</li>
          <li><strong>Device and Technical Data:</strong> IP address, device type, browser, and usage logs.</li>
          <li><strong>Communications:</strong> Messages or interactions with schools and support.</li>
        </ul>

        <h2>2. How We Use the Information</h2>
        <ul>
          <li>Provide secure login access for students, parents, and staff.</li>
          <li>Deliver academic and administrative updates.</li>
          <li>Communicate important school announcements and notifications.</li>
          <li>Maintain track of admission forms.</li>
          <li>Improve the app’s functionality and user experience.</li>
        </ul>
        <p>We do not sell or rent any personal data to third parties.</p>

        <h2>3. Third-Party Services We Use</h2>
        <p>We integrate a few trusted third-party APIs and services to enhance the App’s functionality:</p>
        <ul>
          <li><strong>Twilio:</strong> Used to send OTPs for secure mobile number verification during sign-in.</li>
          <li><strong>Google OAuth:</strong> Used to enable users to sign in securely with their Google accounts.</li>
          <li><strong>Cloudinary:</strong> Used for storing and managing uploaded images (e.g., school pictures, etc.).</li>
          <li><strong>Nodemailer:</strong> Used to send automated emails such as notifications or secure signing in.</li>
        </ul>
        <p>Each third-party service has its own privacy policy governing the use of information. We recommend reviewing their policies:</p>
        <ul>
          <li><a href="https://www.twilio.com/legal/privacy" target="_blank">Twilio Privacy Policy</a></li>
          <li><a href="https://policies.google.com/privacy" target="_blank">Google Privacy Policy</a></li>
          <li><a href="https://cloudinary.com/privacy" target="_blank">Cloudinary Privacy Policy</a></li>
          <li><a href="https://nodemailer.com/about/" target="_blank">Nodemailer Privacy Policy</a></li>
        </ul>
        <p>We ensure that all third-party integrations comply with applicable data protection laws and are used solely for the purposes described above.</p>

        <h2>4. Data Storage and Security</h2>
        <p>Your information is stored securely using access control measures. We take reasonable technical and organizational steps to protect your data from unauthorized access, alteration, or disclosure.</p>

        <h2>5. Data Sharing</h2>
        <ul>
          <li>Authorized school administrators and teachers for legitimate educational purposes.</li>
          <li>Service providers assisting in app operations (bound by confidentiality agreements).</li>
          <li>Government authorities when required by law.</li>
        </ul>
        <p>We never share personal data for commercial purposes.</p>

        <h2>6. Cookies and Analytics</h2>
        <p>We may use cookies or analytics tools to improve performance and understand app usage patterns. These do not collect personally identifiable data without consent.</p>

        <h2>7. User Rights</h2>
        <ul>
          <li>Request access, correction, or deletion of their personal data.</li>
          <li>Withdraw consent for processing where applicable.</li>
          <li>Request deletion of account and related data.</li>
        </ul>

        <h2>8. Changes to this Policy</h2>
        <p>We may update this Privacy Policy periodically. The latest version will always be available on our app and website. Continued use of the app after any update constitutes acceptance of the revised policy.</p>

        <h2>9. Contact Us</h2>
        <p>For any questions or concerns about this Privacy Policy, please contact:</p>
        <p><strong>Synzy</strong><br>
        Email: <a href="mailto:synzy2025@gmail.com">synzy2025@gmail.com</a></p>
      </div>
    </body>
    </html>
  `;
};