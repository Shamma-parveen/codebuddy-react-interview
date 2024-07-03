import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getSeatList, seatSubmit } from "../apiFunctions/seatApi";
import { enqueueSnackbar } from "notistack";

const schema = yup.object().shape({
  seat_no: yup
    .number()
    .typeError("Please enter seat no")
    .min(3, "Minimum 3 seat required")
    .max(10, "Maximum 10 seat required"),
});

const generateInitialFormFields = () => {
  return {
    seat_no: "",
  };
};
const Home = () => {
  const { mutate: bookMutate, isLoading: isBookLoading } = useMutation(seatSubmit);
  const [selectedSeatId, setSelectedId] = useState([]);
  const [seatCost, setSeatCost] = useState(0);
  const [seatNo, setSeatNo] = useState(undefined);
  const { data, isLoading } = useQuery({
    queryKey: ["seatList", seatNo],
    queryFn: () => getSeatList(seatNo),
  });
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: generateInitialFormFields(),
  });
  const handleClick = (seat) => {
    if (selectedSeatId.length === 5 && !selectedSeatId.includes(seat.id)) {
      enqueueSnackbar("Maximum 5 seats allowed", { variant: "error" });
    } else {
      setSelectedId((prevList) => {
        const newList = [...prevList];
        if (newList.includes(seat.id)) {
          const index = newList.findIndex((item) => seat.id == item);
          newList.splice(index, 1);
        } else {
          newList.push(seat.id);
        }
        return newList;
      });
      setSeatCost((prevCost) => {
        return prevCost + (seat.row + 1) * 10 + 20;
      });
    }
  };
  const handleBook = () => {
    if (selectedSeatId.length === 0) {
      enqueueSnackbar("Please select at least one seat", { variant: "error" });
      return;
    }
    bookMutate(selectedSeatId, {
      onSuccess: () => {
        enqueueSnackbar("Booking successfull", { variant: "success" });
        setSelectedId([]);
        setSeatCost(0);
      },
    });
  };
  const onSubmit = (data) => {
    setSeatNo(data.seat_no);
    reset();
    setSelectedId([]);
  };
  if (isLoading || !data) {
    return null;
  }
  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-3xl font-bold text-orange-600">Movie Seat Booking</h1>
      <div className="mb-4 mt-4 p-7 text-gray-900">
        <div className="mb-4">
          <div className="flex flex-row-reverse gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="border-grey-300 h-8 w-8 rounded border bg-gray-300"></div>
                <p>Sold</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-8 w-8 rounded border border-yellow-500"></div>
                <p>Available</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-8 w-8 rounded border border-yellow-500 bg-yellow-500"></div>
                <p>Selected</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 items-center justify-center rounded-t-lg border bg-gray-200 p-6">
                {data.length > 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    {data.map((row, index) => (
                      <div className="flex gap-2" key={row.id}>
                        {row.seats.map((seat) => (
                          <button
                            key={seat.id}
                            className={[
                              "flex h-8 w-8 items-center justify-center rounded-lg border border-yellow-500 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-400",
                              selectedSeatId.includes(seat.id) ? "bg-yellow-500" : "bg-transparent",
                              selectedSeatId.includes(seat.id) ? "text-white" : "text-yellow-500",
                            ].join(" ")}
                            disabled={seat.isReserved}
                            onClick={() => handleClick(seat)}
                          >
                            {seat.seatNumber}
                          </button>
                        ))}
                        <p className="relative -right-9">{data.length - index} </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-6 text-amber-800">No Tickets Available</p>
                )}
              </div>
              {data.length !== 0 && (
                <button
                  className="rounded-b-lg bg-green-600 p-4 text-white"
                  onClick={handleBook}
                  disabled={isBookLoading}
                >
                  Book Now (${seatCost})
                </button>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <>
                  <Controller
                    name="seat_no"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <input
                          type="number"
                          className="mb-4 block w-full rounded-lg border bg-gray-200 p-3 outline-none"
                          placeholder="Number of rows"
                          value={value}
                          onChange={onChange}
                        />
                        {error && <span className="text-orange-700">{error.message}</span>}
                      </>
                    )}
                  />

                  <div className="flex items-center justify-start">
                    <button className="rounded bg-green-600 p-3 px-8 text-white" type="submit">
                      Submit
                    </button>
                  </div>
                </>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
