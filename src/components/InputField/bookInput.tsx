"use client"
import { useState } from 'react'
import { updateBookText } from '@/database/crud/update'


export function InputField({ inputId, itemId, itemText }: { inputId: string, itemId: number, itemText: string }) {
    const [inputText, setInputText] = useState(itemText)


    const handleSubmit = (input: string) => {
        updateBookText(itemId, input)
    }

    return (
        <>
            <input name='input_text'
                id={inputId}
                onBlur={() => { handleSubmit(inputText) }}
                autoFocus
                value={inputText}
                className='bg-transparent border-grey-500 border-2'
                onChange={(event) => { setInputText(event.target.value) }}
                onKeyDown={(event) => { if (event.key === 'Enter') { handleSubmit(inputText) } }}
            ></input>
        </>
    )

}