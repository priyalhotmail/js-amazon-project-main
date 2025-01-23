// Define the deliveryOptions array and initialize it 
export const deliveryOptions = [
    {
        id: '1',
        deliveryTime: 7,
        priceCents: 0,
    },
    {
        id: '2',
        deliveryTime: 3,
        priceCents: 499,
    },
    {
        id: '3',
        deliveryTime: 1,
        priceCents: 999,
    },
];

/**
 * @description This function will return the delivery option details based on the deliveryOptionId
 * @param deliveryOptionId : deliveryOptionId of the added product
 * @returns deliveryOption : Delivery option details 
 */
export function getDeliveryOption(deliveryOptionId){
    // Define DeliveryOption variable
    let deliveryOption;

    // IF there's delivery option. loop through them and find the added product deliveryOption details
    deliveryOptions.forEach((Option) => {
        // if the deliveryOptionId matches the id in the array then update the deliveryOption variable
      if(Option.id === deliveryOptionId){
        deliveryOption = Option;
      }
    });

    // return the delivery option
    return deliveryOption || deliveryOptions[0];
}