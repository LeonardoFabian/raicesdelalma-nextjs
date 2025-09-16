import 'dotenv/config';

// seed.ts
// ------------------------------
// Interfaces para los seed
// ------------------------------

export interface SeedCountry {
  name: string;
  id: string;
}

export interface SeedSocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface SeedBusinessHour {
  dayOfWeek: number;
  opensAt: string;
  closesAt: string;
  closed: boolean;
}

export interface SeedSize {
  label: string;
}

export interface SeedCategory {
  title: string;
  slug: string;
}

export interface SeedProductSizeConnect {
  connect: { label: string }[];
}

export type SeedFulfillmentMode = 'PREMADE' | 'MAKE_TO_ORDER';

export interface SeedProduct {
  title: string;
  slug: string;
  description?: string;
  categorySlug: string;
  images: string[];
  price: number;
  discountPercentage?: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  // nuevos:
  isConfigurable?: boolean;                // si el producto se puede personalizar
  fulfillmentMode?: SeedFulfillmentMode;   // PREMADE o MAKE_TO_ORDER
  productSizes?: SeedProductSizeConnect;   // para los PREMADE (stock por talla, p.ej. ONE)
}

export interface SeedUser {
  email: string;
  password: string;
  role: 'admin' | 'user' | 'vendor' | 'salesperson' | 'salesrep' | 'affiliate' | 'distributor' | 'client';
  name: string;
}

export interface SeedData {
  countries: SeedCountry[];
  users: SeedUser[];
  socialLinks: SeedSocialLink[];
  businessHours: SeedBusinessHour[];
  sizes: SeedSize[];
  categories: SeedCategory[];
  products: SeedProduct[];
}

