import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';
import User from './user';
import Book from './book';

interface OrderAttributes {
    id: number;
    userId: number;
    bookId: number;
    status: string;
    createdAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public status!: string;
    public createdAt!: Date;
}

Order.init({
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
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Book, { foreignKey: 'bookId' });
User.hasMany(Order, { foreignKey: 'userId' });
Book.hasMany(Order, { foreignKey: 'bookId' });

export default Order;
