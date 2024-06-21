
export type Lending = {
    id: number;
    bookId: number;
    studentId: number;
    lentAt: Date;
    deliverdAt: Date | null;
}

export type Student = {
    id: number;
    name: string;
    lending: Lending[];
}

export type Book = {
    id: number;
    name: string;
    lending: Lending[];
}
