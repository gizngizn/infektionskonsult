'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './MoList.module.css';

interface Mo {
  mo: string;
  fullname: string;
  kingdom: string;
  rank: string;
  oxygen_tolerance: string;
}

const MoList = () => {
  const [mos, setMos] = useState<Mo[]>([]);
  const [filteredMos, setFilteredMos] = useState<Mo[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://msberends.r-universe.dev/AMR/data/microorganisms/json');
      const data: Mo[] = await res.json();
      setMos(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (query.length >= 3) {
      // Normalize the query by removing non-alphanumeric characters and splitting into words
      const queryWords = query
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove non-alphanumeric characters (punctuation)
        .split(' ')
        .filter(Boolean); // Split query into words and remove empty strings
  
      setFilteredMos(
        mos.filter((mo) =>
          mo.kingdom === 'Bacteria' && mo.rank === 'species' && queryWords.every((word) =>
            mo.fullname.toLowerCase().replace(/[^\w\s]/g, '').includes(word) // Match after removing punctuation
          )
        )
      );
    } else {
      setFilteredMos([]); // No microorganisms shown if query length is less than 3
    }
  }, [mos, query]);

  return (
    <>
  <div className={styles.molist}>
    {query.length >= 3 ? (
      filteredMos.length === 0 ? (
        <p>Inga bakterier</p>
      ) : (
        <ul>
          {filteredMos.map((mo) => (
            <li key={mo.mo}>{mo.fullname}</li>
          ))}
        </ul>
      )
    ) : null}
  </div>
    </>
  );
};

export default MoList;