class CurrencyFormat {
  static get(lang, style, currency, value) {
    try {
      return new Intl.NumberFormat(lang, {
        style: style,
        currency: currency,
      }).format(value);
    } catch (error) {
      throw new Error(error);
    }
  }
}
