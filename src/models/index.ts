import  User  from './User.js';
import TradingAccounts from './TradingAccount.js'

User.hasMany(TradingAccounts, {
    foreignKey: 'userId',
    as: 'tradingAccounts',
    onDelete: 'CASCADE',
});

TradingAccounts.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export { User, TradingAccounts };