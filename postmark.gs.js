// Peter Driessen - studioio.io
function postmark(to, subject, htmlBody) {
  var senderemail = ''; /* use your sender signature e-mail address in here */
  var apitoken = ''; /* use your postmark API token in here */ ;
  var cc = '';
  var bcc = '';
  var data = {
    From: senderemail,
    To: to,
    Cc: cc,
    Bcc: bcc,
    Subject: subject,
    HtmlBody: htmlBody
  };
  var options = {
    'method': 'post',
    headers: {
      'Accept': 'application/json',
      'contentType': 'application/json',
      'X-Postmark-Server-Token': apitoken,
    },
    'payload': JSON.stringify(data)
  };
  var response = UrlFetchApp.fetch('https://api.postmarkapp.com/email', options);
  response = JSON.parse(response.getContentText());
  if (response.Message === 'OK') {
    // sending mail succeeded
    return true;
  } else {
    // something went wrong
    Logger.log(response);
    return false;
  }
}

function SendTestMail() {
  var to = 'to@mail.address';
  var subject = 'This is a test e-mail from Peter';
  var htmlBody = '<html>test</html>';
  if (postmark(to, subject, htmlBody) === true) {
    // wow, check your inbox
  } else {
    // oops
  }
}
