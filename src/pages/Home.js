import Product from "../components/Product";
import { useSelector } from 'react-redux';
import { selectProducts } from '../redux/selectors/productSelector';

const Home = () => {

  const products = useSelector(selectProducts); 

  return (
    <>
      <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-4 max-w-6xl mx-auto p-2 ">
        {products.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};

export default Home;
