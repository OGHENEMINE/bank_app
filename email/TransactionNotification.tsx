import {
  Column,
  Container,
  Head,
  Html,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function TransactionNotification({
  accountNumber,
  transactionType,
  transactionAmount,
  createdAt,
  availableBalance,
  transactionNarration,
  transactionStatus,
}: {
  accountNumber: string;
  transactionType: string;
  transactionAmount: string;
  createdAt: string;
  availableBalance: string;
  transactionNarration: string;
  transactionStatus: string;
}) {
  return (
    <Tailwind>
      <Html>
        <Head></Head>
        <Container>
          <Text>
            Be informed that a transaction has been made on your account with
            the following details:
          </Text>

          <Text className="text-right text-sm">{createdAt}</Text>

          <Section className="bg-slate-100 px-2 py-2 lg:px-10 font-light">
            <Row>
              <Column>
                <Text className=" tracking-wider">Account Number</Text>
              </Column>
              <Column className="text-right tracking-wider">
                <Text>{accountNumber}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="capitalize tracking-wider">
                  {transactionType} Alert
                </Text>
              </Column>
              <Column className="text-right tracking-wider">
                {transactionAmount}
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className=" tracking-wider">Available Balance</Text>
              </Column>
              <Column className="text-right tracking-wider">
                {availableBalance}
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className=" tracking-wider">Status</Text>
              </Column>
              <Column className="text-right tracking-wider">
                {transactionStatus}
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className=" tracking-wider">Narration</Text>
              </Column>
              <Column className="text-right tracking-wider">
                {transactionNarration}
              </Column>
            </Row>
          </Section>

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
