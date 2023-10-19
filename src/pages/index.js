  import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import ProductList from "@/components/ProductList";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import SortBy from "@/components/SortBy";
import { selectSearchQuery } from "@/slices/productSlice";
import { useSelector } from "react-redux";

export default function Home({products}) {
  const searchQuery = useSelector(selectSearchQuery);
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
        <SortBy />
        
        {searchQuery === "" && <Banner />}

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
    // Fetching data from the first API
    // const response1 = await fetch("https://fakestoreapi.com/products");
    // const data1 = await response1.json();
    
    // Fetching data from the second API
    const response2 = await fetch('https://dummyjson.com/products');
    const data2 = await response2.json();

    // Fetching data from the third API (http://localhost:3000/api/electronics) (my mongoDB api)
    const response3 = await fetch('https://mega-mart-shopping.vercel.app/api/electronics');
    const data3 = await response3.json();

    // Combining the data from all three APIs into a single array
    const combinedData = [
      // ...data1.map((product) => ({
      //   ...product,
      //   source: "API1",
      //   rating: product.rating.rate,
      //   ratingcount: product.rating.count,
      //   id: product.id.toString()
      // })),
      
      ...data3.result.map((product) => ({
        ...product,
        source: "MongoDB API",
        price: parseFloat((product.price / 83).toFixed(2)),
        id: product._id,
        source:"API3" //added a source field to distinguish the data source
      })),
      ...data2.products.map((product) => ({
        ...product,
        id: (product.id + 100).toString(),
        source: "API2",
        image: product.images[0],
        ratingcount: product.stock * 2,
      })),
    ];

    // console.log('Combined Data:', combinedData);

    return {
      props: {
        products: combinedData || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        products: [],
      },
    };
  }
}


// export async function getServerSideProps(context) {
//   try {
//     // Fetching data from the first API
    
    
//     // Fetching data from the second API
//     const response2 = await fetch('https://dummyjson.com/products');
//     const data2 = await response2.json();

//     // Fetching data from the third API (http://localhost:3000/api/electronics) (my mongoDB api)
//     const response3 = await fetch('https://mega-mart-pink.vercel.app/api/electronics');
//     const data3 = await response3.json();

//     // Combining the data from all three APIs into a single array
//     const combinedData = [
     
//       ...data2.products.map((product) => ({
//         ...product,
//         id: (product.id + 100).toString(),
//         source: "API2",
//         image: product.images[0],
//         ratingcount: product.stock * 2,
//       })),
//       ...data3.result.map((product) => ({
//         ...product,
//         source: "MongoDB API",
//         price: parseFloat((product.price / 83).toFixed(2)),
//         id: product._id,
//         source:"API3" //added a source field to distinguish the data source
//       })),
//     ];

//     console.log('Combined Data:', combinedData);

//     return {
//       props: {
//         products: combinedData || [],
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         products: [],
//       },
//     };
//   }
// }