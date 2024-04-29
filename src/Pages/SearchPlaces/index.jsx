import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';
import Input from '../../Components/Input';

import styles from './styles.module.css';

const SearchPlaces = () => {

    const limitOptions = [
        {
            label: 5,
            value: 5
        },
        {
            label: 10,
            value: 10
        }
    ]

    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5)
    const [citiesData, setCitiesData] = useState();
    const [filter, setFilter] = useState('')
    const [debounceValue] = useDebounce(filter, 1000);

    const inputRef = useRef(null);

    useEffect(() => {
        setIsLoading(true)
        var options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            params: {
                // countryIds: 'IN', 
                limit: limit, offset: (currentPage * limit) - limit, namePrefix: debounceValue
            },
            headers: {
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
                'x-rapidapi-key': '0674c5d283msh1132f2eedfe3e64p1e112bjsnc3253228720e'
            }
        };

        axios.request(options).then(function (response) {
            setCitiesData(response.data);
            setIsLoading(false)
        }).catch(function (error) {
            setIsLoading(false)
        });
    }, [limit, currentPage, debounceValue])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "/") {
                inputRef.current.focus()
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])


    return (
        <div className={styles.SearchPlacesPage}>
            <div>
                <h1>Find your place</h1>
            </div>
            <div className={styles.inputWrapper}>
                <Input handleOnChange={(e) => setFilter(e.target.value)} type='text' placeholder='Search Places' ref={inputRef} />
            </div>
            <div className={styles.tableWrapper}>
                <Table data={citiesData?.data} isLoading={isLoading} />
                <div className={styles.limitAndPagination}>
                    <select
                        className={styles.limits}
                        onChange={(e) => {
                            setLimit(e.target.value);
                            setCurrentPage(1);
                        }}>{
                            limitOptions.map((lOptn) => {
                                return (
                                    <option value={lOptn.value} key={lOptn.value}>{lOptn.label}</option>
                                )
                            })
                        }</select>
                    <Pagination nPages={Math.ceil(citiesData?.metadata?.totalCount / limit) ?? 0} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </div>
    )
}

export default SearchPlaces