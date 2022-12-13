import PropTypes from "prop-types";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import {
  NewsletterApi,
  NewslettersDelete200ResponseNewslettersInner,
} from "src/core/API";

const NewsletterSelect = () => {
  const NewslettersAPI = new NewsletterApi();
  const [newsletters, setNewsletters] = useState<
    NewslettersDelete200ResponseNewslettersInner[]
  >([{ createdAt: "", id: 1, name: "", updatedAt: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = () => {};

  const fetchNewsletters = async () => {
    try {
      setIsLoading(true);
      const newsletters = await NewslettersAPI.newslettersGet();
      if (newsletters.status === 200) {
        setNewsletters(newsletters.data.newsletters);
      } else {
        // error message here
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Newsletter</InputLabel>
      <Select onChange={onChange} label="Status" autoWidth>
        {newsletters.map((statusOption) => (
          <MenuItem key={statusOption.id} value={statusOption.id}>
            {statusOption.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NewsletterSelect;
