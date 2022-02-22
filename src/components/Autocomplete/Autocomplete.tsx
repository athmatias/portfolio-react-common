import React, { SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Popper from '@mui/material/Popper';
import { VariableSizeList, ListChildComponentProps } from 'react-window';

import { Option, Options } from '../../types/form.types';

import './Autocomplete.scss';

export type AutoCompleteProps = {
  /**
   * The value of the autocomplete. {id (string or number), label(string)}
   */
  value?: Option | null;
  /**
   * Function that
   */
  onChange?: (event: SyntheticEvent<Element, Event>, value: Option | Options | null) => void;
  /**
   * Options passed to AutoComplete Component, must be an array of {id, label}
   */
  options: Option[];
  /**
   * Text used to identify AutoComplete label
   */
  label: string;
  /**
   * A custom className to be passed in the event you need more customization
   */
  className?: string;
  /**
   * A loading state passed to the component
   */
  isLoading?: boolean;
  /**
   * The side of the component, if undefined it is defaulted to Medium
   */
  size?: 'small' | 'medium' | undefined;
  /**
   * The mode of the component, multiple allows multiple options to be selected
   */
  multiple?: boolean;
  /**
   * Checkbox rendering to multiple mode, component will shut this off if options is greater than 500
   */
  useCheckbox?: boolean;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const LISTBOX_PADDING = 8; // px

export const AutoCompleteComponent: React.FC<AutoCompleteProps> = ({
  options,
  label,
  className,
  isLoading,
  size,
  multiple,
  useCheckbox,
  ...rest
}) => {
  const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
      boxSizing: 'border-box',
      '& ul': {
        padding: 0,
        margin: 0,
      },
    },
  });

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    };

    if (Object.prototype.hasOwnProperty.call(dataSet, 'group')) {
      return (
        <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
          {dataSet.group}
        </ListSubheader>
      );
    }

    return (
      <Typography component="li" {...dataSet.props} noWrap style={inlineStyle}>
        {useCheckbox && data.length < 500 && (
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={dataSet.props['aria-selected']}
          />
        )}
        {dataSet.key}
      </Typography>
    );
  }

  const OuterElementContext = React.createContext({});

  const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  // Adapter for react-window
  const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
    function ListboxComponent(props, ref) {
      const { children, ...other } = props;
      const itemData: React.ReactChild[] = [];
      (children as React.ReactChild[]).forEach(
        (item: React.ReactChild & { children?: React.ReactChild[] }) => {
          itemData.push(item);
          itemData.push(...(item.children || []));
        }
      );

      const theme = useTheme();
      const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
      });
      const itemCount = itemData.length;
      const itemSize = smUp ? 36 : 48;

      const getChildSize = (child: React.ReactChild) => {
        if (Object.prototype.hasOwnProperty.call(child, 'group')) {
          return 48;
        }

        return itemSize;
      };

      const getHeight = () => {
        if (itemCount > 8) {
          return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
      };

      const gridRef = useResetCache(itemCount);

      return (
        <div ref={ref}>
          <OuterElementContext.Provider value={other}>
            <VariableSizeList
              itemData={itemData}
              height={getHeight() + 2 * LISTBOX_PADDING}
              width="100%"
              ref={gridRef}
              outerElementType={OuterElementType}
              innerElementType="ul"
              itemSize={(index) => getChildSize(itemData[index])}
              overscanCount={5}
              itemCount={itemCount}
            >
              {renderRow}
            </VariableSizeList>
          </OuterElementContext.Provider>
        </div>
      );
    }
  );

  return (
    <Autocomplete
      className={`Autocomplete-input ${className}`}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      clearOnEscape
      handleHomeEndKeys
      loading={isLoading && options.length === 0}
      size={size}
      multiple={multiple}
      limitTags={1}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...rest}
    />
  );
};
