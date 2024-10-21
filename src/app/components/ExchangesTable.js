"use client";



import React from "react";

const ExchangeTable = ({ exchanges }) => {
  function convertVolume(volume) {
    if (volume >= 1e9) {
      // Convert to billions
      const billionValue = volume / 1e9; // Divide by 1 billion
      const formattedValue = billionValue.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formattedValue + " billion";
    } else {
      // Convert to millions
      const millionValue = volume / 1e6; // Divide by 1 million
      const formattedValue = millionValue.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formattedValue + " million"; // Append " million"
    }
  }

  // Example usage
  const volume1 = 4232765020.48;
  const result1 = convertVolume(volume1);
  console.log(result1);

  const volume2 = 500000;
  const result2 = convertVolume(volume2);
  console.log(result2);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {exchanges.length > 1 ? (
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="th_color">Exchange</span>
                  </th>
                  <th scope="col">
                    <span className="th_color">24H Trade Volume</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {exchanges.map((exchange, index) => (
                  <tr key={exchange.exchange_id} className="py-3">
                    <td className="td_color py-3">
                      {index + 1}{" "}
                      <img
                        src={exchange.icon_url}
                        alt="img"
                        style={{
                          width: "32px",
                          height: "32px",
                          marginRight: "10px",
                          marginLeft: "10px",
                        }}
                      />
                      {exchange.name}
                    </td>

                    <td>
                      {exchange.volume_1day_usd
                        ? "$ " + convertVolume(exchange.volume_1day_usd)
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div class="d-flex justify-content-center">
              <div class="spinner-border " role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeTable;
