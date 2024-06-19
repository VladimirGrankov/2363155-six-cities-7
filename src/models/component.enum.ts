export const Component = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('AppLogger'),
  Config: Symbol.for('AppConfig'),
  DBClient: Symbol.for('DBClient'),
  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
} as const;