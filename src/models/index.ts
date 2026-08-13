import  User  from './User.js';
import TradingAccounts from './TradingAccount.js'
import Trade from './Trades.js';

User.hasMany(TradingAccounts, {
    foreignKey: 'userId',
    as: 'tradingAccounts',
    onDelete: 'CASCADE',
});

TradingAccounts.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

TradingAccounts.hasMany(Trade, {
    foreignKey: 'tradingAccountId',
    as: 'trades',
    onDelete: 'CASCADE',
});

Trade.belongsTo(TradingAccounts, {
    foreignKey: 'tradingAccountId',
    as: 'tradingAccount',
});

export { User, TradingAccounts, Trade };