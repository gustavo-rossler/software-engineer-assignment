import { currencies, dispositionOptionType } from "../models/Disposition"

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

    public static formatMoney(value: number, currency: string): string {
        const money = value.toLocaleString('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        })

        return `${currencies[currency as keyof dispositionOptionType]} ${money}`
    }
}
