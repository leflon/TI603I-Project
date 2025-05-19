CREATE INDEX idx_BoardGames_name ON BoardGames (name);
CREATE INDEX idx_BoardGames_category ON BoardGames (category);
CREATE INDEX idx_BoardGames_price ON BoardGames (price);

CREATE INDEX idx_user_email ON Users (email);

CREATE INDEX idx_orders_userId ON Orders (userId);
CREATE INDEX idx_carts_userId ON Carts (userId);
CREATE INDEX idx_reviews_userId ON Reviews (userId);