import { FaTimes} from "react-icons/fa";
import { useSearchActions } from "@yext/search-headless-react";
import { StandardFacets, executeSearch,  } from "@yext/search-ui-react";
import { useBreakpoint } from "src/common/useBreakpoints";
import ActiveFacets from "src/components/search/ActiveFacets";

type FacetsModalProps = {
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FacetsModal = (props: FacetsModalProps) => {
  const isDesktop = useBreakpoint("sm");
  const searchActions = useSearchActions();
  const facets = searchActions.state.filters.facets;

  const handleClearAllFacets = () => {
    searchActions.resetFacets();
    executeSearch(searchActions);
    props.setFiltersOpen(false);
  }

  return (
    <div className="Locator-facetsModal">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold text-brand-primary">
          Refine Your Search
        </h3>
        <button className="ml-auto"
          onClick={() => props.setFiltersOpen(false)}
        >
          <FaTimes className="text-brand-primary" />
        </button>
      </div>
      {!isDesktop && <ActiveFacets />}
      <div className="h-px bg-brand-gray-300 w-screen -mx-4 mb-4 sm:mx-0 sm:w-full">{/* Divider */}</div>
      <StandardFacets
        collapsible={false}
        showOptionCounts={true}
        customCssClasses={{
          standardFacetsContainer: 'w-full overflow-y-auto',
          titleLabel: "text-lg font-bold text-brand-primary",
          optionLabel: "text-sm",
          divider: "w-full bg-white my-3",
        }}
        searchOnChange={true}
      />
      <div className="text-center mt-6">
        <button className="Link Link--primary disabled:text-brand-gray-400"
          onClick={handleClearAllFacets}
          disabled={facets?.filter(facet => facet.options.filter(f => f.selected).length).length ? false : true}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default FacetsModal;
