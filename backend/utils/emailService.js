import { transporter } from "../config/mail.js";

export async function Send_Email(user_register) {
  await transporter.sendMail({
    from: `"Hospital Management Team" <${process.env.EMAIL_USER}>`,
    to: user_register.Email,
    subject: "Welcome to Hospital Management System 🎉",

    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #333333;
          }

          .email-container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }

          .header {
            background: #0d6efd;
            padding: 28px 20px;
            text-align: center;
            color: white;
          }

          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .header-text {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
          }

          .content {
            padding: 35px 30px;
          }

          .welcome {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 12px;
            color: #222222;
          }

          .description {
            font-size: 15px;
            line-height: 1.7;
            color: #666666;
          }

          .user-card {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
          }

          .user-card-title {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #333333;
          }

          .detail {
            margin: 10px 0;
            font-size: 14px;
          }

          .label {
            color: #777777;
          }

          .value {
            color: #222222;
            font-weight: 600;
          }

          .button-container {
            text-align: center;
            margin: 30px 0;
          }

          .login-button {
            display: inline-block;
            background: #0d6efd;
            color: #ffffff !important;
            text-decoration: none;
            padding: 13px 30px;
            border-radius: 7px;
            font-size: 15px;
            font-weight: bold;
          }

          .support {
            background: #f0f7ff;
            border-radius: 8px;
            padding: 18px;
            margin-top: 25px;
            font-size: 13px;
            color: #555555;
            line-height: 1.6;
          }

          .footer {
            background: #f8f9fa;
            text-align: center;
            padding: 22px;
            font-size: 12px;
            color: #888888;
          }

          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>

      <body>

        <div class="email-container">

          <!-- Header -->
          <div class="header">

            <div class="logo">
              🏥 Hospital Management
            </div>

            <p class="header-text">
              Healthcare Management System
            </p>

          </div>


          <!-- Main Content -->
          <div class="content">

            <h1 class="welcome">
              Welcome, ${user_register.UserName}! 👋
            </h1>

            <p class="description">
              Thank you for registering with our
              <strong>Hospital Management System</strong>.
              Your account has been successfully created.
            </p>


            <!-- User Information -->
            <div class="user-card">

              <div class="user-card-title">
                👤 Your Account Details
              </div>

              <div class="detail">
                <span class="label">Username:</span>
                <span class="value">${user_register.UserName}</span>
              </div>

              <div class="detail">
                <span class="label">Email:</span>
                <span class="value">${user_register.Email}</span>
              </div>

              <div class="detail">
                <span class="label">Registration Date:</span>
                <span class="value">
                  ${new Date().toLocaleDateString("en-IN")}
                </span>
              </div>

            </div>


            <!-- Login Button -->
            <div class="button-container">

              <a
                href="http://localhost:3000/login"
                class="login-button"
              >
                Login to Your Account →
              </a>

            </div>


            <p class="description">
              You can now log in to your account and access the
              hospital management system.
            </p>


            <!-- Support -->
            <div class="support">

              <strong>Need Help?</strong>

              <br />

              If you have any questions or face any issues,
              please contact our support team.

              <br />

              📞 Support: +91 98765 43210

              <br />

              📧 Email: support@hospital.com

            </div>

          </div>


          <!-- Footer -->
          <div class="footer">

            <p>
              © ${new Date().getFullYear()}
              Hospital Management System
            </p>

            <p>
              This is an automated email. Please do not reply.
            </p>

            <p>
              All rights reserved.
            </p>

          </div>

        </div>

      </body>
      </html>
    `,
  });
  console.log(`Registration email sent to: ${user_register.Email}`);
}

export async function Send_Otp(user, otp) {
  await transporter.sendMail({
    from: `"Hospital Management Team" <${process.env.EMAIL_USER}>`,
    to: user.Email,
    subject: "Password Reset OTP - Hospital Management System",

    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f7fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #333333;
          }

          .container {
            max-width: 560px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }

          .header {
            background-color: #0d6efd;
            color: #ffffff;
            text-align: center;
            padding: 28px 20px;
          }

          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 6px;
          }

          .header-text {
            margin: 0;
            font-size: 13px;
            opacity: 0.9;
          }

          .content {
            padding: 35px 30px;
            text-align: center;
          }

          .greeting {
            font-size: 22px;
            margin: 0 0 12px;
            color: #222222;
          }

          .message {
            font-size: 15px;
            line-height: 1.7;
            color: #666666;
          }

          .otp-box {
            margin: 28px 0;
            padding: 20px;
            background-color: #f0f7ff;
            border: 1px solid #d7e9ff;
            border-radius: 10px;
          }

          .otp-label {
            margin: 0 0 8px;
            font-size: 13px;
            color: #777777;
          }

          .otp {
            margin: 0;
            font-size: 32px;
            letter-spacing: 8px;
            font-weight: bold;
            color: #0d6efd;
          }

          .expiry {
            font-size: 13px;
            color: #777777;
            margin-top: 18px;
          }

          .security {
            margin-top: 25px;
            padding: 15px;
            background-color: #fff8e6;
            border-radius: 8px;
            text-align: left;
            font-size: 13px;
            line-height: 1.6;
            color: #666666;
          }

          .footer {
            background-color: #f8f9fa;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #888888;
          }

          .footer p {
            margin: 5px 0;
          }
        </style>
      </head>

      <body>

        <div class="container">

          <div class="header">
            <div class="logo">🏥 Hospital Management</div>
            <p class="header-text">
              Secure Healthcare Management System
            </p>
          </div>

          <div class="content">

            <h2 class="greeting">
              Hello ${user.UserName} 👋
            </h2>

            <p class="message">
              We received a request to reset the password for your
              Hospital Management System account.
            </p>

            <div class="otp-box">

              <p class="otp-label">
                Your Password Reset OTP
              </p>

              <h1 class="otp">
                ${otp}
              </h1>

              <p class="expiry">
                This OTP is valid for <strong>5 minutes</strong>.
              </p>

            </div>

            <div class="security">
              🔒 <strong>Security Notice:</strong><br>
              Never share this OTP with anyone. Our team will never
              ask you to share your password or OTP.
            </div>

            <p class="message">
              If you did not request a password reset, you can safely
              ignore this email.
            </p>

          </div>

          <div class="footer">
            <p>
              © ${new Date().getFullYear()} Hospital Management System
            </p>
            <p>
              This is an automated email. Please do not reply.
            </p>
          </div>

        </div>

      </body>
      </html>
    `,
  });
}

