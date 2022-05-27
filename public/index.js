document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        init(){
            this.filterData(),
            this.filterPrices()
        
        },
        garments : [],
        genderFilter: '',
        seasonFilter:'',
        maxPrice:0,

        filterData(){
            fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
			.then(r => r.json())
			.then(data => this.garments = data.data );
        },
    filterPrices(){
        console.log(this.maxPrice)
        console.log(`/api/garments/${this.maxPrice}`)
        fetch(`/api/garments/${this.maxPrice}`)
        .then(r => r.json())
        .then(data => this.garments = data.data );
    },
}))

})
