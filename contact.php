<!DOCTYPE html>
<html>
<head>
  <title>Your IT Portfolio - Contact</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap">
</head>
<body>
  <header>
    <h1>Welcome to Your IT Portfolio</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li class="dropdown">
          <a href="javascript:void(0);" class="dropbtn">Portfolio<span class="arrow">&#9662;</span></a>
          <div class="dropdown-content">
            <a href="python.html">Python</a>
            <a href="java.html">Java</a>
            <!-- Add more dedicated page links as needed -->
          </div>
        </li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>

  <section id="contact">
    <div class="container">
      <h2>Contact Me</h2>
      <p>
        You can get in touch with me using the contact form below or by connecting with me on social media.
      </p>
      <div class="contact-info">
        <a href="https://www.facebook.com/yourusername" target="_blank">Facebook</a>
        <a href="https://www.linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
      </div>

      <form id="contact-form" action="contact.php" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your Name" required>

        <label for="reason">Reason for Contacting:</label>
        <input type="text" id="reason" name="reason" placeholder="Reason for Contacting" required>

        <label for="company">Company (if applicable):</label>
        <input type="text" id="company" name="company" placeholder="Your Company">

        <input type="submit" value="Send Request" class="btn">
      </form>
    </div>
  </section>

  <footer>
    <p>&copy; 2023 Your IT Portfolio. All rights reserved.</p>
  </footer>
  <script src="script.js"></script>
</body>
</html>
