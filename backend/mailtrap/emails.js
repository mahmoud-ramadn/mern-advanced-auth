import { log } from "console";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email, name }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid:"ef2676b3-2a2f-486b-b35c-42a9e61ff066",
      template_variables: {
        name,
      },
    });

    console.log(" wellcome Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);

    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Password Reset Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending Password Reset Email`, error);

    throw new Error(`Error sending Password Reset Email: ${error}`);
  }
};

export const sendResetPasswordSuccessfullyEmail = async (email) => {
  const recipient = [{ email }];
  console.log("Sending reset password successful email to:", email);
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Reset Password Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending Password Reset Email`, error);
  }
};
