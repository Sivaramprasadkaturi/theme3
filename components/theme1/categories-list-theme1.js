import Link from "next/link";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";
import Image from "next/image";
import Head from "next/head";
import "../"

const HomeBanner = () => {
  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>

      <div className="category-list">
        <div className="homebanner-image-wrapper">
          <h1>Summer Collection</h1>
          <h6>Discover our summer collection and much more</h6>
          <button>Explore Collection</button>
        </div>

      </div>


    </>
  );
};

export default HomeBanner;
