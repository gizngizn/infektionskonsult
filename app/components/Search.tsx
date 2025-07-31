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

      <section className={styles.section}>
          <form action="">
            <div className={styles.input}>
              <input 
                type="text" 
                required placeholder=" "
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
              />
              <span>{placeholder}</span>
            </div>
          </form>
      </section>
  );
}