export async function Send_Appointment_Email(appointment_details) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: appointment_details.ClientEmail,
    subject: "✅ Appointment Confirmed – Thank You!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fc;">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fc; padding: 40px 0;">
          <tr>
            <td align="center">

              <!-- Email Card -->
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); overflow: hidden;">

                <!-- Header (Brand + Accent) -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 32px 40px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
                      🏥 MediCare
                    </h1>
                    <p style="color: #bfdbfe; font-size: 16px; margin: 6px 0 0 0; font-weight: 300;">
                      Your Health, Our Priority
                    </p>
                  </td>
                </tr>

                <!-- Body Content -->
                <tr>
                  <td style="padding: 40px 40px 30px 40px;">
                    
                    <!-- Greeting -->
                    <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 8px 0;">
                      Hello ${appointment_details.ClientName}! 👋
                    </h2>
                    <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                      Your appointment has been <strong style="color: #16a34a;">confirmed</strong>. 
                      Please find the details below:
                    </p>

                    <!-- Appointment Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #2563eb; padding: 0;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            
                            <!-- Doctor -->
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: #64748b; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">👨‍⚕️ Doctor</span>
                                <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 4px 0 0 0;">
                                  ${appointment_details.Doctors}
                                </p>
                              </td>
                            </tr>

                            <!-- Date -->
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: #64748b; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">📅 Date</span>
                                <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 4px 0 0 0;">
                                  ${new Date(
                                    appointment_details.Date,
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </td>
                            </tr>

                            <!-- Time (if available) -->
                            ${
                              appointment_details.Time
                                ? `
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: #64748b; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">⏰ Time</span>
                                <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 4px 0 0 0;">
                                  ${appointment_details.Time}
                                </p>
                              </td>
                            </tr>
                            `
                                : ""
                            }

                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Additional Info -->
                    <div style="margin: 28px 0 0 0; padding: 16px 20px; background-color: #fef9e7; border-radius: 10px; border-left: 4px solid #f59e0b;">
                      <p style="color: #78350f; font-size: 14px; margin: 0; line-height: 1.5;">
                        💡 <strong>Please arrive 15 minutes early</strong> with your ID and prior medical records (if any).
                      </p>
                    </div>

                    <p style="color: #94a3b8; font-size: 13px; text-align: center; margin: 20px 0 0 0;">
                      Or call us at <strong style="color: #1e293b;">+1 (800) 123-4567</strong> to reschedule.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f1f5f9; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #64748b; font-size: 13px; margin: 0 0 6px 0;">
                      © ${new Date().getFullYear()} MediCare Hospital. All rights reserved.
                    </p>
                    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                      123 Health Blvd, Wellness City, HC 56789
                    </p>
                    <p style="color: #94a3b8; font-size: 12px; margin: 8px 0 0 0;">
                      <a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> · 
                      <a href="#" style="color: #2563eb; text-decoration: none;">Privacy Policy</a>
                    </p>
                  </td>
                </tr>

              </table>
              <!-- End Card -->

            </td>
          </tr>
        </table>

      </body>
      </html>
    `,
  });
}
