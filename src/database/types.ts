
export type Lending = {
    bookId: number | null;
    studentId: number | null;
    lentAt: Date;
    deliverdAt: Date | null;
}

export type Student = {
    id: number;
    name: string;
    lending?: Lending[];
}

export type Book = {
    id: number;
    name: string;
    whoHasIt?: Student;
}
