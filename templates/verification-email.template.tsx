import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

type Props = {
  subject: string;
  username: string;
  href: string;
};

export const VerificationEmailTemplate = ({
  subject,
  username,
  href,
}: Props) => {
  return (
    <Html>
      <Head />

      <Preview>{subject}</Preview>

      <Body
        style={{
          backgroundColor: "#fff",
          fontFamily: "sans-serif",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#000",
        }}
      >
        <Container
          style={{
            margin: "0 auto",
            padding: "16px 0 32px",
          }}
        >
          <Text>
            Hi {username},{" "}
            <Link
              href={href}
              style={{
                color: "#BB86DB",
              }}
            >
              click for verify
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
