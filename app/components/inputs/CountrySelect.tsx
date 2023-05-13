"use client";
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";
export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};
interface CountrySelectProps {
  value?: CountrySelectProps;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        classNames={{
          control: () => "p-3 border-2",
          input: () => " text-lg",
          option: () => "test-lg",
        }}
        onChange={(value) => onChange(value as CountrySelectValue)}
        value={value}
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className=" ml-1 text-neutral-500">{option.region}</span>
            </div>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "£ffe4e6",
          },
        })}
      ></Select>
    </div>
  );
};

export default CountrySelect;
