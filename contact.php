<?php
// === SET THESE ===
$to   = 'yugioh_rocks@comcast.net';        // your inbox (Gmail/Proton/etc. is fine)
$from = 'no-reply@yourdomain.com';   // address on your site’s domain
$site = 'Erik Thomas Portfolio';     // used in subject/From name
// ==================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Invalid request method.';
  exit;
}

// Honeypot: if filled, pretend success to waste bot time
if (!empty($_POST['website'] ?? '')) {
  echo 'Thank you for contacting us! We will get back to you soon.';
  exit;
}

function clean($k){ return trim((string)($_POST[$k] ?? '')); }

$name    = clean('name');
$email   = filter_var(clean('email'), FILTER_VALIDATE_EMAIL);
$reason  = clean('reason');
$company = clean('company');
$msg     = clean('message');

if ($name === '' || !$email || $reason === '' || $msg === '') {
  http_response_code(400);
  echo 'Please fill out all required fields.';
  exit;
}

// Guard against header injection
if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email)) {
  http_response_code(400);
  echo 'Invalid input.';
  exit;
}

$ip  = $_SERVER['REMOTE_ADDR']     ?? 'unknown';
$ua  = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$now = date('c');

$subject = "[$site] $reason";
$body = "New message from your portfolio contact form\n\n"
      . "Name: $name\n"
      . "Email: $email\n"
      . "Company: $company\n"
      . "Reason: $reason\n\n"
      . "Message:\n$msg\n\n"
      . "---- meta ----\nIP: $ip\nUser-Agent: $ua\nTime: $now\n";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: $site <$from>\r\n";     // DMARC-safe From
$headers .= "Reply-To: $name <$email>\r\n"; // replying targets the sender
$headers .= "X-Originating-IP: $ip\r\n";

$sent = @mail($to, $subject, $body, $headers, "-f $from");

if ($sent) {
  echo "Thank you for contacting us! We will get back to you soon.";
} else {
  http_response_code(500);
  echo "Sorry, there was an error sending your message.";
}
