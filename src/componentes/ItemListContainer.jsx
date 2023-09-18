import { useEffect, useState } from "react"
import "./ItemListContainer.css"
import { Spinner } from "./Loader";
import { RenderProductos} from "./asyncmock";
import { ItemListProd } from "./ItemList";
import { useParams } from "react-router-dom";

export const ItemListContainer = ({ greeting}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [prod, setProd] = useState([]);
  const category = useParams().category
  console.log(category)

  useEffect(() => {
    RenderProductos()
      .then((response) => {
        if (category) {
          setProd(response.filter((prod) => prod.category === category))
        } else {
          setProd(response);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }, [category])


  if (isLoading) return <Spinner />
  
  return <>
      <h1>{greeting}</h1>
      <ItemListProd productos={prod} />
    </>
}

