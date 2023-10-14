import { CryptoMiddleware } from './crypto.middleware';

describe('CryptoMiddleware', () => {
  it('should be defined', () => {
    expect(new CryptoMiddleware()).toBeDefined();
  });
});
