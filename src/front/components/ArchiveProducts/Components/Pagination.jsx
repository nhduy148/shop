import React, {} from 'react';

const Pagination = ({...props}) => {

  let { total, limit, currentPage, changeCurrentPagi } = props;

  let totalPagi = Math.ceil(total / limit);
  let pagiItem = [];

  for (let i = 1; i <= totalPagi; i++) {
    pagiItem.push(i);
  }

  currentPage = parseInt(currentPage);
  // If is first page *don't have "First" and "Prev" button
  if (currentPage === 1){
    pagiItem = [...pagiItem, "Next", "Last"]
  }
  // esle If is first page *don't have "Next" and "Last" button
  else if(currentPage === totalPagi){
    pagiItem = [ "First", "Prev", ...pagiItem ]
  }
  // esle full button
  else{
    pagiItem = [ "First", "Prev", ...pagiItem, "Next", "Last" ]
  }


  return total > limit
      ?
      <div className="pagination">
        {
          pagiItem.map((val, i) =>
  
            <span
              key={i}
              className={`pagination__item${currentPage === val ? ' -current' : ''}`}
              data-pagi={
                // if
                val === "First" ? 1 
                // else if
                : val === "Prev" ? currentPage - 1
                // else if
                : val === "Next" ? currentPage + 1
                // else if
                : val === "Last" ? totalPagi
                // else
                : val
              }
              onClick={ (e) => changeCurrentPagi(e) }
            >
              {val}
            </span>
          )
        }
      </div>
    : null
}

export default Pagination

