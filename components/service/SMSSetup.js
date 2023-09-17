
const fetch = require('node-fetch')

export async function getAccountId() {
    const response = await fetch("https://api.twilio.com/2010-04-01/Accounts.json", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
        "x-rapidapi-key": process.env.TWILIO_SID,
      }
    });

    if ( response.status === 200)
    {
        console.log("success");

    } else 
    {
        console.log('failure', response.statusText);
    }

    const body = await response.json();
    console.log('getAccountId', body);
    return body.sid;
  }



  export async function getAvailableNumbers(accountId) {
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/AvailablePhoneNumbers/us/Local.json", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
        "x-rapidapi-key": process.env.TWILIO_SID
      }
    });
    const body = await result.json();
    console.log('getAvailableNumbers', body);
    return body
      .filter(item => item.capabilities.SMS)
      .map(item => ({
        number: item.phoneNumber.slice(1),
        display: item.friendlyName,
      }));
  }


  export async function buyPhoneNumber(accountId, number) {
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/IncomingPhoneNumbers.json?phoneNumber=" + number + "&phoneNumberType=local&countryCode=us", {
      "method": "POST",
      "headers": {
        "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
        "x-rapidapi-key": process.env.TWILIO_SID,
        "content-type": "application/x-www-form-urlencoded"
      },
    });
    const body = await result.json();
    console.log('buyPhoneNumber', body);
    return body.phoneNumber?.sid;
  }

  export async function sendSMS(accountId, phoneId, to, msg) {
    to = encodeURIComponent(to);
    msg = encodeURIComponent(msg);
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/Messages.json?from=" + phoneId + "&body=" + msg + "&to=" + to, {
      "method": "POST",
      "headers": {
        "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
        "x-rapidapi-key": process.env.TWILIO_SID,
        "content-type": "application/x-www-form-urlencoded"
      },
    });
    const body = await result.json();
    console.log('sendSMS', body);
    return body.status;
  }

  export async function deletePhoneNumber(accountId, phoneNumberId) {
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/IncomingPhoneNumbers/" + phoneNumberId + ".json", {
      "method": "DELETE",
      "headers": {
        "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
        "x-rapidapi-key": process.env.TWILIO_SID,
      }
    });
    const body = await result.json();
    console.log('deletePhoneNumber', body);
  }