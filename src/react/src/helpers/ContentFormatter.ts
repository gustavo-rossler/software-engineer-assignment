import { Currency } from "../models/Disposition"

export class ContentFormatter {
    public static formatDate(date: Date): string {
        const formattedDate = date.toLocaleString('en-US', {
            dateStyle: 'medium',
        })
        const formattedTime = date.toLocaleString('en-US', {
            timeStyle: 'short',
        })
        return `${formattedDate} at ${formattedTime}`
    }

    public static formatMoney(value: number, currency: Currency): string {
        const money = value.toLocaleString('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        })

        return `${Currency[currency]} ${money}`
    }
}
