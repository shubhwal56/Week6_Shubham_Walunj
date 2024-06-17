import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';
import User from './user';
import Book from './book';

interface PaymentAttributes {
    id: number;
    userId: number;
    bookId: number;
    amount: number;
    status: string;
    createdAt: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public amount!: number;
    public status!: string;
    public createdAt!: Date;
}

Payment.init({
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
    amount: {
        type: DataTypes.FLOAT,
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
    modelName: 'Payment',
    tableName: 'payments',
});

Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Book, { foreignKey: 'bookId' });
User.hasMany(Payment, { foreignKey: 'userId' });
Book.hasMany(Payment, { foreignKey: 'bookId' });

export default Payment;
