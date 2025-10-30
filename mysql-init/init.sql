USE nodedb;

CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO people (name) VALUES 
    ('João Silva'),
    ('Maria Santos'),
    ('Pedro Oliveira'),
    ('Wesley Willians'),
    ('Full Cycle');