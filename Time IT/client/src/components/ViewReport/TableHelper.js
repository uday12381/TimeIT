import React from 'react';
class TableHelper extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        console.log(this.props.value);
        const data = this.props.value.map(a => {
            let i = 0;
            a[1].map(b => {
                return( 
                    <div>
                <tr>
                    <td>{i++}</td>
                    <td>{b.Name}</td>
                    <td>{b.slotStart}</td>
                    <td>{b.slotEnd}</td>
                </tr>
                </div>
                )
                
            });
        })
        console.log(data);
        return (
            <div>
                {data}
            </div>
        )
    }
}
export default TableHelper;