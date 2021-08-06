CREATE TABLE account(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    pass text NOT NULL,
    mail VARCHAR(50) NULL
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

ALTER TABLE file
ADD CONSTRAINT FK_File_Account
FOREIGN KEY (autor) 
REFERENCES account (id);

ALTER TABLE file
ADD CONSTRAINT FK_File_Categoru
FOREIGN KEY (category) 
REFERENCES category (id);