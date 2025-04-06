const verificationMailTemplate = (fullname, verificationCode) => {
  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <title>Account Verification Code from Shortly</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #111827;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 40px auto;
          background-color: #1f2937;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
        }
        .header h1 {
          font-size: 40px;
          color: #34d399;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .content {
          font-size: 18px;
          line-height: 1.6;
          color: #d1d5db;
          text-align: left;
          font-weight: 400;
        }
        .code-label {
          font-size: 18px;
          margin-bottom: 4px;
          color: #d1d5db;
          font-weight: 400;
        }
        .code-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .code {
          background-color: #374151;
          color: #34d399;
          font-size: 30px;
          font-weight: 600;
          padding: 15px 30px;
          border-radius: 10px;
          letter-spacing: 5px;
          text-align: center;
          word-break: break-word;
        }
        .medium-text {
          font-size: 13px;
          font-weight: 300;
        }
        .small-text {
          font-size: 12px;
          text-align: center;
          color: #9ca3af;
          margin-top: 10px;
          font-weight: 300;
        }
        .link {
          text-decoration: underline;
          color: #34d399;
        }
        @media (max-width: 480px) {
          .container {
            padding: 20px;
          }
          .header h1 {
            font-size: 30px;
          }
          .content {
            font-size: 16px;
          }
          .code {
            font-size: 26px;
            padding: 10px 20px;
          }
          .medium-text {
            font-size: 12px;
          }
          .small-text {
            font-size: 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Account Verification Code</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${fullname}</strong>,</p>
          <p>We have received a request to verify your Shortly account. Please use the code below to complete the verification process and activate your account.</p>
          <div class="code-container">
            <p class="code" id="verification-code">${verificationCode}</p>
          </div>
          <p class="medium-text">This code expires in 15 minutes. If you do not use it within this timeframe, you will need to request a new one.</p>
          <p class="small-text">If you have any concerns, feel free to <a href='#' class="link">contact support</a>.</p>
          <p class="small-text">This email was sent by Shortly. If you did not request this, please ignore it.</p>
        </div>
      </div>
    </body>
    </html>`;
};

const newLoginMailTemplate = (fullname, reqDetails) => {
  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <title>New Login Attempt to Your Shortly Account</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #111827;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 40px auto;
          background-color: #1f2937;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
        }
        .header h1 {
          font-size: 40px;
          color: #34d399;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .content {
          font-size: 18px;
          line-height: 1.6;
          color: #d1d5db;
          text-align: left;
          font-weight: 400;
        }
        .details-box {
          background-color: #374151;
          border-left: 5px solid #34d399;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
          font-weight: 300;
        }
        .details-box ul {
          list-style: none;
          padding: 0;
        }
        .details-box li {
          font-size: 16px;
          margin-bottom: 8px;
          color: #d1d5db;
        }
        .medium-text {
          font-size: 13px;
        }
        .small-text {
          font-size: 12px;
          text-align: center;
          color: #9ca3af;
          margin-top: 10px;
        }
        .link {
          text-decoration: underline;
          color: #34d399;
        }
        @media (max-width: 480px) {
          .container {
            padding: 20px;
          }
          .header h1 {
            font-size: 30px;
          }
          .content {
            font-size: 16px;
          }
          .details-box li {
            font-size: 14px;
          }
          .medium-text {
            font-size: 12px;
          }
          .small-text {
            font-size: 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Login Attempt</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${fullname}</strong>,</p>
          <p>We noticed a recent login attempt to your Shortly account.</p> 
          
          <div class="details-box">
            <h3>Was this you?</h3>
            <ul>
              <li><strong>IP Address:</strong> ${reqDetails.ip}</li>
              <li><strong>Location:</strong> ${reqDetails.location}</li>
              <li><strong>Device:</strong> ${reqDetails.device}</li>
              <li><strong>Time:</strong> ${reqDetails.timestamp}</li>
            </ul>
          </div>

          <p>If this was you, there's no need to take any further action. <br><br> If you did not make this request, please secure your account immediately.</p>

          <p class="small-text">If you have any concerns, feel free to <a href="#" class="link">contact support</a>.</p>
          <p class="small-text">This email was sent by Shortly. If you did not request this, please ignore it.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

const passwordResetMailTemplate = (fullname, verificationCode) => {
  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <title>Account Verification Code from Shortly</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #111827;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 40px auto;
          background-color: #1f2937;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
        }
        .header h1 {
          font-size: 40px;
          color: #34d399;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .content {
          font-size: 18px;
          line-height: 1.6;
          color: #d1d5db;
          text-align: left;
          font-weight: 400;
        }
        .code-label {
          font-size: 18px;
          margin-bottom: 4px;
          color: #d1d5db;
          font-weight: 400;
        }
        .code-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .code {
          background-color: #374151;
          color: #34d399;
          font-size: 30px;
          font-weight: 600;
          padding: 15px 30px;
          border-radius: 10px;
          letter-spacing: 5px;
          text-align: center;
          word-break: break-word;
        }
        .medium-text {
          font-size: 13px;
          font-weight: 300;
        }
        .small-text {
          font-size: 12px;
          text-align: center;
          color: #9ca3af;
          margin-top: 10px;
          font-weight: 300;
        }
        .link {
          text-decoration: underline;
          color: #34d399;
        }
        @media (max-width: 480px) {
          .container {
            padding: 20px;
          }
          .header h1 {
            font-size: 30px;
          }
          .content {
            font-size: 16px;
          }
          .code {
            font-size: 26px;
            padding: 10px 20px;
          }
          .medium-text {
            font-size: 12px;
          }
          .small-text {
            font-size: 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Verification Code</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${fullname}</strong>,</p>
          <p>We have received a request to reset your Shortly account. Please use the code below to complete the password reset process.</p>
          <div class="code-container">
            <p class="code" id="verification-code">${verificationCode}</p>
          </div>
          <p class="medium-text">This code expires in 15 minutes. If you do not use it within this timeframe, you will need to request a new one.</p>
          <p class="small-text">If you have any concerns, feel free to <a href='#' class="link">contact support</a>.</p>
          <p class="small-text">This email was sent by Shortly. If you did not request this, please ignore it.</p>
        </div>
      </div>
    </body>
    </html>`;
};

const passwordChangedMessageTemplate = (fullname) => {
  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <title>Password Reset Successful - Shortly</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #111827;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 40px auto;
          background-color: #1f2937;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
        }
        .header h1 {
          font-size: 36px;
          color: #34d399;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 600;
        }
        .content {
          font-size: 18px;
          line-height: 1.6;
          color: #d1d5db;
          text-align: left;
        }
        .small-text {
          font-size: 12px;
          text-align: center;
          color: #9ca3af;
          margin-top: 10px;
          font-weight: 300;
        }
        .link {
          text-decoration: underline;
          color: #34d399;
        }
        @media (max-width: 480px) {
          .container {
            padding: 20px;
          }
          .header h1 {
            font-size: 30px;
          }
          .content {
            font-size: 16px;
          }
          .small-text {
            font-size: 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Successful</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${fullname}</strong>,</p>
          <p>Your password has been successfully reset. You can now log in to your Shortly account using your new password.</p>
          <p>If you did not request this change, please reset your password immediately and contact our support team.</p>
          <p class="small-text">If you have any questions or concerns, feel free to <a href='#' class="link">contact support</a>.</p>
          <p class="small-text">This email was sent by Shortly. If you did not request a password reset, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>`;
};

const accountVerifiedMessageTemplate = (fullname) => {
  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <title>Welcome to Shortly - Account Verified</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          background-color: #111827;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 40px auto;
          background-color: #1f2937;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
        }
        .header h1 {
          font-size: 36px;
          color: #34d399;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 600;
        }
        .content {
          font-size: 18px;
          line-height: 1.6;
          color: #d1d5db;
          text-align: left;
        }
        .button-container {
          text-align: center;
          margin-top: 20px;
        }
        .button {
          background-color: #34d399;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-block;
        }
        .small-text {
          font-size: 12px;
          text-align: center;
          color: #9ca3af;
          margin-top: 10px;
          font-weight: 300;
        }
        .link {
          text-decoration: underline;
          color: #34d399;
        }
        @media (max-width: 480px) {
          .container {
            padding: 20px;
          }
          .header h1 {
            font-size: 30px;
          }
          .content {
            font-size: 16px;
          }
          .button {
            font-size: 14px;
            padding: 10px 20px;
          }
          .small-text {
            font-size: 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Shortly!</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${fullname}</strong>,</p>
          <p>Thank you for signing up on Shortly! Your account has been successfully created.</p>
          <p>Get started by logging in and exploring all the features Shortly has to offer.</p>
          <div class="button-container">
            <a href="#" class="button">Go to Dashboard</a>
          </div>
          <p class="small-text">If you have any questions or need assistance, feel free to <a href='#' class="link">contact support</a>.</p>
          <p class="small-text">Welcome aboard, and happy shortening!</p>
        </div>
      </div>
    </body>
    </html>`;
};

export {
  verificationMailTemplate,
  newLoginMailTemplate,
  passwordResetMailTemplate,
  passwordChangedMessageTemplate,
  accountVerifiedMessageTemplate,
};
