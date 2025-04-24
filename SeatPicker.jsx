import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe TEST public key
const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY");

const initialSeats = {
  "101-A1": { section: "VIP", available: true, priceId: "price_1VIP_A1" },
  "101-A2": { section: "VIP", available: false, priceId: "price_1VIP_A2" },
  "203-C15": { section: "GA", available: true, priceId: "price_1GA_C15" },
  "203-C16": { section: "GA", available: false, priceId: "price_1GA_C16" },
};

async function handleCheckout(priceId) {
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    successUrl: "https://yourdomain.com/success",
    cancelUrl: "https://yourdomain.com/cancel",
  });
  if (error) console.error(error);
}

export default function SeatPicker() {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSelect = (seatId) => {
    if (initialSeats[seatId].available) {
      setSelectedSeat(seatId);
    }
  };

  const getColor = (seatId) => {
    if (seatId === selectedSeat) return "orange";
    if (!initialSeats[seatId].available) return "gray";
    return initialSeats[seatId].section === "VIP" ? "green" : "blue";
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-xl mb-4">Pick Your Seat</h2>
      <svg width="600" height="200">
        <rect x="0" y="0" width="600" height="30" fill="gray" />
        <text x="250" y="20" fill="white">STAGE</text>

        {/* VIP */}
        <circle cx="100" cy="60" r="12" fill={getColor("101-A1")} onClick={() => handleSelect("101-A1")} />
        <circle cx="140" cy="60" r="12" fill={getColor("101-A2")} onClick={() => handleSelect("101-A2")} />

        {/* GA */}
        <circle cx="100" cy="120" r="12" fill={getColor("203-C15")} onClick={() => handleSelect("203-C15")} />
        <circle cx="140" cy="120" r="12" fill={getColor("203-C16")} onClick={() => handleSelect("203-C16")} />
      </svg>

      {selectedSeat && (
        <div className="mt-4">
          Selected: <strong>{selectedSeat}</strong> ({initialSeats[selectedSeat].section})<br />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleCheckout(initialSeats[selectedSeat].priceId)}
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}
  
