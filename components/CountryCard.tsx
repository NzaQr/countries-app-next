import React from "react";
import Link from "next/link";
import styles from "./CountryCard.module.css";
import Image from "next/image";

export default function CountryCard({
  country: { flags, name, population, region, capital },
}: any) {
  return (
    <div className={styles.container}>
      <Link href={`/country/${name.common}`}>
        <a className={styles.link}>
          <div className={styles.flagContainer}>
            <Image
              className={styles.flag}
              src={flags.svg}
              alt={`${name.common} flag`}
              width="100%"
              height="70%"
              objectFit="fill"
              layout="responsive"
            />
          </div>
          <div className={styles.info}>
            <h3 className="name">{name.common}</h3>
            <ul>
              <li>
                <span className={styles.bold}>Population:</span> {population}
              </li>
              <li>
                <span className={styles.bold}>Region: </span>
                {region}
              </li>
              <li>
                <span className={styles.bold}>Capital: </span>
                {capital}
              </li>
            </ul>
          </div>
        </a>
      </Link>
    </div>
  );
}
