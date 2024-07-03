export const getSeatList = async (seatNo) => {
  const res = await fetch("https://codebuddy.review/seats?count=" + seatNo);
  const data = await res.json();
  return data.data;
};

export const seatSubmit = async (seatIds) => {
  await fetch("https://codebuddy.review/submit", { method: "POST", body: JSON.stringify(seatIds) });
};
