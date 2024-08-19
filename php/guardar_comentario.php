<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $rating = $_POST['rating'];
    $comentario = $_POST['comentario'];

    // Aquí puedes guardar los datos en una base de datos o archivo
    // Para simplificar, se devuelve la respuesta en formato JSON

    $response = array(
        'status' => 'success',
        'rating' => $rating,
        'comentario' => htmlspecialchars($comentario)
    );

    echo json_encode($response);
} else {
    echo json_encode(array('status' => 'error', 'message' => 'No se enviaron datos.'));
}
?>
