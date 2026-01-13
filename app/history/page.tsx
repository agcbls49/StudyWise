"use client"

import { useState } from "react";
import { House } from 'lucide-react';import { Trash } from 'lucide-react';
import { Eraser } from 'lucide-react';
import { ChartLine } from 'lucide-react';
import Link from "next/link";

type Session = {
    id: number;
    date: string;
    task: string;
    time: string;
};

export default function History() {
    const [sessions, setSessions] = useState<Session[]>(() => {
        if (typeof window === "undefined") return [];

        const stored = localStorage.getItem("sessions");
        if (!stored) return [];

        // get items from local storage
        try {
            return JSON.parse(stored) as Session[];
        } catch {
            return [];
        }
    });

    function removeHistory() {
        if (confirm("Are you sure you want to delete all sessions?")) {
            localStorage.clear();
            // update state so UI refreshes
            setSessions([]);
        }
    }

    return(
        <div className="mt-10 md:container md:mx-auto text-center">
            <div className="text-3xl font-bold">
                Study Session History 
            </div>
            <div className="mt-10">
                <div className="text-2xl">
                    Your saved sessions for today
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-10 text-2xl">
                {/* because of map entry becomes each item from the sessions array */}
                {sessions.map((entry) => 
                    (
                        <div key={entry.id}
                        className="flex items-center justify-between w-96 mb-3 bg-white text-black border border-transparent rounded-md px-2 py-2 shadow-xl/20">
                            {/* show task name with time */}
                            {new Date(entry.date).toLocaleDateString()} - {entry.task}: {entry.time}

                            <button className="cursor-pointer bg-red text-white hover:bg-hoverRed px-3 py-3 rounded-md hover:transition-all duration-300 ease-in-out"
                            onClick={() => {
                                // fetch all session items
                                const storedSessions = JSON.parse(localStorage.getItem("sessions") || "[]");

                                if (confirm("Are you sure you want to delete this session?")) {
                                    // filter the array to remove the session to delete
                                    const filteredSessions = storedSessions.filter((session: Session) => session.id !== entry.id);

                                    // update the local storage after deleting the task
                                    localStorage.setItem("sessions", JSON.stringify(filteredSessions));
                                    setSessions(filteredSessions);
                                }
                            }}>
                                <Eraser />
                            </button>
                        </div>
                    )
                )}
            </div>
            <div className="mt-10 space-x-10">
                <Link href={"/"}>
                    <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <House />
                    </button>
                </Link>
                <Link href={"progress/"}>
                    <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <ChartLine />
                    </button>
                </Link>
                <button className="bg-red border border-transparent hover:bg-hoverRed hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer"
                onClick={removeHistory}>
                    <Trash />
                </button>
            </div>
            <br/>
        </div>
    );
}