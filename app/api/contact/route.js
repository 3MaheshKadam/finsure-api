
// import { google } from "googleapis";
// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       loanType,
//       amount,
//       message,
//       preferredTime,
//     } = await req.json();

//     // Required validation (matches UI)
//     if (!name || !email || !phone) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     /* ---------------- GOOGLE AUTH ---------------- */
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email:
//           "contact-form-writer@finsure-481617.iam.gserviceaccount.com",
//         private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/QESxXyRKM9Pb\nIN46/v9ww2FGeABHKMXhlSgYfREELL8T+X0WgeQeNokuRRte/2tGngpuAWdxLEQG\n7wUKMQov25lD/MghNRef68h1vwbajHdZ4Y2K4DdcX6Bs0k5e9uJvRCXD1JOe8dFx\nmvCfrh1lYXnyozZrgdX5LeWK93z+WNqke7P3qSft9/iDbNxbj88u9asla+MDyBM9\nhLgyRNlSQNGxygneST17G+iXRrvFq1yqKWAHWRJ9WDUw6oSv5yWpTGuVVINHGerD\nFOw9015GTGJDNLNltBXsCxk8syOfSnPLpqMfuzDct27VAIuj83YL4BAO1+uVz97a\npzkVOIO/AgMBAAECggEAK1LlvMBuuhhvf448iWTGfMblvE7m0TfdS7K8OH/sYOO6\nDU5RFc4q3OVBwieJgcWeiYq3lh/fTPXYGzH+FEbzpc+7MnmK5GrghSumZ3X0mYGE\nb+n2ZGVSZSyMbNpfQofu14G6hFgdcL4a0f9lTubkZdjlBSAP7d6lmCLbgtV5jSwz\nac+t1h9HQ7InI01bRhokZ413840hZ08hdkAuiZJPJc9jCXzd11L9AenXml+iliPZ\nbRCBI8BlBxu274ibm588EDxNjRFEIZYC1o/Z5DtadZywlUVNiGxkiHX9Rtp5OBo7\ntXTTtyGQaNz252zR59i8IGCX1u7/l2bPdKdZz8EkIQKBgQDf2Mytq+Z1jCcMK5Qt\n6NzSFmHN91TXX3Psk5YgwFkUV66OSrBJ8hGWBxysLysxEZp/7AX1/KRqCdJb2bZH\nS2w/9Kt5xJT9mKcK9by+iPZ/L3joFZPqvcF8dRN/nSV593ywXmfYeCMkA4abBdfV\nTxhXTD/MNOvLt9NDMuz34ceDpwKBgQDauN6FEzdpqnTlfVNgsDNF53g/hUFp/erz\nfsKJnqvIbOwfc6fZcKtRs647v2iJHu9QQoCPqcUGre6EeugJlqUL25fX9fIp3Hyp\nTVmM2xZ8696ULrL6s7WKT13cGbZJofNJ96shfqKlT1Ilbyaeuwf0Rn5t3XXKBWYf\n7HJxov3iKQKBgQCG/ZUhPsMyLBz4J+eqb/2K7Fh6/ya44yVji/VDNvwBWoc35C6/\nyS11zkAqTh+77aPAdTN7DqqQD/A91+Mmx4M2ZnRqcHRxInfKEjuKo8oTFSvSugCD\n1X8zcN8bXEdXcDpPmf8B+iEm/MFWB4YLazGAo8jtexSfu/G5WqKxMgVBjQKBgH5M\nypHlqtXljGMIn6Dxnmn7Y8CqXj+qVIYO6J83dNLjsuXmj0JMgWFIdJAj02V6645Z\nGIvc6N0WiukNX/hJeT0DrQcUCqaJn6LT+6YOzUmNmpXO8aM7KtWXRwfWASE715Ua\n40MQMTNsPm9HY/G85rb0DgW7IE1sGLDOhLeB+0EhAoGARxlu85Fx4EcMoTpRJp8V\nicTCXNFz78/sT87jNZ86tFOC63HLQZFR77pePaW1gAq/RUe07MnxmKsNLM092vPO\nY34rzg6NJbiBNGB2ZUNEfoaN/p+WzIzLmPMK0dLQ+vok6S+6AE3bWynEEXnGKgpA\nMiDhUVlzm5c8ZUqPtD2kBvY=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n"),
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });

//     /* ---------------- GOOGLE SHEET WRITE ---------------- */
//     const spreadsheetId =
//       "1ICMq7odtb6hF69aM-9hZml_yb1E9m1M3vA3KiAN-gEQ";

//     await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range: "Sheet1!A:I",
//       valueInputOption: "USER_ENTERED",
//       requestBody: {
//         values: [[
//           new Date().toLocaleString(),
//           name,
//           email,
//           phone,
//           loanType || "—",
//           amount || "—",
//           preferredTime || "—",
//           message || "—",
//           "Website Contact Form",
//         ]],
//       },
//     });

//     /* ---------------- EMAIL NOTIFICATION ---------------- */
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "maheshkadam9298@gmail.com",
//         pass: "ivrg jkli vchb hmqq", // Gmail App Password
//       },
//     });

