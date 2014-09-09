//items database for purchased
/*
	id#: {
		respective information..
		}
		name: [string] name of the product
		price: [string] price of the product
		condition: [string] the bet for vendor and customer
		chance: [string] chance of winning
		rule: [list] ["number of wins" (int), "total rounds of plays" (int)] rule on how to win
		endtime: not sure how to represent this...
		vendor: [string] name of vendor

*/
var ITEMS =
	{	
		'1': {
			'name': '16 oz. Smoothie',
			'price': '$3.55',
			'condition':'blabla..', //the buy option
			'img': 'icons/Jamba-Juice.jpg',
			'chance': '50%',
			'rule': [2,3],
			'endtime':'',
			'vendor':'Jamba Juice'
		},
		'2': {
			'name': 'Pesto Lasagne',
			'price': '$12',
			'condition':'blabla..', //the buy option
			'img': 'icons/lasagne.jpg',
			'chance': '50%',
			'rule': [1,1],
			'endtime':'',
			'vendor':"Francesca's"
		},
		'3': {
			'name': "Women's Desert Boots",
			'price': '$91.20',
			'condition':'blabla..', //the buy option
			'img': 'icons/shoes.jpeg',
			'chance': '50%',
			'rule': [2,3],
			'endtime':'',
			'vendor':'Clarks'
		},
		'4': {
			'name': 'Coffee Machine',
			'price': '$35',
			'condition':'blabla..', //the buy option
			'img': 'icons/coffee-machine.jpg',
			'chance': '50%',
			'rule': [2,3],
			'endtime':'',
			'vendor':'Mr.Coffee'
		},
		'5': { 
			'name': 'Green Salad Spinner',
			'price': '$18.75',
			'condition':'blabla..', //the buy option
			'img': 'icons/Salad_spinner.jpg',
			'chance': '50%',
			'rule': [2,3],
			'endtime':'',
			'vendor':"Martha Stewart"
		},
		'6': { 
			'name': 'Sofa Chair',
			'price': '$67',
			'condition':'blabla..', //the buy option
			'img': 'icons/chair.jpeg',
			'chance': '50%',
			'rule': [2,3],
			'endtime':'',
			'vendor':'IKEA'
		},
		'7': { 
			'name': 'Salad Bowl',
			'price': '$25',
			'condition':'blabla..', //the buy option
			'img': 'icons/saladBowl.jpeg',
			'chance': '50%',
			'rule': [2,3],
			'endtime':'',
			'vendor':"Macy's"
		}


	}