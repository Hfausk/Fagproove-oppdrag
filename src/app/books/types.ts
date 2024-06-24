export type Lending = {
    bookId: number
    studentId: number
    lentAt: Date
    deliverdAt: Date | null
    student: {
      id: number
      name: string
    }
  }
  
  
  export type book = {
    id: number
    name: string
    lending: Lending[]
  }