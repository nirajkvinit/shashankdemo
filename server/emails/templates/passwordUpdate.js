function passwordUpdate(data) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Your Hashcloud password was updated successfully!</title>
      <style type="text/css">
        @import url(http://fonts.googleapis.com/css?family=Lato:400);

        /* Take care of image borders and formatting */

        img {
          max-width: 600px;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }

        a {
          text-decoration: none;
          border: 0;
          outline: none;
        }

        a img {
          border: none;
        }

        /* General styling */

        td,
        h1,
        h2,
        h3 {
          font-family: Helvetica, Arial, sans-serif;
          font-weight: 400;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: none;
          width: 100%;
          height: 100%;
          color: #37302d;
          background: #ffffff;
        }

        table {
          background: ;
        }

        h1,
        h2,
        h3 {
          padding: 0;
          margin: 0;
          color: #ffffff;
          font-weight: 400;
        }

        h3 {
          color: #21c5ba;
          font-size: 24px;
        }
      </style>

      <style type="text/css" media="screen">
        @media screen {
          td,
          h1,
          h2,
          h3 {
            font-family: "Lato", "Helvetica Neue", "Arial", "sans-serif" !important;
          }
        }
      </style>

      <style type="text/css" media="only screen and (max-width: 480px)">
        /* Mobile styles */
        @media only screen and (max-width: 480px) {
          table[class="w320"] {
            width: 320px !important;
          }

          table[class="w300"] {
            width: 300px !important;
          }

          table[class="w290"] {
            width: 290px !important;
          }

          td[class="w320"] {
            width: 320px !important;
          }

          td[class="mobile-center"] {
            text-align: center !important;
          }

          td[class="mobile-padding"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-bottom: 20px !important;
          }
        }
      </style>
    </head>
    <body
      class="body"
      style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none"
      bgcolor="#ffffff"
    >
      <table
        align="center"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        height="100%"
      >
        <tr>
          <td align="center" valign="top" bgcolor="#ffffff" width="100%">
            <table cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td style="border-bottom: 3px solid #3bcdc3;" width="100%">
                  <center>
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      width="500"
                      class="w320"
                    >
                      <tr>
                        <td
                          valign="top"
                          style="padding:10px 0; text-align:left;"
                          class="mobile-center"
                        >
                          <a
                            href="${data.host}"
                          >
                            <img
                              width="250"
                              height="62"
                              src="http://dvlalr3x7qof4.cloudfront.net/images/hashcorp_dark.png"
                            />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
              <tr>
                <td
                  background="http://dvlalr3x7qof4.cloudfront.net/images/keyboard_background.jpeg"
                  bgcolor="#64594b"
                  valign="top"
                  style="background: url(http://dvlalr3x7qof4.cloudfront.net/images/keyboard_background.jpeg) no-repeat center; background-color: #64594b; background-position: center;"
                >
                  <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="mso-width-percent:1000;height:303px;">
                <v:fill type="tile" src="http://dvlalr3x7qof4.cloudfront.net/images/keyboard_background.jpeg" color="#64594b" />
                <v:textbox inset="0,0,0,0">
              <![endif]-->
                  <div>
                    <center>
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        width="530"
                        height="303"
                        class="w320"
                      >
                        <tr>
                          <td
                            valign="middle"
                            style="vertical-align:middle; padding-right: 15px; padding-left: 15px; text-align:left; color: #f0f8ff; text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
                            0px 8px 13px rgba(0,0,0,0.1),
                            0px 18px 23px rgba(0,0,0,0.1);"
                            class="mobile-center"
                            height="303"
                          >
                            <h1>WELCOME TO HASHCLOUD!</h1>
                            <br />
                            <h2>
                              Your account password has been updated successfully!
                            </h2>
                          </td>
                        </tr>
                      </table>
                    </center>
                  </div>
                  <!--[if gte mso 9]>
                </v:textbox>
              </v:rect>
              <![endif]-->
                </td>
              </tr>
              <tr>
                <td valign="top">
                  <center>
                    <table
                      cellspacing="0"
                      cellpadding="30"
                      width="500"
                      class="w290"
                    >
                      <tr>
                        <td valign="top" style="border-bottom:1px solid #a1a1a1;">
                          <table cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                              <td style="text-align: center;">
                                <h3>Hello, ${data.user.firstname}</h3>
                                <br />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table
                      cellspacing="0"
                      cellpadding="0"
                      width="500"
                      class="w320"
                    >
                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                              <td class="mobile-padding" style="text-align:left;">
                                <br />
                                Your Hashcloud Account's password has been
                                updated! <br /><br />
                                Login and build your Blockchain
                                Network(Hyperledger, Corda, Ethereum, and more...)
                                network on any cloud provider(AWS, GCP, Azure)
                                <br /><br />Have a wonderful experience on
                                Hashcloud! <br /><br />
                                Regards, <br />Team Hashcloud <br />
                                <br />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td class="mobile-padding">
                          <table cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                              <td style="width:150px; background-color: #3bcdc3;">
                                <div>
                                  <!--[if mso]>
                                    <v:roundrect
                                      xmlns:v="urn:schemas-microsoft-com:vml"
                                      xmlns:w="urn:schemas-microsoft-com:office:word"
                                      href="${data.login}"
                                      style="height:33px;v-text-anchor:middle;width:150px;"
                                      arcsize="8%"
                                      stroke="f"
                                      fillcolor="#3bcdc3"
                                    >
                                      <w:anchorlock />
                                      <center
                                        style="color:#ffffff;font-family:sans-serif;font-size:13px;"
                                        >Login Now!</center
                                      >
                                    </v:roundrect>
                                  <![endif]-->
                                  <!--[if !mso]><!-- --><a
                                    href="${data.login}"
                                    ><table
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          style="background-color:#3bcdc3;border-radius:0px;color:#ffffff;display:inline-block;font-family:'Lato', Helvetica, Arial, sans-serif;font-weight:bold;font-size:13px;line-height:33px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;"
                                        >
                                          <span style="color:#ffffff"
                                            >Login Now</span
                                          >
                                        </td>
                                      </tr>
                                    </table></a
                                  >
                                  <!--<![endif]-->
                                </div>
                              </td>
                              <td>&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="25" width="100%">
                            <tr>
                              <td>&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
              <tr>
                <td style="background-color:#c2c2c2;">
                  <center>
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      width="500"
                      class="w320"
                    >
                      <!-- <tr>
                        <td>
                          <table cellspacing="0" cellpadding="30" width="100%">
                            <tr>
                              <td style="text-align:center;">
                                <a href="#">
                                  <img
                                    width="61"
                                    height="51"
                                    src="https://www.filepicker.io/api/file/vkoOlof0QX6YCDF9cCFV"
                                    alt="twitter"
                                  />
                                </a>
                                <a href="#">
                                  <img
                                    width="61"
                                    height="51"
                                    src="https://www.filepicker.io/api/file/fZaNDx7cSPaE23OX2LbB"
                                    alt="google plus"
                                  />
                                </a>
                                <a href="#">
                                  <img
                                    width="61"
                                    height="51"
                                    src="https://www.filepicker.io/api/file/b3iHzECrTvCPEAcpRKPp"
                                    alt="facebook"
                                  />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr> -->
                      <tr>
                        <td>
                          <center>
                            <table
                              style="margin:0 auto;"
                              cellspacing="0"
                              cellpadding="5"
                              width="100%"
                            >
                              <tr>
                                <td
                                  style="text-align:center; margin:0 auto;"
                                  width="100%"
                                >
                                  <a
                                    href="${data.host}"
                                    style="text-align:center;"
                                  >
                                    <img
                                      style="margin:0 auto;"
                                      width="123"
                                      height="24"
                                      src="http://dvlalr3x7qof4.cloudfront.net/images/hashcorp_dark.png"
                                      alt="logo link"
                                    />
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </center>
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>

  `;
}

module.exports = passwordUpdate;
