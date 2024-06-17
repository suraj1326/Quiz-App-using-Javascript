<?php
// Retrieve the email and quiz results from the request
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$quizResults = $data['results'];

// Send the email
$to = $email;
$subject = 'Quiz Results';
$message = 'Your quiz results:' . PHP_EOL;
$message .= 'Score: ' . $quizResults['score'] . '%' . PHP_EOL;
$message .= 'Correct Answers: ' . implode(', ', $quizResults['correctAnswers']);

// Set additional headers if necessary
$headers = 'From: surajkakade7496@gmail.com' . "\r\n" .
    'Reply-To: surajkakade520@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Send the email
$mailSent = mail($to, $subject, $message, $headers);

// Check if the email was sent successfully
if ($mailSent) {
    // Return a success response
    http_response_code(200);
    echo json_encode(array("message" => "Quiz results sent successfully to " . $email));
} else {
    // Return an error response
    http_response_code(500);
    echo json_encode(array("message" => "Failed to send quiz results. Please try again later."));
}
?>
