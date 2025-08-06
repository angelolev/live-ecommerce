import { ProductDetailPage } from "./components/ProductDetailPage/ProductDetailPage";
import { mockProductDetailProps } from "./productDetailMockData";

function App() {
  return <ProductDetailPage {...mockProductDetailProps} />;
}

export default App;
