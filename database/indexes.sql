CREATE INDEX idx_BoardGames_basicinformation ON BoardGames (name, yearPublished, category);
CREATE INDEX idx_Users_username_email ON Users (username, email);