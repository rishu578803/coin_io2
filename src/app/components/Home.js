"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchInput from "./SearchInput";
import ExchangeTable from "./ExchangesTable";
import Pagination from "./Pagination";
import "./comman.scss";
import Filter from "./Filter";
import { useRouter } from "next/navigation";

const Home = () => {
  const API_KEY = "855e90be-5587-4c33-b959-9bd479f20a0f";
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exchangesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for token only on the client-side
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      setToken(accessToken);
      if (!accessToken) {
        router.push('/login'); // Redirect to login if no token
      }
    }
  }, []);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const exchanges_response = await axios.get(
          "https://rest.coinapi.io/v1/exchanges",
          {
            headers: {
              "X-CoinAPI-Key": API_KEY,
            },
          }
        );

        const exchangesicon_response = await axios.get(
          "https://rest.coinapi.io/v1/exchanges/icons/32",
          {
            headers: {
              "X-CoinAPI-Key": API_KEY,
            },
          }
        );

        const dataWithIcons =
          exchanges_response &&
          exchanges_response.data.map((exchange) => {
            const icon =
              exchangesicon_response &&
              exchangesicon_response.data.find(
                (icon) => icon.exchange_id === exchange.exchange_id
              );
            return { ...exchange, icon_url: icon?.url };
          });

        setExchanges(dataWithIcons);
        setFilteredExchanges(dataWithIcons);
      } catch (error) {
        console.error("Error fetching exchanges:", error);
      }
    };

    fetchExchanges();
  }, []);

  const indexOfLastExchange = currentPage * exchangesPerPage;
  const indexOfFirstExchange = indexOfLastExchange - exchangesPerPage;
  const currentExchanges = filteredExchanges.slice(
    indexOfFirstExchange,
    indexOfLastExchange
  );

  useEffect(() => {
    const filtered = exchanges.filter((exchange) => {
      if (exchange && exchange.name) {
        return exchange.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    setFilteredExchanges(filtered);
  }, [searchTerm]);

  const handleVolumeChange = (e) => {
    const volume = e.target.value;

    let minVolume = 0;
    let maxVolume = Infinity;

    if (volume === "1 million - 20 million") {
      minVolume = 1e6;
      maxVolume = 20e6;
    } else if (volume === "20 million - 50 million") {
      minVolume = 20e6;
      maxVolume = 50e6;
    } else if (volume === "50 million - 80 million") {
      minVolume = 50e6;
      maxVolume = 80e6;
    } else if (volume === "80 million - 1 billion") {
      minVolume = 80e6;
      maxVolume = 1e9;
    } else if (volume === "1 billion - 20 billion") {
      minVolume = 1e9;
      maxVolume = 20e9;
    }

    const filtered = exchanges.filter((exchange) => {
      const exchangeVolume = exchange.volume_1day_usd || 0;
      return exchangeVolume >= minVolume && exchangeVolume <= maxVolume;
    });

    setFilteredExchanges(filtered);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="top_header text-center mt-5">Top Crypto Exchanges</h1>
      <p className="sub_header text-center">
        Compare all top crypto exchanges. The list is ranked by trading
        volume.
      </p>
      <SearchInput setSearchTerm={setSearchTerm} />
      <Filter handleVolumeChange={handleVolumeChange} />
      <ExchangeTable exchanges={currentExchanges} />
      <Pagination
        exchangesPerPage={exchangesPerPage}
        totalExchanges={filteredExchanges.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
