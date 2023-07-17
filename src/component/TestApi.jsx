import { useEffect, useState } from "react";
import SupabaseService from "../tools/SupabaseClient";

const TestApi = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const sbs = new SupabaseService();

    sbs.getTest().then((p) => {
        setClasses(p.data);
    });
  }, []);

  

    console.log(classes)
  return classes?.map((cl) => <>{cl.id} : {cl.name}</>);
};

export default TestApi;