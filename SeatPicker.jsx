import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY"); // Use your actual Stripe public key

const handleCheckout = async (priceId) => {
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    successUrl: "https://yourdomain.com/success",
    cancelUrl: "https://yourdomain.com/cancel",
  });
  if (error) console.error(error);
};
 React, { useState } from "react";

const seatData = {
  "101-A1": { section: "VIP", available: true },
  "101-A2": { section: "VIP", available: true },
  "201-B1": { section: "GA", available: true },
  "201-B2": { section: "GA", available: false },
};

export default function SeatPicker() {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSelect = (seatId) => {
    if (seatData[seatId].available) {
      setSelectedSeat(seatId);
    }
  };

  const getColor = (seatId) => {
    if (seatId === selectedSeat) return "orange";
    if (!seatData[seatId].available) return "red";
    return seatData[seatId].section === "VIP" ? "green" : "blue";
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl mb-4">Pick Your Seat</h2>
      <svg width="400" height="200">
        <rect x="0" y="0" width="400" height="30" fill="gray" />
        <text x="160" y="20" fill="white">STAGE</text>

        {/* VIP Seats */}
        <circle cx="80" cy="60" r="12" fill={getColor("101-A1")} onClick={() => handleSelect("101-A1")} />
        <circle cx="120" cy="60" r="12" fill={getColor("101-A2")} onClick={() => handleSelect("101-A2")} />

        {/* GA Seats */}
        <circle cx="80" cy="120" r="12" fill={getColor("201-B1")} onClick={() => handleSelect("201-B1")} />
        <circle cx="120" cy="120" r="12" fill={getColor("201-B2")} onClick={() => handleSelect("201-B2")} />
      </svg>

      {selectedSeat && (
        <p className="mt-4">
          Selected: <strong>{selectedSeat}</strong> ({seatData[selectedSeat].section})
        </p>
      )}
    </div>
  );
}
