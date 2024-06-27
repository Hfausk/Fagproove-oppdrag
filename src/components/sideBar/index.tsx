import Link from 'next/link';
import { Separator } from '../ui/separator';


export default function SideBar() {


    return (
        <div className="w-80 pl-2 flex flex-col border-r-2 border-slate-200 gap-10">
            <div className='flex flex-col'>
                <Link className='text-3xl w-full' href="/books">Books</Link>
                <Separator />
                <Link className='text-1xl w-full' href="/lend">Assign book</Link>

            </div>
            <div>
                <Separator />
                <Link className='text-3xl w-full' href="/students">Students</Link>
                <Separator />
            </div>
        </div>
    )
}