import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";

/**
 *
 * @description Language switcher for the app
 */
export const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-language">{t("language")}</InputLabel>
      <Select
        labelId="select-language"
        value={i18n.language.split("-")[0]}
        onChange={(e) => handleChangeLanguage(e.target.value)}
        label={t("language")}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            height: 43,
          },
        }}
      >
        <MenuItem value="en">{t("english")}</MenuItem>
        <MenuItem value="de">{t("german")}</MenuItem>
      </Select>
    </FormControl>
  );
};
