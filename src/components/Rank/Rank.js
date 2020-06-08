import React from 'react';

const Rank = ({name, entries}) => {

return(
    
 <div className="tc f3">
  <p> {`Welcome ${name}, Your current rank is ...`} </p>
  <p> {`${entries}`} </p>
 </div>

)


}

export default Rank;