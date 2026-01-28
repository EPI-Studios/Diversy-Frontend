export const dev_root = 'http://localhost:3000';
export const prod_root = 'https://api.diversy.co';

export const root = process.env.NODE_ENV === 'production' ? prod_root : dev_root;
