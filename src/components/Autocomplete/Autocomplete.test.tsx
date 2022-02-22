import React from 'react';
import { render } from '@testing-library/react';
import { Autocomplete } from './';

describe('AutoComplete', () => {
  it('should render without any options', () => {
    const container = render(<Autocomplete options={[]} label="Numbers" />);
    expect(container).toMatchSnapshot();
  });

  it('should render with options', () => {
    const container = render(
      <Autocomplete options={[{ id: 0, label: 'Option 0' }]} label="Numbers" />
    );
    expect(container).toMatchSnapshot();
  });
});
