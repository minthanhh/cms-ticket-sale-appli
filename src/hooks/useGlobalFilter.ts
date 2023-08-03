import { useState } from 'react';


interface DefaultType extends Object  {
  bookingCode?: string
}

const useGlobalFilter = <T extends DefaultType,>(data: T[]) => {
  const [filteredData, setFilteredData] = useState<T[]>([])
  const [searchText, setSearchText] = useState<string>('');
  
  const globalSearch = () => {
    const filteredData = data.filter((value) => {
      if ("bookingCode" in value) {
        return value.bookingCode?.toLowerCase().includes(searchText.toLowerCase()) ?? false;
      }
      return false
    })

    setFilteredData(filteredData);
 };

 return {
    setSearchText,
    filteredData,
    globalSearch,
    searchText,
    setFilteredData
 }
}

export default useGlobalFilter

