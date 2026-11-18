<?php
// API REST simples: GET (lista / ?id=), POST (criar), PUT (?id=, atualiza), DELETE (?id=)
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

$m = $_SERVER['REQUEST_METHOD'];
if ($m === 'OPTIONS') exit;

try {
    $db = new PDO('mysql:host=localhost;dbname=lembrete_uc;charset=utf8mb4', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $id = (int)($_GET['id'] ?? 0);
    $d = json_decode(file_get_contents('php://input'), true) ?? [];

    if ($m === 'GET') {
        if ($id) {
            $s = $db->prepare('SELECT * FROM lembretes WHERE id = ?');
            $s->execute([$id]);
            echo json_encode($s->fetch());
        } else {
            echo json_encode($db->query('SELECT * FROM lembretes ORDER BY data_hora')->fetchAll());
        }
    } elseif ($m === 'POST') {
        $s = $db->prepare('INSERT INTO lembretes (titulo, descricao, data_hora, categoria, prioridade, notificar) VALUES (?,?,?,?,?,?)');
        $s->execute([$d['titulo'], $d['descricao'] ?? '', $d['data_hora'], $d['categoria'], $d['prioridade'], (int)$d['notificar']]);
        echo json_encode(['id' => $db->lastInsertId()]);
    } elseif ($m === 'PUT' && $id) {
        $set = []; $val = [];
        foreach (['titulo','descricao','data_hora','categoria','prioridade','notificar','concluido'] as $c) {
            if (array_key_exists($c, $d)) { $set[] = "$c = ?"; $val[] = $d[$c]; }
        }
        $val[] = $id;
        $db->prepare('UPDATE lembretes SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($val);
        echo json_encode(['ok' => true]);
    } elseif ($m === 'DELETE' && $id) {
        $db->prepare('DELETE FROM lembretes WHERE id = ?')->execute([$id]);
        echo json_encode(['ok' => true]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
