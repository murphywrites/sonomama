interface DeliveryEmailProps {
  name: string;
  resource: {
    title: string;
    fileUrl: string;
  };
}

export function buildDeliveryEmailHtml({ name, resource }: DeliveryEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${resource.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5EFE7;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5EFE7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#3D4B3A;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#F5EFE7;letter-spacing:0.05em;">
                Erin Murphy, DPT
              </p>
              <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#E8D5C4;letter-spacing:0.1em;text-transform:uppercase;">
                Perinatal Strength &amp; Movement
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:26px;color:#3D4B3A;">
                Hi ${name},
              </p>
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:#3D4B3A;line-height:1.7;">
                Thank you for downloading <strong>${resource.title}</strong>. I hope it serves you well on your journey.
              </p>
              <p style="margin:0 0 32px;font-family:Arial,sans-serif;font-size:15px;color:#3D4B3A;line-height:1.7;">
                Click the button below to access your guide:
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:#C17A5C;">
                    <a href="${resource.fileUrl}"
                       style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                      Download Your Guide →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:15px;color:#3D4B3A;line-height:1.7;">
                With care,
              </p>
              <p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#3D4B3A;font-style:italic;">
                Erin Murphy, DPT
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F5EFE7;padding:20px 40px;text-align:center;border-top:1px solid #E8D5C4;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#3D4B3A99;line-height:1.6;">
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
