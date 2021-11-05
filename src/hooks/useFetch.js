import { useState, useEffect, useRef} from 'react';

export const useFetch = (url, _options) => {
    // STATE
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    // use useRef to wrap an object/array arguement
    // This bypasses re-running of hook for reference type data
    const options = useRef(_options).current;
    
    useEffect(() => {
        const controller = new AbortController();
        console.log(options)

        const fetchData = async () => {
            setIsPending(true);

            try{
                const response = await fetch(url, {signal : controller.signal}); // associates fetch with above controller
                console.log(response);
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                setIsPending(false);
                setData(json);
                setError(null);
            } catch (err) {
                if(err.name === 'AbortError'){
                    console.log('Fetch request was aborted');
                } else {
                    setError('Could not fetch the data');
                    console.log(err.message);
                    setIsPending(false);
                }
            }
        }

        fetchData();

        return () => {
            // We are defining our cleaning function to abort the useEffect
            controller.abort();
        }
    }, [url]);

    return {data : data, isPending : isPending, error: error};
}