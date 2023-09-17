"use client"

import FutureDashBoard from "@/components/Dashboard/FutureDashBoard"
import { getAccountId } from "@/components/service/SMSSetup"
import { getAvailableNumbers } from "@/components/service/SMSSetup"
import { buyPhoneNumber } from "@/components/service/SMSSetup"
import { sendSMS } from "@/components/service/SMSSetup"
import { deletePhoneNumber } from "@/components/service/SMSSetup"


export const Metadata = {
    title:"CBRE Future Assessment",
    description: "future assessment of inventory"
}

const futureAssessment = () => {

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/sendMessage');

            if ( response.ok) {
                const data = await response.json();
                console.log('Account ID:', data.accountID);
            } else {
                console.error('Error', response.statusText);
            }

        }catch (error)
        {
            console.error(error);
        }
    }
   
    return (
        <>

        <FutureDashBoard />
        <button onClick={handleClick}>
            Click to send message
        </button>
        </>
        
    )

}

export default futureAssessment;