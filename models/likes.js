"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "UserId",
                onDelete: "CASCADE",
            });
            this.belongsTo(models.Posts, {
                targetKey: "postId",
                foreignKey: "PostId",
                onDelete: "CASCADE",
            });
            this.belongsTo(models.Comments, {
                targetKey: "commentId",
                foreignKey: "CommentId",
            });
        }
    }
    Likes.init(
        {
            likeId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            UserId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            PostId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            CommentId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "Likes",
        }
    );
    return Likes;
};
