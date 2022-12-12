import { useState, useEffect } from "react";
import { SHOW_PER_PAGE } from "../../project-config";
import { useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import Modal from "../elements/Modal/Modal.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchingCategorySuccess,
  nextScrollPageAction
} from "../../redux/actions/categoryActions";
import SkeletonCategoryItems from "./SkeletonCategoryItems";
import ItemCard from "../shared-components/ItemCard";
import { fetchMyAPI, setFacetsAPI } from "../../pages/shop/[...slug]";
import { useRouter } from "next/router";
import { fetchingFilterSuccess } from "../../redux/actions/facetActions";

export default function CategoryItems({
  categoryItems,
  scrollPage,
  lastPage,
  cidN,
  dispatch,
  queryMappedToParams,
  query,
  setFacets,
  sortBy,
  queryIsNotChanged,
  setAuthModal,
  authModal
}) {
  const router = useRouter();
  console.log("categoryItems", categoryItems);
  const [loadMoreScrollPage, setLoadMoreScrollPage] = useState(true);
  //const [authModal, setAuthModal] = useState(false);
  const [clickedLoadScrollPageButtonOnce, setClickedLoadScrollPageButtonOnce] =
    useState(false);
  const itemsAreBeingFetchedState = useSelector(
    state => state.facetReducer.itemsAreBeingFetched,
    shallowEqual
  );
  const urlFilterParamsState = useSelector(
    state => state.facetReducer.urlFilterParams,
    shallowEqual
  );
  const initialStaticCategoryDataState = useSelector(
    state => state.categoryReducer.initialStaticCategoryData,
    shallowEqual
  );

  useEffect(() => {
    if (query?.length > 0 || sortBy !== "") {
      fetchQueryData(query, sortBy);
    }
    console.log("queryIsNotChanged", queryIsNotChanged);

    if (
      query.length === 0 &&
      initialStaticCategoryDataState &&
      initialStaticCategoryDataState.json &&
      queryIsNotChanged === false
    ) {
      dispatch(fetchingCategorySuccess(initialStaticCategoryDataState));
      if (initialStaticCategoryDataState?.json?.[2]?.facets)
        setFacetsAPI(
          setFacets,
          initialStaticCategoryDataState?.json?.[2]?.facets
        );
    }
  }, [query, sortBy]);

  useEffect(() => {
    setLoadMoreScrollPage(true);
    setClickedLoadScrollPageButtonOnce(false);
  }, [cidN]);

  const handleLoadNextScrollPage = () => {
    const nextScrollPage = scrollPage + 1;
    if (scrollPage < lastPage) {
      dispatch(
        nextScrollPageAction(
          cidN,
          nextScrollPage,
          queryMappedToParams,
          setLoadMoreScrollPage,
          clickedLoadScrollPageButtonOnce,
          lastPage
        )
      );
    }
  };

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  if (itemsAreBeingFetchedState) {
    return (
      <>
        <span>Loading...</span>
        <SkeletonCategoryItems numberOfItems={SHOW_PER_PAGE} />
      </>
    );
  }

  const fetchQueryData = async (query, sortBy) => {
    const json = await fetchMyAPI({
      id: cidN,
      query: queryMappedToParams,
      sortBy,
      keyword: router.query.slug[1],
      type: "shop"
    });

    if (json.error) {
      console.error("Error setting category items", json.error);
      return;
    } else if (Array.isArray(json) && json.length === 0) {
      // setCategories(json); TODO: No items found
    } else {
      //setCategories([...json[1]?.items]);

      const tempages = [];
      const numOfpages = Number(json[0].numOfPages);
      for (let i = 1; i <= numOfpages; i++) {
        tempages.push(i);
      }
      const numberOfItems = Number(json[4].itemsCount);
      const categoryItems = json[1].items;
      const facets = json[2].facets;
      const pages = tempages;
      const bread = null;

      dispatch(
        fetchingFilterSuccess(
          numberOfItems,
          categoryItems,
          facets,
          pages,
          bread
        )
      );
      setFacetsAPI(setFacets, facets);
    }
  };

  return (
    <>
      {/* <Modal
          renderAlways={true}
          open={authModal}
          onClose={() => setAuthModal(false)}
        >
          <div>Sivaaaaaaaaaaaaaa</div>
        </Modal> */}
      {/* <span>Displaying: {categoryItems.length} products</span> */}
      <Wrapper>
        <InfiniteScroll
          dataLength={categoryItems.length}
          next={handleLoadNextScrollPage}
          hasMore={scrollPage < lastPage && loadMoreScrollPage}
          loader={
            <>
              <div className="loader flex items-center justify-center w-full px-3 mb-2">
                <span className="text-lg font-bold">Loading...</span>
              </div>
              <div className="loader w-full">
                <SkeletonCategoryItems numberOfItems={SHOW_PER_PAGE} />
              </div>
            </>
          }
        >
          {categoryItems.map(item => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                setAuthModal={setAuthModal}
                authModal={authModal}
              />
            );
          })}
          {loadMoreScrollPage === false && (
            <div className="showMoreWrapper">
              <button
                aria-describedby="Load more products"
                onKeyDown={e => {
                  if (e.code === "Enter") {
                    e.target.click();
                  }
                }}
                className="showMoreBtn"
                onClick={() => {
                  setLoadMoreScrollPage(true);
                }}
              >
                Show More Products
              </button>
            </div>
          )}
        </InfiniteScroll>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  margin-top: 10px;
  width: 100%;

  img {
    width: 100%;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;
    }
  }

  .infinite-scroll-component {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    -webkit-column-gap: 20px;
    -moz-column-gap: 20px;
    width: 100%;
    overflow: hidden !important;
    padding: 3px !important;
  }

  .itemFamily {
    color: #333;
  }

  .itemBrand {
    font-size: 12px;
    margin-bottom: 0.6rem;
    margin-top: 0.6rem;
    font-style: italic;
    color: rgb(102, 102, 102);
  }

  .itemTitle {
    display: block;
    font-size: 12px;
    color: rgb(102, 102, 102);
  }

  .itemPrice {
    font-size: 19px !important;
    text-align: left !important;
    font-weight: 600 !important;
    float: left !important;
    margin-top: 10px;
    width: 100% !important;
    justify-content: center;
    margin-bottom: 5px;
    display: flex;
    align-items: flex-end;
    color: #363636;
  }

  .showMoreWrapper {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .showMoreBtn {
    background: #333;
    padding: 12px 40px;
    color: white;
    width: 400px;
    max-width: 100%;
  }

  .loader {
    grid-column: 1 / -1;
  }

  @media only screen and (max-width: 1280px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media only screen and (max-width: 768px) {
    .itemFamily {
      font-size: 21px !important;
    }

    .infinite-scroll-component {
      grid-template-columns: repeat(1, 1fr);

      .item {
        width: 100%;
      }
    }

    .showMoreBtn {
      width: 100%;
    }
  }

  @media only screen and (max-width: 375px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
