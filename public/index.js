document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        init(){
            this.filterData()
        
        },
        garments : [],
        genderFilter: '',
        seasonFilter:'',
        
        filterData(){
            fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
			.then(r => r.json())
			.then(data => this.garments = data.data );
        },

    filterPrices(){
        fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
        .then(r => r.json())
        .then(data => this.garments = data.data );
    },
}))
})