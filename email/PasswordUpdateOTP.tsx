import {
  Button,
  Container,
  Heading,
  Html,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function PasswordUpdateOTP({
  otp,
  username,
}: {
  otp: string;
  username: string;
}) {
  return (
    <Tailwind>
      <Html>
        <Container>
          <Text>Dear {username},</Text>
          <Text>
            We have received a request to recover your account password. Please
            use the One-Time Password (OTP) below to complete the process:
          </Text>
          <Heading as="h1">{otp}</Heading>
          <Text>
            This OTP is valid for 10 minutes. If you did not request a password
            recovery, please disregard this email. If you have any questions or
            need further assistance, please contact our support team at
            support@yourbank.com.
          </Text>
          <Text>&copy; 2024 Your Bank. All rights reserved.</Text>
          <Text>
            <a href="https://www.yourbank.com/privacy-policy">Privacy Policy</a>{" "}
            |{" "}
            <a href="https://www.yourbank.com/terms-of-service">
              Terms of Service
            </a>
          </Text>
        </Container>
      </Html>
    </Tailwind>
  );
}
