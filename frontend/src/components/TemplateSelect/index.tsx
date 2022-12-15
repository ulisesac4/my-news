import PropTypes from "prop-types";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import {
  TemplateApi,
  TemplatesDelete200ResponseTemplatesInner,
} from "src/core/API";

const TemplateSelect = ({ onSelectTemplate }) => {
  const TemplatesAPI = new TemplateApi();
  const [templateValue, setTemplateValue] = useState(0);
  const [templates, setTemplates] = useState<
    TemplatesDelete200ResponseTemplatesInner[]
  >([{ createdAt: "", id: 0, name: "-rtnsj", updatedAt: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (value) => {
    setTemplateValue(value.target.value);
    onSelectTemplate(value.target.value);
  };

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const templates = await TemplatesAPI.templatesGet();
      if (templates.status === 200) {
        setTemplates(templates.data.templates);
        try {
          setTemplateValue(templates.data.templates[0].id);
          onSelectTemplate(templates.data.templates[0].id);
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
    fetchTemplates();
  }, []);
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Template</InputLabel>
      <Select
        onChange={onChange}
        label="Status"
        autoWidth
        value={templateValue}
      >
        {templates.map((statusOption) => (
          <MenuItem key={statusOption.id} value={statusOption.id}>
            {statusOption.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TemplateSelect;
