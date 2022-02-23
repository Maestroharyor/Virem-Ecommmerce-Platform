import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import WPVendorRepository from "../../repositories/WP/WPVendorRepository";
import WPStore from "../../wp-components/elements/stores/WPStore";
import { generateTempArray } from "../../utilities/common-helpers";
import SkeletonVendor from "../../components/elements/skeletons/SkeletonVendor";

const WPStores = ({ WPStoreData }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [storeItems, setStoreItems] = useState(WPStoreData);

  //   console.log(storeItems);
  
  const filteredStoreItems = storeItems.filter(store => store.first_name.toLowerCase().includes(search.toLowerCase()) || store.last_name.toLowerCase().includes(search.toLowerCase()) || store.store_name.toLowerCase().includes(search.toLowerCase()))
//   console.log(filteredStoreItems);

  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  const getMoreStore = async () => {
    // console.log("Srcolled");
    const newStores = await axios.get(
      `https://virem.learnmur.com.ng/wp-json/dokan/v1/stores?page=${currentPage}&per_page=100`
    );

    // console.log({ newStores });
    setStoreItems((store) => [...store, ...newStores.data]);
    setCurrentPage(currentPage + 1);
    if (newStores.data.length === 0) {
      setHasMore(false);
    }
    // setLoading(false);
  };

  return (
    <section className="ps-store-list">
      <div className="container">
        <div className="ps-section__header">
          <h3>Store list</h3>
        </div>
        <div className="ps-section__content">
          <div className="ps-section__search row">
            <div className="col-md-4">
              <div className="form-group">
                <button>
                  <i className="icon-magnifier"></i>
                </button>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search vendor..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {storeItems.length == 0 && <p>No store found.</p>}
          </div>
          {storeItems.length > 0 && (
            <>
              <InfiniteScroll
                dataLength={storeItems.length}
                next={getMoreStore}
                hasMore={hasMore}
                scrollThreshold={"50%"}
                className="row"
                loader={
                  <>
                    <div className="col-md-4">
                      <SkeletonVendor />
                    </div>
                    <div className="col-md-4">
                      <SkeletonVendor />
                    </div>
                    <div className="col-md-4">
                      <SkeletonVendor />
                    </div>
                  </>
                }
                endMessage={
                  <h4 className="pt-5 pb-5 fs-1">No stores left to show...</h4>
                }
              >
                {filteredStoreItems.map((item) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 "
                    key={item.id}
                  >
                    <WPStore store={item} />
                  </div>
                ))}
              </InfiniteScroll>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WPStores;
