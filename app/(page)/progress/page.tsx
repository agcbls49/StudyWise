"use client"

import { useState } from "react";
import { House } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react';
import { Download } from 'lucide-react';
import Link from "next/link";

type Session = {
    id: number;
    date: string;
    task: string;
    time: string;
};

const origHours = 3600000;
const origMinutes = 60000;
const oneThousand = 1000;
const ten = 10;

// convert string to ms by parts
function parseTimeString(timeString: string): number {
    const parts = timeString.split(":").map(part => parseInt(part, 10));

    if (parts.length === 4) {
        // HH:MM:SS:MS format
        const [hours, minutes, seconds, milliseconds] = parts;
        return(hours * origHours) + (minutes * origMinutes) + (seconds * oneThousand) + (milliseconds * ten);
    } else if (parts.length === 3) {
        const [minutes, seconds, milliseconds] = parts;
        return(minutes * origMinutes) + (seconds * oneThousand) + (milliseconds * ten);
    } else {
        const [seconds, milliseconds] = parts;
        return(seconds * oneThousand) + (milliseconds * ten);
    }
}

function formatMilliseconds(ms: number): string {
    const hours = Math.floor(ms / origHours);
    const minutes = Math.floor((ms % origHours) / origMinutes);
    const seconds = Math.floor((ms % origMinutes) / oneThousand);
    const milliseconds = Math.floor((ms % oneThousand) / ten);

    const displayHours = String(hours).padStart(2, "0");
    const displayMinutes = String(minutes).padStart(2, "0");
    const displaySeconds = String(seconds).padStart(2, "0");
    const displayMilliseconds = String(milliseconds).padStart(2, "0");

    if (hours > 0) {
        return `${displayHours}:${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
    }
    else if(minutes > 0) {
        return `${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
    }
    else {
        return `${displaySeconds}:${displayMilliseconds}`;
    }
}

export default function Progress() {
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

    function exportJSON():void {
        const stored = localStorage.getItem("sessions");

        if (!stored) {
            alert("No data found!");
            return;
        }

        if(stored) {
            // treat the data from sessions like a real file
            const blob = new Blob([stored], {type: "application/json"});

            // for creating temporary download link
            const url:string = URL.createObjectURL(blob);
            const tempLink = document.createElement("a");

            tempLink.href = url;
            tempLink.setAttribute("download", "exported_sessions.json");

            // to make the download happen
            document.body.appendChild(tempLink);
            tempLink.click();

            // remove the link and the temporary url created
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        }
    }

    // calculate total time for this week
    function calculateWeekTotal(sessions: Session[]): string {
        if(sessions.length === 0) {
            return "00:00";
        }

        const now = new Date();
        const startOfWeek = new Date(now);

        // start the day of the week at sunday
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklySessions = sessions.filter(session => {
            const sessionDate = new Date(session.date);
            return sessionDate >= startOfWeek;
        });

        const total_ms = weeklySessions.reduce((sum, session) => {
            return sum + parseTimeString(session.time);
        }, 0);

        return(formatMilliseconds(total_ms));
    }

    // calculate time for today
    function calculateTotalToday(sessions: Session[]): string {
        if (sessions.length === 0) {
            return "00:00";
        }

        // format to be Wed Jan 14 2026
        const today = new Date().toDateString();

        const sessionsToday = sessions.filter(session => {
            const sessionDate = new Date(session.date).toDateString();
            return(sessionDate === today);
        });

        const total_ms = sessionsToday.reduce((sum, session) => {
            return(sum + parseTimeString(session.time));
        }, 0);

        return(formatMilliseconds(total_ms));
    }

    // calculate total time for all sessions
    function calculateTotalTime(sessions: Session[]): string {
        if(sessions.length === 0) {
            return "00:00";
        }

        const total_ms = sessions.reduce((sum, session) => {
            return(sum + parseTimeString(session.time));
        }, 0);

        return(formatMilliseconds(total_ms));
    }

    const totalSessionsToday = calculateTotalToday(sessions);
    const totalSessionsThisWeek = calculateWeekTotal(sessions);
    const totalSessionsAllTime = calculateTotalTime(sessions);

    return(
        <div className='mt-15 md:container md:mx-auto text-center'>
            <div className="text-3xl font-bold">
                Progress Tracking
            </div>
            <div className="mt-10">
                <div className="text-2xl">
                    Your tracked sessions
                </div>
            </div>
            <div className="flex flex-row mt-10 justify-between">
                <div className="border w-80 h-150 rounded-md">
                    <div className="text-2xl">
                        <span className="font-bold">Total Time this Week</span>
                        <div className="mt-2">
                            {totalSessionsThisWeek}
                        </div>
                    </div>
                </div>
                <div className="border w-80 h-150 rounded-md">
                    <div className="text-2xl">
                        <span className="font-bold">Total Time Today</span>
                        <div className="mt-2">
                            {totalSessionsToday}
                        </div>
                    </div>
                </div>
                <div className="border w-80 h-150 rounded-md">
                    <div className="text-2xl">
                        <span className="font-bold">All-time Total</span>
                        <div className="mt-2">
                            {totalSessionsAllTime}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 space-x-10">
                <Link href={"history/"}>
                    <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <ArrowBigLeft />
                    </button>
                </Link>
                <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer"
                onClick={exportJSON}>
                    <Download />
                </button>
                <Link href={"/"}>
                    <button className="bg-black border border-transparent hover:bg-hoverBlack hover:transition-all duration-300 ease-in-out shadow-xl/20 text-white text-2xl font-bold py-4 px-6 rounded-lg cursor-pointer">
                        <House />
                    </button>
                </Link>
            </div>
            <br />
        </div>
    );
}