import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY"); // Replace with your real test key

const initialSeats = {
  "101-A1": { section: "VIP", available: true, priceId: "price_1VIP_A1" },
  "101-A2": { section: "VIP", available: false, priceId: "price_1VIP_A2" },
  "203-C15": { section: "GA", available: true, priceId: "price_1GA_C15" },
  "203-C16": { section: "GA", available: false, priceId: "price_1GA_C16" },
};

export default function SeatPicker() {
  const [seats] = useState(initialSeats);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSelect = (seatId) => {
    if (seats[seatId] && seats[seatId].available) {
      setSelectedSeat(seatId);
    }
  };

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

  const renderSeat = (seatId, cx, cy) => {
    const seat = seats[seatId];
    if (!seat) return null;

    let fill = "gray";
    if (seat.available) {
      fill = seat.section === "VIP" ? "green" : "blue";
    }
    if (seatId === selectedSeat) fill = "orange";

    return (
      <circle
        key={seatId}
        cx={cx}
        cy={cy}
        r="12"
        fill={fill}
        onClick={() => handleSelect(seatId)}
        style={{ cursor: seat.available ? "pointer" : "not-allowed" }}
      >
        <title>{seatId}</title>
      </circle>
    );
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl mb-4">Pick Your Seat</h2>
      <svg width="400" height="200">
        <rect x="0" y="0" width="400" height="30" fill="gray" />
        <text x="160" y="20" fill="white">STAGE</text>

        {renderSeat("101-A1", 80, 60)}
        {renderSeat("101-A2", 120, 60)}
        {renderSeat("203-C15", 80, 120)}
        {renderSeat("203-C16", 120, 120)}
      </svg>

      {selectedSeat && (
        <div className="mt-4">
          Selected: <strong>{selectedSeat}</strong> ({seats[selectedSeat].section})<br />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleCheckout(seats[selectedSeat].priceId)}
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}

  
