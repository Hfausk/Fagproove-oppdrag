
import React from "react";


export default async function page({params }: {params:{slug: string}}) {


    // const book = await getBookInfo({
    //     bookId: params.slug
    // })

    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1>Books: {params.slug}</h1>
        
      </main>
    );
}