import Book from '../models/book';
import Author from '../models/author';
import User from '../models/user';
import Review from '../models/review';
import Rating from '../models/rating';
import Payment from '../models/payment';
import Order from '../models/order';

// Book and Author many-to-many relationship
Book.belongsToMany(Author, { through: 'BookAuthors' });
Author.belongsToMany(Book, { through: 'BookAuthors' });

// User and Review one-to-many relationship
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Book and Review one-to-many relationship
Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

// User and Rating one-to-many relationship
User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

// Book and Rating one-to-many relationship
Book.hasMany(Rating, { foreignKey: 'bookId' });
Rating.belongsTo(Book, { foreignKey: 'bookId' });

// User and Payment one-to-many relationship
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

// Book and Payment one-to-many relationship
Book.hasMany(Payment, { foreignKey: 'bookId' });
Payment.belongsTo(Book, { foreignKey: 'bookId' });

// User and Order one-to-many relationship
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Book and Order one-to-many relationship
Book.hasMany(Order, { foreignKey: 'bookId' });
Order.belongsTo(Book, { foreignKey: 'bookId' });
