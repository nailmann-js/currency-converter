import { GET } from '@/shared/services/api.ts'

export const enum Currency {
  USD = 'usd',
  EUR = 'eur',
  RUB = 'rub',
}

export type ResponseKey = `${Currency}-${Currency}`

export type CurrencyResponse = Record<ResponseKey, number>

export const currencyOptions: Currency[] = [Currency.USD, Currency.EUR, Currency.RUB] as const

export class CurrencyAPI {
  static GetCurrencyCours() {
    return GET<CurrencyResponse>('/api/currency/')
  }
}
