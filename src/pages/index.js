  import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import ProductList from "@/components/ProductList";

export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>megamart.com | Save Money. Live Better</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <main>
      <div>
        <Header />
        
        <Banner />

        <ProductList products={products} />
        </div>
        
       
      </main>
      
      
      </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}
