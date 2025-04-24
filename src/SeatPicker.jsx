import React, { useState } from "react";

export default function SeatPicker() {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = {
    "101-A1": { section: "VIP", available: true },
    "101-A2": { section: "VIP", available: false },
    "203-C15": { section: "GA", available: true },
    "203-C16": { section: "GA", available: true }
  };

  const getColor = (id) => {
    if (id === selectedSeat) return "orange";
    if (!seats[id].available) return "gray";
    return seats[id].section === "VIP" ? "green" : "blue";
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="400" height="200">
        <rect x="0" y="0" width="400" height="30" fill="gray" />
        <text x="160" y="20" fill="white">STAGE</text>

        <circle cx="100" cy="60" r="12" fill={getColor("101-A1")} onClick={() => setSelectedSeat("101-A1")} />
        <circle cx="140" cy="60" r="12" fill={getColor("101-A2")} onClick={() => setSelectedSeat("101-A2")} />
        <circle cx="100" cy="120" r="12" fill={getColor("203-C15")} onClick={() => setSelectedSeat("203-C15")} />
        <circle cx="140" cy="120" r="12" fill={getColor("203-C16")} onClick={() => setSelectedSeat("203-C16")} />
      </svg>

      {selectedSeat && (
        <p style={{ marginTop: "1rem" }}>
          Selected Seat: <strong>{selectedSeat}</strong>
        </p>
      )}
    </div>
  );
}
