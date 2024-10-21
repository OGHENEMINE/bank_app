import {
  Body,
  Button,
  Container,
  Heading,
  Html,
  Img,
  Link,
  Tailwind,
  Text,
} from "@react-email/components";

export default function VerifyEmail({
  link,
  username,
}: {
  link: string;
  username: string;
}) {
  return (
    <Tailwind>
      <Html>
        <Body>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
            {/* <Img /> //image must be png
              style={{}}
              src={process.env.NEXT_PUBLIC_SITE_LOGO}
              alt="The site logo"
              width="150"
              height="100"
            /> */}
            <Text>
              Hello, <span className="font-medium">{username}</span>,
            </Text>
            <Text>
              Thank you for choosing to bank with us. We are excited to have you
              join our community. Simply click the link below to activate your
              account. The link expires in 1 hour.
            </Text>
            <div className="flex items-center justify-center">
              <Button
                href={link}
                className="font-medium bg-[#000024] text-center py-3.5 w-full shadow text-white tracking-widest rounded mx-auto"
              >
                Verify my email
              </Button>
            </div>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you did not register for an account, ignore this email or
              contact our support team at{" "}
              <span className="text-blue-500">
                [Support Email/Phone Number]
              </span>{" "}
              if you have any questions.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
