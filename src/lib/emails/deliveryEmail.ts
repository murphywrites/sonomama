interface DeliveryEmailProps {
  name: string;
  resource: {
    title: string;
    fileUrl?: string;
  };
  programsUrl: string;
  intros: string[];
  bullets: string[];
  videoUrl: string;
  attachedNote?: string;
  showDownloadButton?: boolean;
}

// Matches current site palette (globals.css / tailwind.config.ts)
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

export function buildDeliveryEmailHtml({
  name,
  resource,
  programsUrl,
  intros,
  bullets,
  videoUrl,
  attachedNote,
  showDownloadButton = false,
}: DeliveryEmailProps): string {
  const introHtml = intros
    .map(
      (p) => `
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                ${escapeHtml(p)}
              </p>`
    )
    .join("");

  const bulletsHtml = bullets
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const attachmentBlock = attachedNote
    ? `
              <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                ${escapeHtml(attachedNote)}
              </p>`
    : "";

  const downloadBlock =
    showDownloadButton && resource.fileUrl
      ? `
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:${colors.terracotta};">
                    <a href="${resource.fileUrl}"
                       style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:15px;font-weight:600;color:${colors.white};text-decoration:none;border-radius:8px;">
                      Download Your Free Guide →
                    </a>
                  </td>
                </tr>
              </table>`
      : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(resource.title)}</title>
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

              ${introHtml}

              <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                The guide includes:
              </p>
              <ul style="margin:0 0 24px;padding-left:20px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.8;">
                ${bulletsHtml}
              </ul>

              ${attachmentBlock}
              ${downloadBlock}

              <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                Access a companion video with more live explanation from me below ↓
              </p>
              <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
                <a href="${videoUrl}" style="color:${colors.terracotta};font-weight:600;text-decoration:underline;">
                  Watch the companion video
                </a>
              </p>

              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:${colors.olive};line-height:1.7;">
                If you’re ready for an approachable, effective, evidence-based exercise program that meets you where you are and takes you where you want to go, consider joining The Murphy Method. I created the Murphy Method to help you feel seen, supported, and strong as hell.
              </p>

              <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
                <a href="${programsUrl}" style="color:${colors.terracotta};font-weight:600;text-decoration:underline;">
                  Click here for more information on programs and offerings
                </a>
              </p>

              <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:16px;color:${colors.olive};line-height:1.7;font-style:italic;">
                Your body is home. Let’s make it feel like one.
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
                You received this because you signed up for a free resource at ErinMurphyDPT.com.
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
