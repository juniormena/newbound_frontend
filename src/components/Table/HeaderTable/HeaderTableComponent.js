import { useState } from 'react';

function HeaderTableComponent({ columns, onSorting, headerFontSize}) {



    const [sortingField,setSortingField] = useState("");
    const [sortingOrder,setSortingOrder] = useState("asc");

    const onSortingChange = field=>{
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    }

  return (
    <thead>
      <tr>
        {columns?.map(({name, field, sortable}) => (
          <th style={{fontSize:headerFontSize && headerFontSize }} key={name} className="text-uppercase text-center" onClick={()=> sortable ? onSortingChange(field): null}>
            {name} {sortingField && sortingField === field && (
                <i className={`${sortingOrder === "asc" ? "fa fa-angle-down" : "fa fa-angle-up"} `}/>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}




export default HeaderTableComponent;
