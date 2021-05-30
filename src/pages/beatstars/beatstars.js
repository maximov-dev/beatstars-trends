import dateFnsFormat from "date-fns/format";
import { useState, useEffect } from "preact/hooks";
import DataService from "../../services/data-service";
import DatePickerCustom from "../../components/date-picker";
import GridWrapper from "../../components/grid-wrapper";

export default function BeatStarsPage(props) {
  const [beatStarsPopularTags, setBeatStarsPopularTags] = useState(null);
  const dateFormat = "yyyy-MM-dd";
  const currentDate = new Date();

  const [dateRange, setDateRange] = useState([currentDate, currentDate]);

  useEffect(() => {
    const dataService = new DataService();
    const [start, end] = dateRange;
    const startDate = dateFnsFormat(start, dateFormat);
    const endDate = dateFnsFormat(end, dateFormat);
    let isMounted = true;

    dataService
      .getBeatStarsTagDataByDate({ startDate, endDate })
      .then((value) => {
        if (isMounted) {
          const mappedData = value.response.data.list.map((item) => {
            return {
              tagName: item.search,
              resultsCount: item.nbHits,
              usersRequests: item.count,
            };
          });
          setBeatStarsPopularTags(mappedData);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [dateRange]);
  const columns = ["tagName", "resultsCount", "usersRequests"];

  return (
    <div class="container">
      <DatePickerCustom date={dateRange} setDateRange={setDateRange} />
      <GridWrapper
        columns={columns}
        gridTitle={"Popular Tags"}
        data={beatStarsPopularTags}
      />
    </div>
  );
}
