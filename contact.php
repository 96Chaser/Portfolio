<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $reason = htmlspecialchars($_POST['reason']);
  $company = htmlspecialchars($_POST['company']);

  // Prepare email
  $to = "your-email@example.com"; // Replace with your email address
  $subject = "Contact Form Submission";
  $message = "Name: $name\nEmail: $email\nReason for Contacting: $reason\nCompany: $company";
  $headers = "From: $email";

  // Send email
  if (mail($to, $subject, $message, $headers)) {
    echo "Thank you for contacting us! We will get back to you soon.";
  } else {
    echo "Sorry, there was an error sending your message.";
  }
} else {
  echo "Invalid request method.";
}
?>
