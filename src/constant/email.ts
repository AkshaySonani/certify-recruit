type verifyLinkProps = {
  verifyUrl: string;
};

export const verifyLinkMailTemplate = ({
  verifyUrl,
}: verifyLinkProps) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .content a {
            color: #1a73e8;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 14px;
            color: #999999;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .header img {
                max-width: 100px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://via.placeholder.com/150" alt="Company Logo">
        </div>
        <div class="content">
            <p>You provided this email ID for signing up in the portal of CertifyRecruit - Complementing your Recruitment. Click on the link below to verify your email ID:</p>
            <p><a href="${verifyUrl}">${verifyUrl}</a></p>
            <p>If you did not request a sign-up, kindly ignore this mail.</p>
        </div>
        <div class="footer">
            &copy; 2024 CertifyRecruit. All rights reserved.
        </div>
    </div>
</body>
</html>`;
