import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../database/connection.js';

class Trade extends Model {}


Trade.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tradingAccountId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direction: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false,
    },
    confluence: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    outcome: {
      type: DataTypes.ENUM('WIN', 'LOSS', 'BREAK_EVEN', 'OPEN'),
      allowNull: false,
      defaultValue: 'OPEN',
    },
    pnl: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    openedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'trades',
    modelName: 'Trade',
    timestamps: true,
  }
);

export default Trade;