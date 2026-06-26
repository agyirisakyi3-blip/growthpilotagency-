import {
  Html, Head, Preview, Body, Container, Section, Text, Link,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growthpilotagency.com";

type BaseProps = {
  previewText: string;
  children: React.ReactNode;
};

function BaseLayout({ previewText, children }: BaseProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>&#9650; GrowthPilot Agency</Text>
          </Section>

          <Section style={content}>{children}</Section>

          <Section style={footer}>
            <Text style={footerText}>
              GrowthPilot Agency &mdash; Abidjan, C&ocirc;te d&rsquo;Ivoire
            </Text>
            <Text style={footerLinks}>
              <Link href={baseUrl} style={link}>Website</Link>
              {" \u00b7 "}
              <Link href={`${baseUrl}/privacy`} style={link}>Privacy Policy</Link>
              {" \u00b7 "}
              <Link href={`${baseUrl}/contact`} style={link}>Contact</Link>
            </Text>
            {previewText.includes("unsubscribe") && (
              <Text style={unsubscribe}>
                <Link href={`${baseUrl}/unsubscribe`} style={link}>Unsubscribe</Link>
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <BaseLayout previewText={`Welcome to GrowthPilot Agency, ${name}!`}>
      <Text style={h1}>Welcome, {name}!</Text>
      <Text style={p}>
        Thank you for reaching out to GrowthPilot Agency. We&rsquo;re excited to work with you.
      </Text>
      <Text style={p}>
        Our team will review your inquiry and get back to you within 24 hours with a
        personalized strategy tailored to your business goals.
      </Text>
      <Text style={p}>
        In the meantime, feel free to browse our{" "}
        <Link href={`${baseUrl}/#case-studies`} style={link}>case studies</Link>{" "}
        to see how we&rsquo;ve helped businesses like yours grow.
      </Text>
      <Text style={p}>
        Best regards,<br />
        <strong>Agyiri Sakyi</strong><br />
        Founder &amp; CEO, GrowthPilot Agency
      </Text>
    </BaseLayout>
  );
}

export function ContactConfirmationEmail({ name, message }: { name: string; message: string }) {
  return (
    <BaseLayout previewText="We received your message">
      <Text style={h1}>We Received Your Message</Text>
      <Text style={p}>Hi {name},</Text>
      <Text style={p}>
        Thank you for contacting GrowthPilot Agency. We&rsquo;ve received your message and will
        respond within 24 hours.
      </Text>
      <Section style={quoteBox}>
        <Text style={quoteLabel}>Your message:</Text>
        <Text style={quoteText}>{message}</Text>
      </Section>
      <Text style={p}>
        If you have any urgent questions, feel free to reach out directly.
      </Text>
    </BaseLayout>
  );
}

export function NewsletterConfirmationEmail({ email }: { email: string }) {
  return (
    <BaseLayout previewText="You're subscribed! (unsubscribe anytime)">
      <Text style={h1}>You&rsquo;re Subscribed!</Text>
      <Text style={p}>
        Thanks for subscribing to GrowthPilot Agency updates at <strong>{email}</strong>.
      </Text>
      <Text style={p}>
        You&rsquo;ll receive our latest insights on SEO, AI automation, and digital growth
        strategies straight to your inbox.
      </Text>
      <Text style={p}>
        Keep an eye out for your free SEO checklist &mdash; it&rsquo;s on its way!
      </Text>
    </BaseLayout>
  );
}

export function PasswordResetEmail({ name, resetLink }: { name: string; resetLink: string }) {
  return (
    <BaseLayout previewText="Reset your password">
      <Text style={h1}>Reset Your Password</Text>
      <Text style={p}>Hi {name},</Text>
      <Text style={p}>
        We received a request to reset your password. Click the button below to create a new one.
        This link expires in 1 hour.
      </Text>
      <Section style={center}>
        <Link href={resetLink} style={button}>Reset Password</Link>
      </Section>
      <Text style={p}>
        If you didn&rsquo;t request this, you can safely ignore this email.
      </Text>
      <Text style={p}>
        If the button doesn&rsquo;t work, copy this link into your browser:<br />
        <Link href={resetLink} style={link}>{resetLink}</Link>
      </Text>
    </BaseLayout>
  );
}

export function NewLeadNotificationEmail({
  name, email, company, phone, message,
}: {
  name: string; email: string; company: string; phone?: string; message: string;
}) {
  return (
    <BaseLayout previewText={`New lead: ${name} from ${company}`}>
      <Text style={h1}>New Lead &mdash; {company}</Text>
      <Section style={detailsBox}>
        <Text style={detailRow}><strong>Name:</strong> {name}</Text>
        <Text style={detailRow}><strong>Email:</strong> {email}</Text>
        <Text style={detailRow}><strong>Company:</strong> {company}</Text>
        {phone && <Text style={detailRow}><strong>Phone:</strong> {phone}</Text>}
        <Text style={detailRow}><strong>Message:</strong> {message}</Text>
      </Section>
    </BaseLayout>
  );
}

// --- Inline styles ---
const body = {
  backgroundColor: "#fafaf9",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  padding: 0,
};

const container = {
  maxWidth: 560,
  margin: "32px auto",
};

const header = {
  backgroundColor: "#d97706",
  padding: "28px 32px 22px",
  borderRadius: "12px 12px 0 0",
};

const logo = {
  color: "#ffffff",
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: "-0.3px",
  textAlign: "center" as const,
  margin: 0,
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px",
  borderLeft: "1px solid #e7e5e4",
  borderRight: "1px solid #e7e5e4",
};

const h1 = {
  fontSize: 18,
  fontWeight: 600,
  color: "#1c1917",
  margin: "0 0 16px",
};

const p = {
  fontSize: 14,
  lineHeight: "24px",
  color: "#44403c",
  margin: "0 0 12px",
};

const link = {
  color: "#d97706",
  textDecoration: "underline",
};

const button = {
  display: "inline-block",
  backgroundColor: "#d97706",
  color: "#ffffff",
  padding: "12px 28px",
  borderRadius: 8,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
};

const center = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const quoteBox = {
  backgroundColor: "#fef3c7",
  padding: "16px",
  borderRadius: 8,
  margin: "16px 0",
};

const quoteLabel = {
  fontSize: 12,
  fontWeight: 600,
  color: "#92400e",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const quoteText = {
  fontSize: 14,
  color: "#451a03",
  margin: 0,
  fontStyle: "italic" as const,
};

const detailsBox = {
  backgroundColor: "#f5f5f4",
  padding: "16px",
  borderRadius: 8,
  margin: "16px 0",
};

const detailRow = {
  fontSize: 14,
  color: "#1c1917",
  margin: "0 0 6px",
};

const footer = {
  backgroundColor: "#fafaf9",
  padding: "20px 32px",
  borderRadius: "0 0 12px 12px",
  border: "1px solid #e7e5e4",
  borderTop: 0,
  textAlign: "center" as const,
};

const footerText = {
  fontSize: 12,
  color: "#78716c",
  margin: "0 0 4px",
};

const footerLinks = {
  fontSize: 12,
  color: "#78716c",
  margin: "4px 0 0",
};

const unsubscribe = {
  fontSize: 11,
  color: "#a8a29e",
  margin: "8px 0 0",
};
