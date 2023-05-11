## Response type boleto 
{
	"create": {
		"id": "4b02ed5c-6b10-429f-abb7-dcd9e85975bd",
		"reference_id": "a2c13391-a08f-4782-9ec1-2c0a50195da5",
		"status": "WAITING",
		"charge_id": "CHAR_F60232EF-4864-43D2-AD63-D83EB3024D50",
		"amount": 500,
		"payment_method": "BOLETO",
		"fk_user_id": "8414f7a8-cdf4-4f96-b898-92bc276c829d",
		"created_at": "2023-05-10T19:18:04.863Z"
	},
	"links": [
		{
			"rel": "SELF",
			"href": "https://boleto.pagseguro.com.br/eb78b5b7-daa7-4891-9966-18e7a8b97118.pdf",
			"media": "application/pdf",
			"type": "GET"
		},
		{
			"rel": "SELF",
			"href": "https://boleto.pagseguro.com.br/eb78b5b7-daa7-4891-9966-18e7a8b97118.png",
			"media": "image/png",
			"type": "GET"
		},
		{
			"rel": "SELF",
			"href": "https://api.pagseguro.com/charges/CHAR_F60232EF-4864-43D2-AD63-D83EB3024D50",
			"media": "application/json",
			"type": "GET"
		}
	]
}


## Response "Pix"
{
	"id": "ORDE_4FF45085-9A30-408A-86A0-EC68DDC479FD",
	"reference_id": "ecbbbf6b-f4ba-4105-b8a6-84f945da6a04",
	"created_at": "2023-05-10T16:15:49.522-03:00",
	"customer": {
		"name": "william",
		"email": "wil@wil.com",
		"tax_id": "12345678909",
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
			"name": "TreepyCache",
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
	"qr_codes": [
		{
			"id": "QRCO_20D0C28F-E6CA-4D57-A859-72110A00E9D1",
			"expiration_date": "2023-05-11T23:59:59.000-03:00",
			"amount": {
				"value": 500
			},
			"text": "00020101021226830014br.gov.bcb.pix2561api.pagseguro.com/pix/v2/20D0C28F-E6CA-4D57-A859-72110A00E9D127600016BR.COM.PAGSEGURO013620D0C28F-E6CA-4D57-A859-72110A00E9D152048999530398654045.005802BR5922Treepy Programa de Pon6012Elias Fausto62070503***63041E2D",
			"arrangements": [
				"PIX"
			],
			"links": [
				{
					"rel": "QRCODE.PNG",
					"href": "https://api.pagseguro.com/qrcode/QRCO_20D0C28F-E6CA-4D57-A859-72110A00E9D1/png",
					"media": "image/png",
					"type": "GET"
				},
				{
					"rel": "QRCODE.BASE64",
					"href": "https://api.pagseguro.com/qrcode/QRCO_20D0C28F-E6CA-4D57-A859-72110A00E9D1/base64",
					"media": "text/plain",
					"type": "GET"
				}
			]
		}
	],
	"notification_urls": [
		"https://treepy.app-com.digital/orders/webhooks"
	],
	"links": [
		{
			"rel": "SELF",
			"href": "https://api.pagseguro.com/orders/ORDE_4FF45085-9A30-408A-86A0-EC68DDC479FD",
			"media": "application/json",
			"type": "GET"
		},
		{
			"rel": "PAY",
			"href": "https://api.pagseguro.com/orders/ORDE_4FF45085-9A30-408A-86A0-EC68DDC479FD/pay",
			"media": "application/json",
			"type": "POST"
		}
	]
}

## response "Cartão"
	"id": "ORDE_B1B27313-36A2-42C8-8475-5BFD5A1CC394",
	"reference_id": "81bc0468-7a3b-43f4-bfc1-87697ee92edf",
	"created_at": "2023-05-10T17:26:44.328-03:00",
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
			"reference_id": "81bc0468-7a3b-43f4-bfc1-87697ee92edf",
			"name": "Treepycache",
			"quantity": 1,
			"unit_amount": 100
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
			"id": "CHAR_5B76EC93-D579-4435-8184-4C8AC88B4E55",
			"reference_id": "123",
			"status": "PAID",
			"created_at": "2023-05-10T17:26:44.544-03:00",
			"paid_at": "2023-05-10T17:26:46.000-03:00",
			"description": "Compra de TreepyCache pelo site www.treepy.com.br",
			"amount": {
				"value": 100,
				"currency": "BRL",
				"summary": {
					"total": 100,
					"paid": 100,
					"refunded": 0
				}
			},
			"payment_response": {
				"code": "20000",
				"message": "SUCESSO",
				"reference": "051012678407"
			},
			"payment_method": {
				"type": "CREDIT_CARD",
				"installments": 1,
				"capture": true,
				"card": {
					"brand": "mastercard",
					"first_digits": "550209",
					"last_digits": "5572",
					"exp_month": "11",
					"exp_year": "2027",
					"holder": {
						"name": "daisy teixeira"
					},
					"store": false
				},
				"soft_descriptor": "Treepyprogramade"
			},
			"links": [
				{
					"rel": "SELF",
					"href": "https://api.pagseguro.com/charges/CHAR_5B76EC93-D579-4435-8184-4C8AC88B4E55",
					"media": "application/json",
					"type": "GET"
				},
				{
					"rel": "CHARGE.CANCEL",
					"href": "https://api.pagseguro.com/charges/CHAR_5B76EC93-D579-4435-8184-4C8AC88B4E55/cancel",
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
			"href": "https://api.pagseguro.com/orders/ORDE_B1B27313-36A2-42C8-8475-5BFD5A1CC394",
			"media": "application/json",
			"type": "GET"
		},
		{
			"rel": "PAY",
			"href": "https://api.pagseguro.com/orders/ORDE_B1B27313-36A2-42C8-8475-5BFD5A1CC394/pay",
			"media": "application/json",
			"type": "POST"
		}
	]
}
