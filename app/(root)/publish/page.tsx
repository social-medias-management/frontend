"use client";
import React from "react";
import moment from "moment";
import Calendar from "@/components/calender";

const events = [
  {
    start: moment("2023-03-18T10:00:00").toDate(),
    end: moment("2023-03-18T11:00:00").toDate(),
    title: "MRI Registration",
  },
  {
    start: moment("2023-03-18T14:00:00").toDate(),
    end: moment("2023-03-18T15:30:00").toDate(),
    title: "ENT Appointment",
  },
];

const page = () => {
  return (
    <div className="h-[80vh] w-[40%] ">
      <Calendar />
    </div>
  );
};

export default page;