//     await transporter.sendMail({
//       from: '"Website Leads" <maheshkadam9298@gmail.com>',
//       to: "maheshkadam9298@gmail.com",
//       subject: "New Contact Form Lead Received",
//       html: `
//         <h2>New Contact Lead</h2>
//         <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Loan Type:</strong> ${loanType || "-"}</p>
//         <p><strong>Amount:</strong> ${amount || "-"}</p>
//         <p><strong>Preferred Time:</strong> ${preferredTime || "-"}</p>
//         <p><strong>Message:</strong><br/>${message || "-"}</p>
//         <br/>
//         <a href="https://docs.google.com/spreadsheets/d/${spreadsheetId}">
//           View in Google Sheets
//         </a>
//       `,
//       text: `
// New Contact Lead

// Name: ${name}
// Email: ${email}
// Phone: ${phone}
// Loan Type: ${loanType || "-"}
// Amount: ${amount || "-"}
// Preferred Time: ${preferredTime || "-"}
// Message: ${message || "-"}
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Contact API Error:", error);
//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   }
// }
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      name,
      email,
      phone,
      loanType,
      amount,
      message,
      preferredTime,
    } = await req.json();

    // Required validation (matches UI)
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------------- GOOGLE AUTH ---------------- */
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email:
          "contact-form-writer@finsure-481617.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/QESxXyRKM9Pb\nIN46/v9ww2FGeABHKMXhlSgYfREELL8T+X0WgeQeNokuRRte/2tGngpuAWdxLEQG\n7wUKMQov25lD/MghNRef68h1vwbajHdZ4Y2K4DdcX6Bs0k5e9uJvRCXD1JOe8dFx\nmvCfrh1lYXnyozZrgdX5LeWK93z+WNqke7P3qSft9/iDbNxbj88u9asla+MDyBM9\nhLgyRNlSQNGxygneST17G+iXRrvFq1yqKWAHWRJ9WDUw6oSv5yWpTGuVVINHGerD\nFOw9015GTGJDNLNltBXsCxk8syOfSnPLpqMfuzDct27VAIuj83YL4BAO1+uVz97a\npzkVOIO/AgMBAAECggEAK1LlvMBuuhhvf448iWTGfMblvE7m0TfdS7K8OH/sYOO6\nDU5RFc4q3OVBwieJgcWeiYq3lh/fTPXYGzH+FEbzpc+7MnmK5GrghSumZ3X0mYGE\nb+n2ZGVSZSyMbNpfQofu14G6hFgdcL4a0f9lTubkZdjlBSAP7d6lmCLbgtV5jSwz\nac+t1h9HQ7InI01bRhokZ413840hZ08hdkAuiZJPJc9jCXzd11L9AenXml+iliPZ\nbRCBI8BlBxu274ibm588EDxNjRFEIZYC1o/Z5DtadZywlUVNiGxkiHX9Rtp5OBo7\ntXTTtyGQaNz252zR59i8IGCX1u7/l2bPdKdZz8EkIQKBgQDf2Mytq+Z1jCcMK5Qt\n6NzSFmHN91TXX3Psk5YgwFkUV66OSrBJ8hGWBxysLysxEZp/7AX1/KRqCdJb2bZH\nS2w/9Kt5xJT9mKcK9by+iPZ/L3joFZPqvcF8dRN/nSV593ywXmfYeCMkA4abBdfV\nTxhXTD/MNOvLt9NDMuz34ceDpwKBgQDauN6FEzdpqnTlfVNgsDNF53g/hUFp/erz\nfsKJnqvIbOwfc6fZcKtRs647v2iJHu9QQoCPqcUGre6EeugJlqUL25fX9fIp3Hyp\nTVmM2xZ8696ULrL6s7WKT13cGbZJofNJ96shfqKlT1Ilbyaeuwf0Rn5t3XXKBWYf\n7HJxov3iKQKBgQCG/ZUhPsMyLBz4J+eqb/2K7Fh6/ya44yVji/VDNvwBWoc35C6/\nyS11zkAqTh+77aPAdTN7DqqQD/A91+Mmx4M2ZnRqcHRxInfKEjuKo8oTFSvSugCD\n1X8zcN8bXEdXcDpPmf8B+iEm/MFWB4YLazGAo8jtexSfu/G5WqKxMgVBjQKBgH5M\nypHlqtXljGMIn6Dxnmn7Y8CqXj+qVIYO6J83dNLjsuXmj0JMgWFIdJAj02V6645Z\nGIvc6N0WiukNX/hJeT0DrQcUCqaJn6LT+6YOzUmNmpXO8aM7KtWXRwfWASE715Ua\n40MQMTNsPm9HY/G85rb0DgW7IE1sGLDOhLeB+0EhAoGARxlu85Fx4EcMoTpRJp8V\nicTCXNFz78/sT87jNZ86tFOC63HLQZFR77pePaW1gAq/RUe07MnxmKsNLM092vPO\nY34rzg6NJbiBNGB2ZUNEfoaN/p+WzIzLmPMK0dLQ+vok6S+6AE3bWynEEXnGKgpA\nMiDhUVlzm5c8ZUqPtD2kBvY=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    /* ---------------- GOOGLE SHEET WRITE ---------------- */
    const spreadsheetId =
      "1ICMq7odtb6hF69aM-9hZml_yb1E9m1M3vA3KiAN-gEQ";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toLocaleString(),
          name,
          email,
          phone,
          loanType || "—",
          amount || "—",
          preferredTime || "—",
          message || "—",
          "Website Contact Form",
        ]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
