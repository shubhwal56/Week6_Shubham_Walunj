import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';
import User from './user';
import Book from './book';

interface RatingAttributes {
    id: number;
    userId: number;
    bookId: number;
    rating: number;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, 'id'> {}

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public rating!: number;
}

Rating.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
});

Rating.belongsTo(User, { foreignKey: 'userId' });
Rating.belongsTo(Book, { foreignKey: 'bookId' });
User.hasMany(Rating, { foreignKey: 'userId' });
Book.hasMany(Rating, { foreignKey: 'bookId' });

export default Rating;
