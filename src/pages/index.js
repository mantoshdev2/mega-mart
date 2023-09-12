  import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import ProductList from "@/components/ProductList";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>megamart.com | Save Money. Live Better</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/images/mega-mart-logo.png" />
        
      </Head>
      <main>
      <div className="bg-gray-200">
        <Header />
        
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
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );


  const modifiedProducts = products.map((product) => ({
    ...product,
    rating: product.rating.rate,
    ratingcount: product.rating.count,
  }));

  return {
    props: {
      products: modifiedProducts,
    },
  };
}
