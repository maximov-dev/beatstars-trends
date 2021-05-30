import { useState, useEffect } from "preact/hooks";
import { Fragment } from "preact/compat";
import Spinner from "../../components/spinner";
import GridWrapper from "../../components/grid-wrapper";

const AirBitMostPopularTable = ({ dataService }) => {
  const [airbitPopularTags, setAirBitPopularTags] = useState(null);

  useEffect(() => {
    let isMounted = true;

    dataService.getAirBitPopularTags().then((value) => {
      if (isMounted) {
        setAirBitPopularTags(value);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [dataService]);

  if (!airbitPopularTags) return <Spinner />;

  const columns = ["id", "name", "beatsCount"];

  return (
    <Fragment>
      <GridWrapper
        columns={columns}
        gridTitle={"Most Popular Tags"}
        data={airbitPopularTags.items}
      />
    </Fragment>
  );
};

const AirBitTopSellingBeatsTags = ({ dataService }) => {
  const [airbitTopSellingBeatsTags, setAirBitTopSellingBeatsTags] =
    useState(null);

  useEffect(() => {
    let isMounted = true;

    dataService.getAirBitTopSellingBeatsTags().then((value) => {
      if (isMounted) {
        const mappedData = value.item.items.map((item) => {
          return {
            genre: item.data.genre,
            tags: item.tags
              .reduce((acc, item) => [...acc, item.name], [])
              .join(","),
            soldCount: item.data.sold_count,
            plays: item.plays,
            name: item.name,
          };
        });
        setAirBitTopSellingBeatsTags(mappedData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [dataService]);

  if (!airbitTopSellingBeatsTags) return <Spinner />;

  const columns = ["name", "genre", "tags", "soldCount", "plays"];

  return (
    <Fragment>
      <GridWrapper
        columns={columns}
        gridTitle={"Top Selling Beats Tags"}
        data={airbitTopSellingBeatsTags}
      />
    </Fragment>
  );
};

export default function AirBitPage({ dataService }) {
  return (
    <div class="container">
      <AirBitMostPopularTable dataService={dataService} />
      <AirBitTopSellingBeatsTags dataService={dataService} />
    </div>
  );
}
