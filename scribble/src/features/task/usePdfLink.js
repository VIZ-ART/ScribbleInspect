import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function usePdfLink() {
  const [pdfLink, setPdfLink] = useState(null);
  const { fileLink, isLoading } = useSelector((store) => store.task);

  useEffect(() => {
    async function fetchData() {
      setPdfLink(fileLink);
    }
    fetchData();
  }, []);

  return pdfLink;
}
