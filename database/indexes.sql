CREATE INDEX idx_BoardGames_basicinformation ON BoardGames (name, year, category) -- used to quickly find a board game using its name, or year, or category.
CREATE INDEX idx_Users_username_email ON Users (username, email) 
CREATE INDEX idx_Orders_amountPaid ON Orders (amountPaid)
