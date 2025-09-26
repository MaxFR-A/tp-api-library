import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
export interface UserAttributes {
    id?: number;
    username: string;
    password: string;
    role: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    declare id?: number;
    declare username: string;
    declare password: string;
    declare role: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "user",
        },
    },
    {
        sequelize,
        tableName: "User",
    }
);