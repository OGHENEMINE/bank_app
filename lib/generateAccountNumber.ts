import crypto from 'crypto';
const generateAccountNumber = () => {
    const randomNumber = Math.trunc(Math.random() * 100000000);
    const accountNumber = `25${randomNumber}`;
    return accountNumber;
};

export default generateAccountNumber;