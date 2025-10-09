import { ProductDetailPage } from "./components/ProductDetailPage/ProductDetailPage";
import { mockProductDetailProps } from "./productDetailMockData";

function App() {
  const handleAddReview = async (rating: number, comment: string) => {
    console.log('Mock review added:', { rating, comment });
  };

  return <ProductDetailPage {...mockProductDetailProps} onAddReview={handleAddReview} userHasReviewed={false} />;
}

export default App;
