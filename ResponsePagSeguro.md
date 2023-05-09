## Response type boleto 
{
  id: 'ORDE_538C77F3-4D44-4A70-8477-C23464172CD9',
  reference_id: 'd3fdf7d0-bf5c-46bf-ab9d-1f092ec4c310',
  created_at: '2023-05-06T18:26:32.763-03:00',
  customer: {
    name: 'william',
    email: 'w@w.com',
    tax_id: '12345678909',
    phones: [ [Object] ]
  },
  items: [
    {
      reference_id: 'd3fdf7d0-bf5c-46bf-ab9d-1f092ec4c310',
      name: 'TreepyCache',
      quantity: 1,
      unit_amount: 500
    }
  ],
  shipping: {
    address: {
      street: 'jose',
      number: '5',
      complement: 'casa',
      locality: 'cambui',
      city: 'botucatu',
      region_code: 'SP',
      country: 'BRA',
      postal_code: '18608649'
    }
  },
  charges: [
    {
      id: 'CHAR_56FEB4C6-88A3-4D55-B339-44A28CB15C54',
      reference_id: 'd3fdf7d0-bf5c-46bf-ab9d-1f092ec4c310',
      status: 'WAITING',
      created_at: '2023-05-06T18:26:32.860-03:00',
      description: 'Compra de TreepyCache pelo site www.treepy.com.br',
      amount: [Object],
      payment_response: [Object],
      payment_method: [Object],
      links: [Array]
    }
  ],
  notification_urls: [ 'https://treepy.web.app/orders/webhooks' ],
  links: [
    {
      rel: 'SELF',
      href: 'https://sandbox.api.pagseguro.com/orders/ORDE_538C77F3-4D44-4A70-8477-C23464172CD9',
      media: 'application/json',
      type: 'GET'
    },
    {
      rel: 'PAY',
      href: 'https://sandbox.api.pagseguro.com/orders/ORDE_538C77F3-4D44-4A70-8477-C23464172CD9/pay',
      media: 'application/json',
      type: 'POST'
    }
  ]
}


## Response "Pix"

## response "Cartão"
{
	"id": "ORDE_6FBC8BF5-BB19-4E7B-AC6B-17CD8D180923",
	"reference_id": "ebab5701-5b35-4ac3-952b-6e485af30fad",
	"created_at": "2023-05-08T19:08:54.236-03:00",
	"customer": {
		"name": "william",
		"email": "william@w.com",
		"tax_id": "38384317828",
		"phones": [
			{
				"type": "MOBILE",
				"country": "55",
				"area": "14",
				"number": "998377446"
			}
		]
	},
	"items": [
		{
			"reference_id": "ebab5701-5b35-4ac3-952b-6e485af30fad",
			"name": "Treepycache",
			"quantity": 1,
			"unit_amount": 500
		}
	],
	"shipping": {
		"address": {
			"street": "jose",
			"number": "3",
			"complement": "casa",
			"locality": "cambui",
			"city": "botucatu",
			"region_code": "SP",
			"country": "BRA",
			"postal_code": "18608649"
		}
	},
	"charges": [
		{
			"id": "CHAR_6AE53550-54D0-4781-A4D0-F3BAC9801E89",
			"reference_id": "123",
			"status": "PAID",
			"created_at": "2023-05-08T19:08:54.715-03:00",
			"paid_at": "2023-05-08T19:08:55.000-03:00",
			"description": "Compra de TreepyCache pelo site www.treepy.com.br",
			"amount": {
				"value": 500,
				"currency": "BRL",
				"summary": {
					"total": 500,
					"paid": 500,
					"refunded": 0
				}
			},
			"payment_response": {
				"code": "20000",
				"message": "SUCESSO",
				"reference": "032416400102"
			},
			"payment_method": {
				"type": "CREDIT_CARD",
				"installments": 1,
				"capture": true,
				"card": {
					"brand": "visa",
					"first_digits": "424242",
					"last_digits": "4242",
					"exp_month": "12",
					"exp_year": "2030",
					"holder": {
						"name": "william barbosa"
					},
					"store": false
				},
				"soft_descriptor": "sellervirtual"
			},
			"links": [
				{
					"rel": "SELF",
					"href": "https://sandbox.api.pagseguro.com/charges/CHAR_6AE53550-54D0-4781-A4D0-F3BAC9801E89",
					"media": "application/json",
					"type": "GET"
				},
				{
					"rel": "CHARGE.CANCEL",
					"href": "https://sandbox.api.pagseguro.com/charges/CHAR_6AE53550-54D0-4781-A4D0-F3BAC9801E89/cancel",
					"media": "application/json",
					"type": "POST"
				}
			]
		}
	],
	"notification_urls": [
		"https://treepy.app-com.digital/orders/create-orders_message"
	],
	"links": [
		{
			"rel": "SELF",
			"href": "https://sandbox.api.pagseguro.com/orders/ORDE_6FBC8BF5-BB19-4E7B-AC6B-17CD8D180923",
			"media": "application/json",
			"type": "GET"
		},
		{
			"rel": "PAY",
			"href": "https://sandbox.api.pagseguro.com/orders/ORDE_6FBC8BF5-BB19-4E7B-AC6B-17CD8D180923/pay",
			"media": "application/json",
			"type": "POST"
		}
	]
}