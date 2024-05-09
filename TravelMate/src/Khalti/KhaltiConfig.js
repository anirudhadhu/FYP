import myKey from "./KhaltiKey";
import axios from "axios";

let config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "4004",
  productName: "TravelMate",
  productUrl: "http://localhost:5173",
  eventHandler: {
    onSuccess(payload) {
      let data = {
        token: payload.token,
        amount: payload.amount,
        placeId: payload.product_id, // Assuming product_id represents place ID
      };

      axios
        .post(`/khalti/payment/confirm`, data) // Send confirmation to the server
        .then((response) => {
          console.log(response.data);
          // Optionally, you can handle UI updates or redirection here
        })
        .catch((error) => {
          console.log(error);
          // Handle error responses
        });

      console.log("Payment successful:", payload);
    },
    onError(error) {
      console.error("Payment error:", error);
    },
    onClose() {
      console.log("Widget closed");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
