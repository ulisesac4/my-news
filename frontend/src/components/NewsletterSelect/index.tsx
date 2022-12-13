import PropTypes from "prop-types";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import {
  NewsletterApi,
  NewslettersDelete200ResponseNewslettersInner,
} from "src/core/API";

const NewsletterSelect = ({ onSelectNewsletter }) => {
  const NewslettersAPI = new NewsletterApi();
  const [newsletterValue, setNewsletterValue] = useState(0);
  const [newsletters, setNewsletters] = useState<
    NewslettersDelete200ResponseNewslettersInner[]
  >([{ createdAt: "", id: 0, name: "-rtnsj", updatedAt: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (value) => {
    setNewsletterValue(value.target.value);
    onSelectNewsletter(value.target.value);
  };

  const fetchNewsletters = async () => {
    try {
      setIsLoading(true);
      const newsletters = await NewslettersAPI.newslettersGet();
      if (newsletters.status === 200) {
        setNewsletters(newsletters.data.newsletters);
        try {
          setNewsletterValue(newsletters.data.newsletters[0].id);
          onSelectNewsletter(newsletters.data.newsletters[0].id);
        } catch (error) {}
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
      <Select
        onChange={onChange}
        label="Status"
        autoWidth
        value={newsletterValue}
      >
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
