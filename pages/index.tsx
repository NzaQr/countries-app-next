import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import CountryCard from "../components/CountryCard";
import { FaSearch } from "react-icons/fa";

const Home: NextPage = ({ countries }: any) => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");

  const searchCountry = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${query}`
    );
    const res = await response.json();
    countries = res;
  };

  const updateCountries = countries.filter(
    (country: { name: { common: string }; region: string }) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()) &&
      country.region.toLowerCase().includes(region.toLocaleLowerCase())
  );

  return (
    <>
      <Head>
        <title>Where in the world?</title>
      </Head>
      <form onSubmit={searchCountry}>
        <div className={styles.positionRelative}>
          <input
            className={styles.searchBar}
            placeholder="Search country"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <FaSearch className={styles.searchImage} />
        </div>
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </form>
      <div className={styles.container}>
        {updateCountries.map((country: { name: { common: string } }) => {
          return (
            <div key={country.name.common}>
              <CountryCard country={country} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const json = await res.json();

  return {
    props: {
      countries: json,
    },
  };
}

export default Home;
