import React from 'react';
import styles from '../Css/Client.module.css';

const Pagination = ({postsPerPage , totalPosts , paginate }) => {
    const pageNumbers = [];
    for(let i = 1 ; i<= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div className={styles.page_section}>
            <ul className={styles.ul_section}>
                 {pageNumbers.map(number => (
                     <li className= {styles.li_section} key={number}>
                        <a className={styles.a_section} onClick={() => paginate(number)}>
                            {number}
                        </a>
                     </li>
                 ))}
            </ul>
        </div>
  )
}

export default Pagination