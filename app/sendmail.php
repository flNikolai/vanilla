<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/PHPMailer.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');

//Server settings
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->isSMTP();
$mail->Host       = 'smtp.yandex.ru';
$mail->SMTPAuth   = true;
$mail->Username   = 'flnikolai@ya.ru';
$mail->Password   = '13212988';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = 587;

//Recipients
$mail->setFrom('flnikolai@ya.ru', 'Николай');
$mail->addAddress('mc6rut@ya.ru');

// Content
$mail->isHTML(true);
$mail->Subject = 'Заявка с формы!';

$body = '<h1>Письмо</h1>';

$options = "Первая";
if ($_POST['options'] == 'two') {
  $options = "Вторая";
}

if (trim(!empty($_POST['name']))) {
  $body .= '<p><strong>Имя: </strong>' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
  $body .= '<p><strong>E-mail: </strong>' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['options']))) {
  $body .= '<p><strong>Кнопка: </strong>' . $options . '</p>';
}
if (trim(!empty($_POST['select']))) {
  $body .= '<p><strong>Селект: </strong>' . $_POST['select'] . '</p>';
}
if (trim(!empty($_POST['message']))) {
  $body .= '<p><strong>Сообщение: </strong>' . $_POST['message'] . '</p>';
}

if (!empty($_FILES['image']['tmp_name'])) {
  $filePath = __DIR__ . '/images/feedback/' . $_FILES['image']['name'];
  if (copy($_FILES['image']['tmp_name'], $filePath)) {
    $fileAttach = $filePath;
    $body .= '<p><strong>Фото в приложении</strong></p>';
    $mail->addAttachment($fileAttach);
  }
}

$mail->Body = $body;

if (!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
