export const handlePrice = (price: any): string => {
    const priceResponse = new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    return `${priceResponse} VND`;
};
