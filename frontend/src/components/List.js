import { React } from 'react'
import data from "../data/train.json"

function List(props) {

    // Check the input value and return the passenger list
    const filteredData = data.filter((el) => {   
        if (props.input === '') {
            return el;
        }
        else {
            return el.Name.toLowerCase().includes(props.input)
        }
    })


    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.PassengerId}>{item.Name}</li>
            ))}
        </ul>
    )
}

export default List
