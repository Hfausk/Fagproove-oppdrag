"use client"
import { useState } from 'react'
import { updateBookText } from '@/database/crud/update'


export function InputField({ itemId, itemText }: { itemId: number, itemText: string }) {
    const [inputText, setInputText] = useState(itemText)


    const handleSubmit = (input: string) => {
        updateBookText(itemId, input)
        console.log(input, "as")
    }

    return (
        <>

                    <input name='input_text'
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