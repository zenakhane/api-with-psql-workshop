module.exports = function (app, db) {

	app.get('/api/test', function (req, res) {
		res.json({
			name: 'joe'
		});
	});

	app.get('/api/garments', async function (req, res) {

		const { gender, season } = req.query;
		let garments = await db.many(`select * from garment`);
		if(season) {
			garments = await db.many(`select * from garment where season = $1`, [season]);
		}
		// add some sql queries that filter on gender & season
		
		if(gender){
			garments = await db.many('select * from garment where gender = $1',[gender])
		}
		if(season && gender){
			garments = await db.many('select * from garment where season = $1 AND gender = $2',[season, gender])
		}
		
		res.json({
			data: garments
		})
	});

	app.put('/api/garment/:id', async function (req, res) {
		
		try {

			// use an update query...

			const { id } = req.params;
			const garment = await db.oneOrNone(`select * from garment where id = $1`, [id]);

			// you could use code like this if you want to update on any column in the table
			// and allow users to only specify the fields to update

			let params = { ...garment, ...req.body };
			const { description, price, img, season, gender } = params;
			await db.none(`update garment set gender = $1, description = $2, price = $3, img = $4, season = $5 where id=$6`, [gender,description,price,img,season, id]);

			res.json({
				status: 'success'
			})
		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});

	app.get('/api/garment/:id', async function (req, res) {

		try {
			const { id } = req.params;
			// get the garment from the database
			const garment = await db.oneOrNone(`select * from garment where id = $1`, [id]);

			res.json({
				status: 'success',
				data: garment
			});

		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});


	app.post('/api/garment/', async function (req, res) {

		try {

			const { description, price, img, season, gender } = req.body;

			// insert a new garment in the database
			 await db.none(`insert into garment( description, price, img, season, gender) values($1,$2,$3,$4,$5) on conflict do nothing`, [ description, price, img, season, gender]);
		
			res.json({
				status: 'success',

			});

		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});

	app.get('/api/garments/grouped', async function (req, res) {
		const result = await db.many(`select count(*), gender from garment group by gender order by count asc`);
		
		res.json({
			data: result
		})
	});
}
