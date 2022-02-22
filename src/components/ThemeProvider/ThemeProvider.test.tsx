import { render } from '@testing-library/react';
import { ThemeProvider } from './';

describe('ThemeProvider', () => {
  it('should render', () => {
    const container = render(
      <ThemeProvider primary="amber" secondary="amber">
        <div>Children</div>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
