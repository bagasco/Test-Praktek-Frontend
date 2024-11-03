
export interface ServiceType {
    service_code: string,
    service_name: string,
    service_icon: string,
    service_tariff: number
}

export interface BannerType {
    banner_name: string,
    banner_image: string,
    description: string,
}

export interface TransactionHistoryType {
    invoice_number: string,
    transaction_type: string,
    description: string,
    total_amount: number,
    created_on: string,
}

export interface ProfileType {
    email: string,
    first_name: string,
    last_name: string,
    profile_image: string,
}