// ------------------------------
// initialData
// ------------------------------
export const initialData: SeedData = {

  countries: [
  { name: "Afghanistan", id: "AF" },
  { name: "Aland Islands", id: "AX" },
  { name: "Albania", id: "AL" },
  { name: "Algeria", id: "DZ" },
  { name: "American Samoa", id: "AS" },
  { name: "Andorra", id: "AD" },
  { name: "Angola", id: "AO" },
  { name: "Anguilla", id: "AI" },
  { name: "Antarctica", id: "AQ" },
  { name: "Antigua and Barbuda", id: "AG" },
  { name: "Argentina", id: "AR" },
  { name: "Armenia", id: "AM" },
  { name: "Aruba", id: "AW" },
  { name: "Australia", id: "AU" },
  { name: "Austria", id: "AT" },
  { name: "Azerbaijan", id: "AZ" },
  { name: "Bahamas", id: "BS" },
  { name: "Bahrain", id: "BH" },
  { name: "Bangladesh", id: "BD" },
  { name: "Barbados", id: "BB" },
  { name: "Belarus", id: "BY" },
  { name: "Belgium", id: "BE" },
  { name: "Belize", id: "BZ" },
  { name: "Benin", id: "BJ" },
  { name: "Bermuda", id: "BM" },
  { name: "Bhutan", id: "BT" },
  { name: "Bolivia", id: "BO" },
  { name: "Bosnia and Herzegovina", id: "BA" },
  { name: "Botswana", id: "BW" },
  { name: "Bouvet Island", id: "BV" },
  { name: "Brazil", id: "BR" },
  { name: "British Indian Ocean Territory", id: "IO" },
  { name: "Brunei Darussalam", id: "BN" },
  { name: "Bulgaria", id: "BG" },
  { name: "Burkina Faso", id: "BF" },
  { name: "Burundi", id: "BI" },
  { name: "Cambodia", id: "KH" },
  { name: "Cameroon", id: "CM" },
  { name: "Canada", id: "CA" },
  { name: "Cape Verde", id: "CV" },
  { name: "Cayman Islands", id: "KY" },
  { name: "Central African Republic", id: "CF" },
  { name: "Chad", id: "TD" },
  { name: "Chile", id: "CL" },
  { name: "China", id: "CN" },
  { name: "Christmas Island", id: "CX" },
  { name: "Cocos (Keeling) Islands", id: "CC" },
  { name: "Colombia", id: "CO" },
  { name: "Comoros", id: "KM" },
  { name: "Congo", id: "CG" },
  { name: "Congo, The Democratic Republic of the", id: "CD" },
  { name: "Cook Islands", id: "CK" },
  { name: "Costa Rica", id: "CR" },
  { name: "Cote D'Ivoire", id: "CI" },
  { name: "Croatia", id: "HR" },
  { name: "Cuba", id: "CU" },
  { name: "Cyprus", id: "CY" },
  { name: "Czech Republic", id: "CZ" },
  { name: "Denmark", id: "DK" },
  { name: "Djibouti", id: "DJ" },
  { name: "Dominica", id: "DM" },
  { name: "Dominican Republic", id: "DO" },
  { name: "Ecuador", id: "EC" },
  { name: "Egypt", id: "EG" },
  { name: "El Salvador", id: "SV" },
  { name: "Equatorial Guinea", id: "GQ" },
  { name: "Eritrea", id: "ER" },
  { name: "Estonia", id: "EE" },
  { name: "Ethiopia", id: "ET" },
  { name: "Falkland Islands (Malvinas)", id: "FK" },
  { name: "Faroe Islands", id: "FO" },
  { name: "Fiji", id: "FJ" },
  { name: "Finland", id: "FI" },
  { name: "France", id: "FR" },
  { name: "French Guiana", id: "GF" },
  { name: "French Polynesia", id: "PF" },
  { name: "French Southern Territories", id: "TF" },
  { name: "Gabon", id: "GA" },
  { name: "Gambia", id: "GM" },
  { name: "Georgia", id: "GE" },
  { name: "Germany", id: "DE" },
  { name: "Ghana", id: "GH" },
  { name: "Gibraltar", id: "GI" },
  { name: "Greece", id: "GR" },
  { name: "Greenland", id: "GL" },
  { name: "Grenada", id: "GD" },
  { name: "Guadeloupe", id: "GP" },
  { name: "Guam", id: "GU" },
  { name: "Guatemala", id: "GT" },
  { name: "Guernsey", id: "GG" },
  { name: "Guinea", id: "GN" },
  { name: "Guinea-Bissau", id: "GW" },
  { name: "Guyana", id: "GY" },
  { name: "Haiti", id: "HT" },
  { name: "Heard Island and Mcdonald Islands", id: "HM" },
  { name: "Holy See (Vatican City State)", id: "VA" },
  { name: "Honduras", id: "HN" },
  { name: "Hong Kong", id: "HK" },
  { name: "Hungary", id: "HU" },
  { name: "Iceland", id: "IS" },
  { name: "India", id: "IN" },
  { name: "Indonesia", id: "ID" },
  { name: "Iran, Islamic Republic Of", id: "IR" },
  { name: "Iraq", id: "IQ" },
  { name: "Ireland", id: "IE" },
  { name: "Isle of Man", id: "IM" },
  { name: "Israel", id: "IL" },
  { name: "Italy", id: "IT" },
  { name: "Jamaica", id: "JM" },
  { name: "Japan", id: "JP" },
  { name: "Jersey", id: "JE" },
  { name: "Jordan", id: "JO" },
  { name: "Kazakhstan", id: "KZ" },
  { name: "Kenya", id: "KE" },
  { name: "Kiribati", id: "KI" },
  { name: "Korea, Democratic People'S Republic of", id: "KP" },
  { name: "Korea, Republic of", id: "KR" },
  { name: "Kuwait", id: "KW" },
  { name: "Kyrgyzstan", id: "KG" },
  { name: "Lao People'S Democratic Republic", id: "LA" },
  { name: "Latvia", id: "LV" },
  { name: "Lebanon", id: "LB" },
  { name: "Lesotho", id: "LS" },
  { name: "Liberia", id: "LR" },
  { name: "Libyan Arab Jamahiriya", id: "LY" },
  { name: "Liechtenstein", id: "LI" },
  { name: "Lithuania", id: "LT" },
  { name: "Luxembourg", id: "LU" },
  { name: "Macao", id: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", id: "MK" },
  { name: "Madagascar", id: "MG" },
  { name: "Malawi", id: "MW" },
  { name: "Malaysia", id: "MY" },
  { name: "Maldives", id: "MV" },
  { name: "Mali", id: "ML" },
  { name: "Malta", id: "MT" },
  { name: "Marshall Islands", id: "MH" },
  { name: "Martinique", id: "MQ" },
  { name: "Mauritania", id: "MR" },
  { name: "Mauritius", id: "MU" },
  { name: "Mayotte", id: "YT" },
  { name: "Mexico", id: "MX" },
  { name: "Micronesia, Federated States of", id: "FM" },
  { name: "Moldova, Republic of", id: "MD" },
  { name: "Monaco", id: "MC" },
  { name: "Mongolia", id: "MN" },
  { name: "Montserrat", id: "MS" },
  { name: "Morocco", id: "MA" },
  { name: "Mozambique", id: "MZ" },
  { name: "Myanmar", id: "MM" },
  { name: "Namibia", id: "NA" },
  { name: "Nauru", id: "NR" },
  { name: "Nepal", id: "NP" },
  { name: "Netherlands", id: "NL" },
  { name: "Netherlands Antilles", id: "AN" },
  { name: "New Caledonia", id: "NC" },
  { name: "New Zealand", id: "NZ" },
  { name: "Nicaragua", id: "NI" },
  { name: "Niger", id: "NE" },
  { name: "Nigeria", id: "NG" },
  { name: "Niue", id: "NU" },
  { name: "Norfolk Island", id: "NF" },
  { name: "Northern Mariana Islands", id: "MP" },
  { name: "Norway", id: "NO" },
  { name: "Oman", id: "OM" },
  { name: "Pakistan", id: "PK" },
  { name: "Palau", id: "PW" },
  { name: "Palestinian Territory, Occupied", id: "PS" },
  { name: "Panama", id: "PA" },
  { name: "Papua New Guinea", id: "PG" },
  { name: "Paraguay", id: "PY" },
  { name: "Peru", id: "PE" },
  { name: "Philippines", id: "PH" },
  { name: "Pitcairn", id: "PN" },
  { name: "Poland", id: "PL" },
  { name: "Portugal", id: "PT" },
  { name: "Puerto Rico", id: "PR" },
  { name: "Qatar", id: "QA" },
  { name: "Reunion", id: "RE" },
  { name: "Romania", id: "RO" },
  { name: "Russian Federation", id: "RU" },
  { name: "RWANDA", id: "RW" },
  { name: "Saint Helena", id: "SH" },
  { name: "Saint Kitts and Nevis", id: "KN" },
  { name: "Saint Lucia", id: "LC" },
  { name: "Saint Pierre and Miquelon", id: "PM" },
  { name: "Saint Vincent and the Grenadines", id: "VC" },
  { name: "Samoa", id: "WS" },
  { name: "San Marino", id: "SM" },
  { name: "Sao Tome and Principe", id: "ST" },
  { name: "Saudi Arabia", id: "SA" },
  { name: "Senegal", id: "SN" },
  { name: "Serbia and Montenegro", id: "CS" },
  { name: "Seychelles", id: "SC" },
  { name: "Sierra Leone", id: "SL" },
  { name: "Singapore", id: "SG" },
  { name: "Slovakia", id: "SK" },
  { name: "Slovenia", id: "SI" },
  { name: "Solomon Islands", id: "SB" },
  { name: "Somalia", id: "SO" },
  { name: "South Africa", id: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", id: "GS" },
  { name: "Spain", id: "ES" },
  { name: "Sri Lanka", id: "LK" },
  { name: "Sudan", id: "SD" },
  { name: "Suriname", id: "SR" },
  { name: "Svalbard and Jan Mayen", id: "SJ" },
  { name: "Swaziland", id: "SZ" },
  { name: "Sweden", id: "SE" },
  { name: "Switzerland", id: "CH" },
  { name: "Syrian Arab Republic", id: "SY" },
  { name: "Taiwan, Province of China", id: "TW" },
  { name: "Tajikistan", id: "TJ" },
  { name: "Tanzania, United Republic of", id: "TZ" },
  { name: "Thailand", id: "TH" },
  { name: "Timor-Leste", id: "TL" },
  { name: "Togo", id: "TG" },
  { name: "Tokelau", id: "TK" },
  { name: "Tonga", id: "TO" },
  { name: "Trinidad and Tobago", id: "TT" },
  { name: "Tunisia", id: "TN" },
  { name: "Turkey", id: "TR" },
  { name: "Turkmenistan", id: "TM" },
  { name: "Turks and Caicos Islands", id: "TC" },
  { name: "Tuvalu", id: "TV" },
  { name: "Uganda", id: "UG" },
  { name: "Ukraine", id: "UA" },
  { name: "United Arab Emirates", id: "AE" },
  { name: "United Kingdom", id: "GB" },
  { name: "United States", id: "US" },
  { name: "United States Minor Outlying Islands", id: "UM" },
  { name: "Uruguay", id: "UY" },
  { name: "Uzbekistan", id: "UZ" },
  { name: "Vanuatu", id: "VU" },
  { name: "Venezuela", id: "VE" },
  { name: "Viet Nam", id: "VN" },
  { name: "Virgin Islands, British", id: "VG" },
  { name: "Virgin Islands, U.S.", id: "VI" },
  { name: "Wallis and Futuna", id: "WF" },
  { name: "Western Sahara", id: "EH" },
  { name: "Yemen", id: "YE" },
  { name: "Zambia", id: "ZM" },
  { name: "Zimbabwe", id: "ZW" },
],

  users: [    
    {
      email: process.env.ADMIN_USER ?? 'admin@purplebutterflybouquets.com',
      password: process.env.ADMIN_PASS ?? 'admin123',
      role: 'admin',
      name: 'Alma Puello',
    },    
    {
      email: 'test@purplebutterflybouquets.com',
      password: 'test123',
      role: 'user',
      name: 'John Doe',
    }
  ],

  socialLinks: [
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/purplebutterflyde/',
      iconName: 'instagram'
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/purplebutterflyde',
      iconName: 'facebook'
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@purplebutterflyde',
      iconName: 'tiktok'
    }
  ],

  businessHours: [
    { dayOfWeek: 0, opensAt: '00:00', closesAt: '00:00', closed: true }, 
    { dayOfWeek: 1, opensAt: '09:00', closesAt: '17:00', closed: false },
    { dayOfWeek: 2, opensAt: '09:00', closesAt: '17:00', closed: false },
    { dayOfWeek: 3, opensAt: '09:00', closesAt: '17:00', closed: false },
    { dayOfWeek: 4, opensAt: '09:00', closesAt: '17:00', closed: false },
    { dayOfWeek: 5, opensAt: '09:00', closesAt: '17:00', closed: false },
    { dayOfWeek: 6, opensAt: '09:00', closesAt: '17:00', closed: false },
  ],

  // incluye “ONE” para artículos sin tallas tradicionales
  sizes: [
    { label: 'ONE' },
    { label: 'XS' },
    { label: 'S' },
    { label: 'M' },
    { label: 'L' },
    { label: 'XL' },
    { label: 'XXL' },
    { label: 'XXXL' },
  ],

  categories: [
    { title: "Valentine's Day", slug: 'valentines-day' },
    { title: 'Birthday', slug: 'birthday' },
    { title: "Mother's Day", slug: 'mothers-day' },
    { title: "Father's Day", slug: 'fathers-day' },
    { title: 'Spring', slug: 'spring' },
    { title: 'Wellness', slug: 'wellness' },
    { title: 'Specialty', slug: 'specialty' },
    { title: 'Gifts', slug: 'gifts' },
  ],

  products: [
    // PREMADE (no configurable) — usa stock por talla “ONE”
    {
      title: 'Bouquet of Roses',
      slug: 'bouquet-of-roses',
      description:
        'The M bouquet includes 6 units, the L bouquet includes 12 units, and the XL bouquet includes 24 units.',
      categorySlug: 'valentines-day',
      images: ['bouquet-of-roses.png', 'bouquet-of-roses.jfif'],
      price: 34.81,
      discountPercentage: 15.00,
      rating: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: false,
      fulfillmentMode: 'PREMADE',
      productSizes: { connect: [{ label: 'ONE' }] }, // stock por talla ONE
    },

    // MAKE_TO_ORDER (configurable) — sin productSizes, se descuenta por BOM/opciones
    {
      title: 'Coffee & Roses Deluxe',
      slug: 'coffee-and-roses-deluxe',
      description:
        'A romantic arrangement combining premium coffee beans with fresh red roses in a handcrafted basket.',
      categorySlug: 'valentines-day',
      images: ['coffee-and-roses-deluxe.png', 'coffee-and-roses-deluxe.jfif'],
      price: 48.5,
      discountPercentage: 10.00,
      rating: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: true,
      fulfillmentMode: 'MAKE_TO_ORDER',
            productSizes: { connect: [{ label: 'ONE' }] }, // stock por talla ONE

    },

    // MAKE_TO_ORDER (configurable) — otro ejemplo
    {
      title: 'Sweet Morning Coffee Bouquet',
      slug: 'sweet-morning-coffee-bouquet',
      description:
        'A bouquet of mixed flowers paired with artisanal ground coffee, perfect for a sweet morning surprise.',
      categorySlug: 'birthday',
      images: ['sweet-morning-coffee-bouquet.png', 'sweet-morning-coffee-bouquet.jfif'],
      price: 42.99,
      discountPercentage: 5.00,
      rating: 4.9,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: true,
      fulfillmentMode: 'MAKE_TO_ORDER',
      productSizes: { connect: [{ label: 'ONE' }] }, // stock por talla ONE

    },

    // PREMADE — con tallas S/M/L (ejemplo mixto)
    {
      title: 'Tea Time Floral Gift Box',
      slug: 'tea-time-floral-gift-box',
      description:
        'Includes premium herbal teas, a small floral arrangement, and honey sticks for a relaxing afternoon.',
      categorySlug: 'wellness',
      images: ['tea-time-floral-gift-box.png', 'tea-time-floral-gift-box.jfif'],
      price: 39.25,
      discountPercentage: 15.00,
      rating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: false,
      fulfillmentMode: 'PREMADE',
      productSizes: { connect: [{ label: 'S' }, { label: 'M' }, { label: 'L' }] },
    },

    // MAKE_TO_ORDER
    {
      title: 'Purple Butterfly Signature Bouquet',
      slug: 'purple-butterfly-signature-bouquet',
      description:
        'Our signature bouquet featuring seasonal flowers and gourmet coffee in an elegant reusable cup.',
      categorySlug: 'specialty',
      images: ['purple-butterfly-signature-bouquet.png', 'purple-butterfly-signature-bouquet.jfif'],
      price: 55.0,
      discountPercentage: 10.00,
      rating: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: true,
      fulfillmentMode: 'MAKE_TO_ORDER',
      productSizes: { connect: [{ label: 'ONE' }] }, // stock por talla ONE

    },

    // PREMADE — talla ONE
    {
      title: 'Coffee Lovers Gift Basket',
      slug: 'coffee-lovers-gift-basket',
      description:
        'An arrangement of assorted coffee blends, mini bouquets, and sweet treats in a decorative basket.',
      categorySlug: 'gifts',
      images: ['coffee-lovers-gift-basket.png', 'coffee-lovers-gift-basket.jfif'],
      price: 64.75,
      discountPercentage: 5.00,
      rating: 4.9,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: false,
      fulfillmentMode: 'PREMADE',
      productSizes: { connect: [{ label: 'ONE' }] },
    },

    // MAKE_TO_ORDER
    {
      title: 'Spring Floral Coffee Jar',
      slug: 'spring-floral-coffee-jar',
      description:
        'Fresh spring flowers arranged in a glass jar with whole bean coffee sealed for freshness.',
      categorySlug: 'spring',
      images: ['spring-floral-coffee-jar.png', 'spring-floral-coffee-jar.jfif'],
      price: 37.9,
      discountPercentage: 15.00,
      rating: 4.7,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: true,
      fulfillmentMode: 'MAKE_TO_ORDER',
      productSizes: { connect: [{ label: 'ONE' }] }, // stock por talla ONE

    },

    // PREMADE — talla ONE
    {
      title: 'Romantic Coffee Date Set',
      slug: 'romantic-coffee-date-set',
      description:
        'Two personalized coffee mugs, a small bouquet of roses, and premium roast coffee for two.',
      categorySlug: 'valentines-day',
      images: ['romantic-coffee-date-set.png', 'romantic-coffee-date-set.jfif'],
      price: 59.99,
      discountPercentage: 10.00,
      rating: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isConfigurable: false,
      fulfillmentMode: 'PREMADE',
      productSizes: { connect: [{ label: 'ONE' }] },
    },
  ],
};
