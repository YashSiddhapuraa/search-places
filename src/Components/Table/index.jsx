import './styles.css';

const Table = ({ data, isLoading }) => {
    return (
        <div className="table">

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Place Name</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ?
                        <tr>
                            <td colSpan={3} className='loading'><div className='loading'> Loading...</div></td>
                        </tr>
                        :
                        data?.length ? data?.map(({ name, country }, ind) => (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{name}</td>
                                <td>{country}</td>
                            </tr>
                        )) : <tr>
                            <td colSpan='3' className={"noDataFound"}>No Data Found!</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Table