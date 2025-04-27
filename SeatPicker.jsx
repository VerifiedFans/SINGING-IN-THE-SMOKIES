import React, { useState } from "react";

export default function SeatPicker() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = [];

  // Generate VIP curved seats (Sections 101-104)
  const vipSections = [
    { section: "101", startAngle: -30, endAngle: -10 },
    { section: "102", startAngle: -10, endAngle: 10 },
    { section: "103", startAngle: 10, endAngle: 30 },
    { section: "104", startAngle: 30, endAngle: 50 },
  ];

  vipSections.forEach(({ section, startAngle, endAngle }) => {
    const angles = Array.from({ length: 8 }, (_, i) =>
      startAngle + (endAngle - startAngle) * (i / 7)
    );
    for (let row = 0; row < 6; row++) {
      angles.forEach((angle, i) => {
        const radius = 30 - row * 2;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 90 + radius * Math.sin(rad);
        const id = `${section}-${String.fromCharCode(65 + row)}${i + 1}`;
        seats.push({ id, section, x, y, type: "VIP" });
      });
    }
  });

  // Generate GA seats (Sections 201-204)
  const gaSections = ["201", "202", "203", "204"];
  const gaRows = [
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    "AA", "BB", "CC", "DD", "EE", "FF",
  ];
  const seatsPerBlock = 12;
  let startX = 5;
  const sectionGap = 5;

  gaSections.forEach((section) => {
    gaRows.forEach((row, rowIdx) => {
      for (let seatNum = 1; seatNum <= seatsPerBlock; seatNum++) {
        const x = startX + (seatNum - 1);
        const y = 60 - rowIdx * 1.2;
        const id = `${section}-${row}${seatNum}`;
        seats.push({ id, section, x, y, type: "GA" });
      }
    });
    startX += seatsPerBlock + sectionGap;
  });

  const handleSeatClick = (id) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== id));
    } else {
      setSelectedSeats([...selectedSeats, id]);
    }
  };

  const getColor = (seat) => {
    if (selectedSeats.includes(seat.id)) return "orange";
    if (seat.type === "VIP") return "green";
    return "blue";
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎟 Seat Picker</h2>
      <svg width="1000" height="900" viewBox="0 0 100 105">
        {/* Stage */}
        <rect x="20" y="95" width="60" height="5" fill="gray" />
        <text x="50" y="98" textAnchor="middle" fill="white" fontSize="4">STAGE</text>

        {/* Seats */}
        {seats.map((seat) => (
          <

  
