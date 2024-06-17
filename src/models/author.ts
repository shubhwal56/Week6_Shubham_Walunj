import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../postgresDB/pgConfig';

interface AuthorAttributes {
    id: number;
    name: string;
    bio: string;
    birthdate: Date;
    isSystemUser: boolean;
}

interface AuthorCreationAttributes extends Optional<AuthorAttributes, 'id'> {}

class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
    public id!: number;
    public name!: string;
    public bio!: string;
    public birthdate!: Date;
    public isSystemUser!: boolean;
}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
    },
    birthdate: {
        type: DataTypes.DATE,
    },
    isSystemUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    sequelize,
    modelName: 'Author',
    tableName: 'authors',
});

export default Author;
