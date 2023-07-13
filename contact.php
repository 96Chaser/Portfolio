<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $reason = $_POST['reason'];
  $company = $_POST['company'];
  
  // Extract the encoded phone number and remove the unique identifier
  $encodedPhoneNumber = $_POST['phone'];
  $uniqueIdentifier = '[UNIQUE_IDENTIFIER]';
  $phoneNumber = str_replace($uniqueIdentifier, '', $encodedPhoneNumber);

  // Verify if the call is from the website by checking the unique identifier
  if (strpos($encodedPhoneNumber, $uniqueIdentifier) !== false) {
    // Process the contact request and send notifications

    // Prepare the notification message
    $message = "You have a new contact request:\n\n";
    $message .= "Name: $name\n";
    $message .= "Reason: $reason\n";
    $message .= "Company: $company\n";
    $message .= "Phone: $phoneNumber\n";

    // Send the notification to your phone (example using email)
    $to = '1234567890@your-carrier-domain.com'; // Replace with your phone number's SMS email gateway
    $subject = 'New Contact Request';
    $headers = "From: youremail@example.com";
    mail($to, $subject, $message, $headers);

    // Send the notification to your email
    $to = 'youremail@example.com'; // Replace with your actual email address
    $subject = 'New Contact Request';
    $headers = "From: youremail@example.com";
    mail($to, $subject, $message, $headers);

    // Redirect the user to a thank you page
    header("Location: thank-you.html");
    exit;
  }
}
?>
