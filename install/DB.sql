CREATE TABLE account(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    pass text NOT NULL,
    mail VARCHAR(50) NULL,
    access int NOT NULL
);

CREATE TABLE file(
    id INT PRIMARY KEY AUTO_INCREMENT,
    file VARCHAR(100) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(50) NULL,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    autor INT NOT NULL,
    category INT(50) NOT NULL
);

CREATE TABLE category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    img VARCHAR(100) NOT NULL
);

CREATE TABLE access(
    id INT PRIMARY KEY AUTO_INCREMENT,
    access VARCHAR(25) NOT NULL
);

ALTER TABLE file
ADD CONSTRAINT FK_File_Account
FOREIGN KEY (autor) 
REFERENCES account (id);

ALTER TABLE file
ADD CONSTRAINT FK_File_Category
FOREIGN KEY (category) 
REFERENCES category (id);

ALTER TABLE account
ADD CONSTRAINT FK_Account_Access
FOREIGN KEY (access) 
REFERENCES access (id);

INSERT INTO access (access) VALUES
("Administrador"),
("Moderador"),
("Usuario");

INSERT INTO account(username, name, lastname, pass, mail, access) VALUES
("admin", "Victor", "Guzman", "$2a$10$UsX16q.NcJwfbN2GcDln0uAkyJDvfUSspXtCr9F8kob4GyDL9JuRq", "thevictorxx@gmail.com", 1);