DROP DATABASE IF EXISTS lembrete_uc;
CREATE DATABASE lembrete_uc CHARACTER SET utf8mb4;
USE lembrete_uc;

CREATE TABLE lembretes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  data_hora DATETIME NOT NULL,
  categoria VARCHAR(20) NOT NULL DEFAULT 'Trabalho',
  prioridade VARCHAR(10) NOT NULL DEFAULT 'Normal',
  notificar TINYINT(1) NOT NULL DEFAULT 1,
  concluido TINYINT(1) NOT NULL DEFAULT 0
);

INSERT INTO lembretes (titulo, data_hora, categoria, prioridade) VALUES
('Pagar conta de luz', '2026-11-05 09:00:00', 'Trabalho', 'Alta'),
('Reunião de Projeto', '2026-11-10 14:30:00', 'Trabalho', 'Normal'),
('Ir à Academia', '2026-11-03 18:00:00', 'Saúde', 'Normal');