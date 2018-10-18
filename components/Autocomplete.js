import React, { Component } from 'react';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import debounce from '../src/debounce';

function renderInput(inputProps) {
  const { InputProps, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}

export default class Autocomplete extends Component {
  state = {
    isFetching: false,
    suggestions: []
  };

  getSuggestions = debounce(inputValue => {
    if (inputValue.length < 2) return;

    const { fetchSuggestions } = this.props;
    this.setState({ isFetching: true });
    return fetchSuggestions(inputValue).then(suggestions => {
      this.setState({
        isFetching: false,
        suggestions: suggestions.slice(0, 5)
      });
    });
  }, 300);

  render() {
    const { suggestions } = this.state;
    console.log(suggestions);
    return (
      <div>
        <Downshift
          id="downshift-simple"
          onInputValueChange={inputValue => this.getSuggestions(inputValue)}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem
          }) => (
            <div>
              {renderInput({
                fullWidth: true,
                InputProps: getInputProps({
                  placeholder: 'Search a country (start with a)'
                })
              })}
              <div {...getMenuProps()}>
                {isOpen && inputValue.length > 1 ? (
                  <Paper square>
                    {suggestions.map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.name }),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}
