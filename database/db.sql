CREATE DATABASE database_links;

USE database_links;

-- Users table
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(16) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE users
    -- Hash support
    MODIFY password VARCHAR(64) NOT NULL;

DESCRIBE users;

-- Ideas table
CREATE TABLE ideas (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    money INT(20) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp, -- It autogenerates with the current timestamp
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE ideas  
    ADD PRIMARY KEY (id);


ALTER TABLE ideas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE ideas;