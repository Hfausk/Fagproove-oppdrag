
export type Lending = {
    id: number;
    bookId: number;
    studentId: number;
    lentAt: Date;
    deliverdAt: Date | null;
}

export type Students = {
    id: number;
    name: string;
    lendings: Lending[];
}

export type Books = {
    id: number;
    name: string;
    lendings: Lending[];
}
