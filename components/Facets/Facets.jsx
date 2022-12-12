import { MdClose } from "react-icons/md";
import Facet from "../categorise/Facet";

export default function Facets({
  facets,
  collectionsOpen,
  setQuery,
  query,
  queryIsNotChanged,
  setQueryIsNotChanged,
  renderTitleAndCloseButton
}) {
  return (
    <div
      className="flex w-full h-full"
      style={{
        display: "flex",
        paddingTop: renderTitleAndCloseButton ? "84px" : "0"
      }}
    >
      {renderTitleAndCloseButton && (
        <div
          style={{ zIndex: "1" }}
          className=" fixed top-0 left-0 mx-auto my-0 w-full p-5 flex items-center justify-between font-semibold text-xl bg-black text-white"
        >
          <h2>Facets</h2>
          <div className="text-white text-3xl cursor-pointer">
            <MdClose />
          </div>
        </div>
      )}
      {facets.length > 0 &&
        facets.map((facet, index) => {
          console.log("facet", facet);
          return (
            <>
            
            <Facet
              index={index}
              key={facet.title}
              query={query}
              setQuery={setQuery}
              facet={facet}
              collectionsOpen={collectionsOpen}
              queryIsNotChanged={queryIsNotChanged}
              setQueryIsNotChanged={setQueryIsNotChanged}
            />
            </>
          );
        })}
    </div>
  );
}
