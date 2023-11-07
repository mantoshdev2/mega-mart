import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import ProductList from "@/components/ProductList";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import SortBy from "@/components/SortBy";
import { selectSearchQuery } from "@/slices/productSlice";
import { useSelector } from "react-redux";

export default function Home({ products }) {
  const searchQuery = useSelector(selectSearchQuery);
  return (
    <div>
      <Head>
        <title>megamart.com | Save Money. Live Better</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/static/images/mega-mart-logo.png" />
      </Head>
      <main>
        <div className="bg-gray-200">
          <Header />
          <SortBy />

          {/* {searchQuery === "" && <Banner />} */}
          <Banner />

          <ProductList products={products} />

          <Feedback />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const [responseMongoDB, responseDummyJSON] = await Promise.all([
      fetch("https://mega-mart-shopping.vercel.app/api/electronics"),
      fetch("https://dummyjson.com/products")
    ]);

    const dataMongoDB = await responseMongoDB.json();
    const dataDummyJSON = await responseDummyJSON.json();

    const combinedData = [
      ...dataMongoDB.result.map((product) => ({
        ...product,
        source: "MongoDB API",
        price: parseFloat((product.price / 83).toFixed(2)),
        id: product._id,
      })),
      ...dataDummyJSON.products.map((product) => ({
        ...product,
        id: (product.id + 100).toString(),
        source: "Dummy JSON API",
        image: product.images[0],
        ratingcount: product.stock * 2,
      })),
    ];

    return {
      props: {
        products: combinedData || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}
