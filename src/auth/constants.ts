export const jwtConstants = {
  secret: process.env.JWTSECRETKEY || 'secretKey',
  expiresIn: parseInt(process.env.JWTEXPIRY, 10) || 6000,
};
