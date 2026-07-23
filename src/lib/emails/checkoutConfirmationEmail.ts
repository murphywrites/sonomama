interface CheckoutConfirmationEmailProps {
  name: string;
  programName: string;
  formDetailsHtml: string;
}

const colors = {
  terracotta: "#FF2D92",
  cream: "#FFF8F5",
  olive: "#0D1B2A",
  blush: "#FFB4D2",
  white: "#FFFFFF",
  oliveMuted: "rgba(13, 27, 42, 0.6)",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildCheckoutConfirmationEmailHtml({
  name,
  programName,
  formDetailsHtml,
}: CheckoutConfirmationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to The Murphy Method - ${escapeHtml(programName)} Program</title>
</head>
<body style="margin:0;padding:0;background-color:${colors.cream};font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.cream};padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${colors.white};border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:${colors.olive};padding:32px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:${colors.cream};letter-spacing:0.05em;">
                Erin Murphy, DPT
              </p>
              <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:12px;color:${colors.blush};letter-spacing:0.1em;text-transform:uppercase;">
                Perinatal Strength &amp; Movement
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:26px;color:${colors.olive};">
                Hi ${escapeHtml(name)},
              </p>

              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                Thank you so much for joining The Murphy Method — I am so excited to have you start this plan with me.
              </p>

              <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                <strong>Your program:</strong> ${escapeHtml(programName)}
              </p>

              <p style="margin:24px 0 8px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                <strong>Your details:</strong>
              </p>
              <div style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                ${formDetailsHtml}
              </div>

              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                Look out for an invite to the TrainHeroic app within 24 hours — that is where you will access your program.
              </p>

              <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                Reply to this email with any questions or concerns. I am here for you.
              </p>

              <p style="margin:0;font-family:Georgia,serif;font-size:16px;color:${colors.olive};">
                —Erin
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:${colors.cream};padding:20px 40px;text-align:center;border-top:1px solid ${colors.blush};">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:${colors.oliveMuted};line-height:1.6;">
                You received this because you signed up for a Murphy Method program.
                <br />If you have questions, reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
