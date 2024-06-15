import { Input } from '@chakra-ui/react';
import FlexSearch from 'flexsearch';
import { useEffect, useState } from 'react';

type Data = {
  nombres: string;
  apellidos: string;
  email: string;
  rut: string;
};

function FullTextSearchBar({ data }: { data: Data[] }) {
  const [index, setIndex] = useState(new FlexSearch.Index({}));

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FlexSearch.IndexSearchResult>([]);

  useEffect(() => {
    setIndex(new FlexSearch.Index({}));
    data.forEach((item) => {
      setIndex((prev) =>
        prev.add(
          item,
          [item.nombres, item.apellidos, item.email, item.rut].join(' ')
        )
      );
    });
  }, [data]);

  useEffect(() => {
    setResults(index.search(query));
    console.log(results);
  }, [query]);

  return (
    <>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} />
    </>
  );
}

export default FullTextSearchBar;
