


const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// API Endpoints
app.get('/sendMessage',  async (req,res) => {
    console.log("Getting account ID")
    const accountID = await getAccountId();
    console.log(`Got account ID: %{accountID`);

    console.log("Finding Phone Number");
    const numbers = await getAvailableNumbers(accountID);
    console.log("Phone numbers");

    let phone = { id: -1, number: -1}
    for await ( const {number, display} of numbers)
    {
        // Loop through all the available numbers
        const phoneID = await buyPhoneNumber(accountID, number);

        if (phoneID) {
            console.log("Number purchased!");
            phone = { id: phoneID, number }
            break;
        } else {
            console.log("Trying another number");
        }
    }

    console.log("sending message");

    const status = await sendSMS(accountID, phone.number, "4696058364", "Sending message through React!" );
    console.log(`Status:  ${status}`)
    

    console.log("Deleting Number")
    await deletePhoneNumber(accountID, phone.id);
    console.log("deleted");


    app.listen(PORT, () => {
        console.log('Server is running on port 3000');
    })
}
