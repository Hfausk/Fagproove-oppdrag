"use client"
import { lendNewBook } from "@/database/crud/lendNewBook";
import{ useState } from "react";
import { Button } from "../ui/button";

export default function AssignBookToStudent() {

    const [bookId, setBookId] = useState("")
    const [studentId, setStudentId] = useState("")
    const assignedDate = new Date()

    return (
        <div className=" flex flex-col">
            <h1>Assign Book to Student</h1>
            <label htmlFor="bookId">Book ID</label>
            <input
                className="border-2 border-gray-500"
                id="bookId"
                value={bookId}
                onChange={(e) => setBookId(e.target.value )}
            />
            <label htmlFor="studentName">Student ID</label>
            <input
                className="border-2 border-gray-500"
                id="studentName"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
            />
            <Button
                onClick={ async () => {
                    try{
                        console.log()
                        await lendNewBook(Number(bookId), Number(studentId), assignedDate)
                    } catch (error) {
                        console.error(error)
                    }
                }}
            >Assign</Button>
        </div>
    )
}