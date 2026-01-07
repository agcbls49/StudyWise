"use client"

import { useState } from "react";
import { ArrowBigLeft } from 'lucide-react';
import { Trash } from 'lucide-react';

import Link from "next/link";

export default function History() {
    const [sessions, setSessions] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("sessions") || "[]");
        }
        return [];
    });

    function removeHistory() {
        if (confirm("This will delete all sessions?")) {
            localStorage.clear();
            // update state so UI refreshes
            setSessions([]);
        }
    }

    return(
        <div className="mt-25 md:container md:mx-auto text-center">
            <div className="text-3xl font-bold">
                Study Session History 
            </div>
            <div className="mt-10 text-2xl">
                {sessions.map((time, index) => 
                    (
                        // show session number and time
                        <div key={index}>
                            Session {index + 1}: {time}
                        </div>
                    )
                )}
            </div>
            <div className="mt-10 space-x-5">
                <Link href={"/"}>
                    <button className="bg-black border border-transparent hover:bg-white hover:text-black hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <ArrowBigLeft />
                    </button>
                </Link>
                <button className="bg-[#DC3545] border border-transparent hover:bg-[#A71D2A] hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer"
                onClick={removeHistory}>
                    <Trash />
                </button>
            </div>
        </div>
    );
}