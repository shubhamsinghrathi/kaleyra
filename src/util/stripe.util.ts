let platform = 'empire'
import { stripe_secret_key } from './secrets'

export const stripe = require("stripe")(stripe_secret_key)

export const stripeVendorAccountCreate = async (data) => {
    try {
        let accountType = data.type || 'seller'
        let mobileNumber = data.mobileNumber || ''
        let countryCode = data.countryCode || ''
        let email = data.email || ''

        let to_send = { type: 'custom' }
        to_send['metadata'] = {}
        if(email != '') to_send['metadata']['email'] = email
        if(mobileNumber != '') to_send['metadata']['mobileNumber'] = mobileNumber
        if(countryCode != '') to_send['metadata']['countryCode'] = countryCode
        if(accountType != '') to_send['metadata']['accountType'] = accountType

        let theData = await stripe.accounts.create(to_send)
        global.log("theData: ", theData)
        
        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeCustomerAccountCreate = async (data) => {
    try {
        let accountType = data.type || 'customer'
        let mobileNumber = data.mobileNumber || ''
        let countryCode = data.countryCode || ''
        let email = data.email || ''
        // let vendorId = data.vendorId || ''

        // if(vendorId == '') return { failed: true, msg: 'vendorId not provided' }

        let to_send = {}
        to_send['metadata'] = {}
        if(email != '') to_send['metadata']['email'] = email
        if(mobileNumber != '') to_send['metadata']['mobileNumber'] = mobileNumber
        if(countryCode != '') to_send['metadata']['countryCode'] = countryCode
        if(accountType != '') to_send['metadata']['accountType'] = accountType

        let theData = await stripe.customers.create(to_send)
        global.log("theData: ", theData)
        
        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeCardTokenGenr = async (data) => {
    try {
        // let stripeId = data.stripeId || ''
        let cardNumber = data.cardNumber || ''
        let expMonth = data.expMonth || ''
        let expYear = data.expYear || ''
        let cvc = data.cvc || 'usd'
        let currency = data.currency || ''
        let setAsDefault = data.setAsDefault || true
        if(cardNumber == '' || expMonth == '' || expYear == '' || cvc == '' || currency == '') return { failed: true, msg: 'necessary data not provided' }

        let theData = await stripe.tokens.create(
            {
                card: {
                    object: "card",
                    number: cardNumber,
                    exp_month: expMonth,
                    exp_year: expYear,
                    cvc: cvc,
                    currency: currency,
                    default_for_currency: setAsDefault //sets this card as the default  card for payment
                }
            }
        )
        global.log("theData: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeAddCard = async (data) => {
    try {
        let stripeId = data.stripeId || ''
        let cardToken = data.cardToken || ''
        let cardSave = data.cardSave || false
        if(stripeId == '') return { failed: true, msg: 'stripeId not provided' }
        if(cardToken == '') return { failed: true, msg: 'cardToken not provided' }

        let theData = await stripe.customers.createSource(
            stripeId,
            { source: cardToken }
        )
        global.log("theData: ", theData)

        let checkCard = await checkCardAlreadyExist({ stripeId, cardDetails: theData, cardSave })

        return { failed: false, data: theData, cardExist: checkCard.cardExist || false, addedCardId: checkCard.addedCardId || '', existedCardId: checkCard.existedCardId, addedCardData: checkCard.addedCardData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeDeleteCard = async (data) => {
    try {
        let stripeId = data.stripeId || ''
        let cardId = data.cardId || ''
        if(stripeId == '') return { failed: true, msg: 'stripeId not provided' }
        if(cardId == '') return { failed: true, msg: 'cardId not provided' }

        let theData = await stripe.customers.deleteCard(
            stripeId,
            cardId
        )
        global.log("theData: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeCardList = async (data) => {
    try {        
        let stripeId = data.stripeId || ''
        if(stripeId == '') return { failed: true, msg: 'stripeId not provided' }

        let theData = await stripe.customers.listCards(
            stripeId
        )
        global.log("theData: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const checkCardAlreadyExist = async (data) => {
    try {        
        let stripeId = data.stripeId || ''
        let cardDetails = data.cardDetails || ''
        let cardSave = data.cardSave || false
        if(stripeId == '') return { failed: true, msg: 'stripeId not provided' }
        if(cardDetails == '') return { failed: true, msg: 'cardDetails not provided' }

        let theData = await stripe.customers.listCards(
            stripeId
        )
        
        let cardList = theData['data'] || []

        global.log("checkCardAlreadyExist: ", cardList)
        global.log("cardDetails: ", cardDetails)

        let cardExist = false
        let existedCardId = ''
        cardList.map(val => {
            if(
                val.id != cardDetails.id
                && val.brand == cardDetails.brand
                && val.exp_month == cardDetails.exp_month
                && val.exp_year == cardDetails.exp_year
                && val.funding == cardDetails.funding
                && val.last4 == cardDetails.last4
            ) {
                cardExist = true
                existedCardId = val.id
            }
        })
        if(cardExist && cardSave) {
            await stripeDeleteCard({ stripeId, cardId: existedCardId || '' })
        }

        return { failed: false, cardExist, addedCardId: cardDetails.id || '', existedCardId: existedCardId, addedCardData: cardDetails }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeMakeChargeToVendorViaCreditCard = async (data) => {
    try {        
        let stripeId = data.stripeId || ''
        let vendorId = data.vendorId || ''
        let amount = data.amount || ''
        let currency = data.currency || ''
        let cardId = data.cardId || ''
        let description = data.description || ''
        if(stripeId == '') return { failed: true, msg: 'stripeId not provided' }
        if(vendorId == '') return { failed: true, msg: 'vendorId not provided' }
        if(amount == '') return { failed: true, msg: 'amount not provided' }
        if(currency == '') return { failed: true, msg: 'currency not provided' }
        if(cardId == '') return { failed: true, msg: 'cardId not provided' }

        amount = amount * 100 //for cemt to dollor

        let theData = await stripe.charges.create(
            {
                amount,
                currency,
                source: cardId,
                description,
                customer: stripeId,
                destination: vendorId,
                on_behalf_of: vendorId
            }
        )
        global.log("stripeMakeCharge: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeMakeChargeViaCreditCard = async (data) => {
    try {        
        let stripeId = data.stripeId || ''
        let amount = data.amount || ''
        let currency = data.currency || ''
        let cardId = data.cardId || ''
        let description = data.description || ''
        if(stripeId == '') return { failed: true, msg: 'stripeId not provided' }
        if(amount == '') return { failed: true, msg: 'amount not provided' }
        if(currency == '') return { failed: true, msg: 'currency not provided' }
        if(cardId == '') return { failed: true, msg: 'cardId not provided' }

        amount = amount * 100 //for cemt to dollor

        let theData = await stripe.charges.create(
            {
                amount,
                currency,
                source: cardId,
                description,
                customer: stripeId
            }
        )
        global.log("stripeMakeChargeViaCreditCard: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeRefundPayment = async (data) => {
    try {
        let stripeId = data.stripeId || ''
        let chargeId = data.chargeId || ''
        let refundablePayment = data.refundablePayment || ''
        if(stripeId == '') return { failed: true, msg: 'stripeId not provided' }
        if(chargeId == '') return { failed: true, msg: 'chargeId not provided' }

        let chargeObject;
        if(refundablePayment == '') {
            chargeObject = {
                charge: chargeId
            }
        } else {
            chargeObject = {
                charge: chargeId,
                amount: (refundablePayment * 100)
            }
        }
        let theData = await stripe.refunds.create(chargeObject)
        global.log("stripeRefundPayment: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        // throw new Error(err.message);
        return { failed: true, msg: err.message }
    }
}

export const stripeVenderBankAdd = async (data) => {
    try {
        let vendorId = data.vendorId || 'acct_1D2GWODoBibbadzO';
        let country = data.country || 'US';
        let currency = data.currency || 'USD';
        let account_holder_name = data.account_holder_name || 'Shubham Rathi';
        let account_number = data.account_number || '000123456789';
        let account_holder_type = data.account_holder_type || 'company';
        let routing_number = data.routing_number || '110000000';
        if(vendorId == '') return { failed: true, msg: 'vendorId not provided' }

        let bankObj = {
            object: 'bank_account',
            country,
            currency,
            account_holder_name,
            account_holder_type,
            account_number,
            routing_number
        }

        global.log("bankObj: ", bankObj)

        let theData = await stripe.accounts.createExternalAccount(
            vendorId,
            {
                external_account: bankObj
            }
        )
        global.log("theData: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        return { failed: true, msg: err.message }
    }
}

export const stripeVenderLegalVerification = async (data) => {
    try {
        let vendorId = data.vendorId || 'acct_1D2GWODoBibbadzO';
        let ip = data.ip || '172.8.2.11';
        let tos_date = data.tos_date || Math.floor(Date.now() / 1000);
        let business_name = data.business_name || 'Shubham Rathi ka Business';
        let first_name = data.first_name || 'Shubham';
        let last_name = data.last_name || 'Rathi';
        let hotel_city = data.hotel_city || 'DENSIDE';
        let hotel_line1 = data.hotel_line1 || '100  Whitby Road';
        let hotel_postal_code = data.hotel_postal_code || 'IP14 3BX';
        let personal_city = data.personal_city || 'DENSIDE';
        let personal_line1 = data.personal_line1 || '100  Whitby Road';
        let personal_postal_code = data.personal_postal_code || 'IP14 3BX';
        let day = data.day || '19';
        let month = data.month || '05';
        let year = data.year || '1981';
        let business_tax_id = data.business_tax_id || 'P70508236';
        if(vendorId == '') return { failed: true, msg: 'vendorId not provided' }

        let legalObj = {
            additional_owners: [],
            address: {
                city: hotel_city,
                line1: hotel_line1,
                postal_code: hotel_postal_code
            },
            business_name,
            business_tax_id,
            dob: {
                day,
                month,
                year
            },
            first_name,
            last_name,
            personal_address: {
                city: personal_city,
                line1: personal_line1,
                postal_code: personal_postal_code
            },
            type: 'company'
        }

        let tosObj = {
            date: tos_date,
            ip
        }

        global.log("legalObj: ", legalObj)
        global.log("tosObj: ", tosObj)

        let theData = await stripe.accounts.update(
            vendorId,
            {
                legal_entity: legalObj,
                tos_acceptance: tosObj
            }
        )
        global.log("theData: ", theData)

        return { failed: false, data: theData }
    } catch (err) {
        global.log(err)
        return { failed: true, msg: err.message }
    }
}