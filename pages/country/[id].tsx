import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/country.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { GetStaticPaths } from "next";

export default function Post({ country }: any) {
  return (
    <>
      <Head>
        <title> Where in the world?</title>
      </Head>
      <div className={styles.container}>
        <Link href={"/"}>
          <a className={styles.backBtn}>
            <FaArrowLeft />
            <span className={styles.backBtnText}>Back</span>
          </a>
        </Link>
        {country.map((country: any) => {
          const {
            area,
            flags,
            name,
            population,
            region,
            subregion,
            capital,
            languages,
          } = country;
          return (
            <div key={area}>
              <div className={styles.countryInfoContainer}>
                <div className={styles.flag}>
                  <Image
                    src={flags.svg}
                    alt={`${name.common} flag`}
                    width={600}
                    height={400}
                  />{" "}
                </div>
                <div className={styles.detailsContainer}>
                  <h2>{name.common}</h2>
                  <div className={styles.listContainer}>
                    <ul>
                      <li>
                        <span className={styles.bold}>Population: </span>
                        {population}
                      </li>
                      <li>
                        <span className={styles.bold}>Region: </span>
                        {region}
                      </li>
                      {subregion && (
                        <li>
                          <span className={styles.bold}>Sub Region: </span>
                          {subregion}
                        </li>
                      )}

                      {capital && (
                        <li>
                          <span className={styles.bold}>Capital: </span>
                          {capital[0]}
                        </li>
                      )}
                      {languages && (
                        <li>
                          <span className={styles.bold}>Languages: </span>
                          {Object.values(languages).join(", ")}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const getStaticProps = async (context: { params: { id: any } }) => {
  const id = context.params.id;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(id)}`
  );
  const json = await res.json();

  return {
    props: {
      country: json,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const json = await res.json();
  const paths = json.map((countries: { name: { common: string } }) => ({
    params: { id: countries.name.common },
  }));
  return {
    paths: paths,
    fallback: true,
  };
};
