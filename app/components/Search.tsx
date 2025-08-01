'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import styles from './Search.module.css';
import { div } from 'framer-motion/client';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (

      <div className={styles.section}>
            <div className={styles.input}>
              <input 
                type="text" 
                required placeholder=" "
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();             // hindra eventuell submit
                    (e.currentTarget as HTMLInputElement).blur(); // tappar fokus
                }
                }}
                defaultValue={searchParams.get('query')?.toString()}
              />
              <span>{placeholder}</span>
              <button>🦠</button>
            </div>
      </div>
  );
}

