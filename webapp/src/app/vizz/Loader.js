import { useContext, useEffect } from 'react';
import { DataContext } from '../context';

function Loader() {
    const { 
        data:{ loaderMessage }
    } = useContext(DataContext);

    if (loaderMessage === null) {
        return <></>
    }

    return (
        <div className="w-full h-screen absolute top-0 left-0 flex flex-col justify-center items-center z-50 bg-white bg-opacity-20">
           <span className="loader"></span>
           <div className="text-md my-5">{ loaderMessage }</div>
        </div>
    )
}

export default Loader;