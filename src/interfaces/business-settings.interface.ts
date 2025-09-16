export interface ISocialLinks {
    id: string;
    url: string;
    platform: string;
    iconName?: string | null;
    settingsId: string;
}

export interface IBusinessHours {
    id: string;
    settingsId: string;
    dayOfWeek: number;
    opensAt: string;
    closesAt: string;
    closed: boolean;
}

export interface IBusinessSettings {
    id: string;
    phone: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    currency: string;
    businessName: string;
    businessType: string;
    state: string;
    taxId: string | null;
    salesTaxRate: number;
    grossReceiptsTaxRate: number;
    salesTaxesApplyToShipping: boolean;
    shippingFlatCents: number;
    shippingFreeOverCents: number;
    website: string | null;
    businessHours: IBusinessHours[] | null;
    socialLinks: ISocialLinks[] | null;
}