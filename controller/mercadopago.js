var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'APP_USR-2572771298846850-120119-a50dbddca35ac9b7e15118d47b111b5a-681067803',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

const mercadoCheckout = {};

mercadoCheckout.creteReference = async (req, res) => {
    const { body } = req;

    // const jsoss = {
    //     collection_id: '14763514480',
    //     collection_status: 'approved',
    //     payment_id: '14763514480',
    //     status: 'approved',
    //     external_reference: 'aldairlunabuitron@gmail.com',
    //     payment_type: 'account_money',
    //     merchant_order_id: '2642882267',
    //     preference_id: '681067803-682374eb-9c25-4d16-9aea-66168d3320dd',
    //     site_id: 'MCO',
    //     processing_mode: 'aggregator',
    //     merchant_account_id: 'null'
    // }

    const preference = {
        items: [
            {
                id: 1234,
                title: body.title,
                description: 'DispositivomóvildeTiendae-commerce',
                picture_url: 'https://aldairl-mp-ecommerce-nodejs.herokuapp.com/assets/003.jpg',
                quantity: Number(body.unit),
                currency_id: 'COP',
                unit_price: Number(body.price)
            }
        ],
        payer: {
            name: "Lalo",
            surname: "Landa",
            email: "test_user_83958037@testuser.com",
            date_created: "2015-06-02T12:58:41.425-04:00",
            phone: {
                area_code: "52",
                number: 554973730
            },
            address: {
                street_name: "InsurgentesSur",
                street_number: 1602,
                zip_code: "03940"
            }
        },
        external_reference: "aldairlunabuitron@gmail.com",
        payment_methods: {
            excluded_payment_methods: [
            ],
            excluded_payment_types: [
                {
                    id: "amex"
                },
                {
                    id: "atm"
                }
            ],
            installments: 6
        },
        back_urls: {
            success: "https://aldairl-mp-ecommerce-nodejs.herokuapp.com/success",
            failure: "https://aldairl-mp-ecommerce-nodejs.herokuapp.com/failure",
            pending: "https://aldairl-mp-ecommerce-nodejs.herokuapp.com/pending"
        },
        auto_return: "approved",
        notification_url: 'https://aldairl-mp-ecommerce-nodejs.herokuapp.com/webhook'
    };

    mercadopago.preferences.create(preference)
        .then(response => {
            console.log(response.body);
            res.redirect(response.body.init_point);
        })
        .catch(e => console.log(e))
}

module.exports = mercadoCheckout;
