const PriceFormatter = (price : number) => {
    return Intl.NumberFormat("id-ID", {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 3,
        }).format(price)
}

export default PriceFormatter