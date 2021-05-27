import { Pagination as Pagination2 } from 'react-bootstrap';


export const Pagination = ({itemsPerPage,totalItems,paginate, currentPage}) => {

    const pageNumbers=[];

    for (let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++) {
        
        pageNumbers.push(i);
        
    }
    
    return (
        <Pagination2 className="d-flex justify-content-center">
           {pageNumbers.map(number=>(
               <Pagination2.Item onClick={()=>paginate(number)} key={number} active={number==currentPage}>
                   {number}
               </Pagination2.Item> 
                ))}
        </Pagination2>
    )
}
