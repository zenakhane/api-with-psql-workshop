document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        init() {
            this.filterData();

        },
        garms: {
            description: '',
            img: '',
            price: 0,
            season: '',
            gender: '',
        },
        garments: [],
        genderFilter: '',
        seasonFilter: '',
        maxPrice: 0,
        open: false,


        openGarment() {
            this.open = true
        },
        hideGarment() {
            this.open = !this.open
        },
        filterData() {
            fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
                .then(r => r.json())
                .then(data => this.garments = data.data);
        },
        filterPrices() {
            fetch(`/api/garments/${this.maxPrice}`)
                .then(r => r.json())
                .then(data => this.garments = data.data);
        },
        addGarment() {
            fetch(`/api/garment/`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description, price, img, season, gender } = this.garms)
            }).then(() => this.filterData())
                .catch(err => console.log(err))

        }
    })

    )
})
