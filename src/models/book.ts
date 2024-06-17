import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';
import Author from './author';

interface BookAttributes {
    id: number;
    bookCode: string;
    title: string;
    description: string;
    publishedYear: number;
    price: number;
    externalId: string;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    public id!: number;
    public bookCode!: string;
    public title!: string;
    public description!: string;
    public publishedYear!: number;
    public price!: number;
    public externalId!: string;
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bookCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    publishedYear: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    externalId: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
});

Book.belongsToMany(Author, { through: 'BookAuthors' });
Author.belongsToMany(Book, { through: 'BookAuthors' });

export default Book;
