import { render } from '@testing-library/react';
import { Form } from './';

const formConfig = {
  defaultValues: { controllerOne: [], controllerTwo: { id: 1, label: 'Option 1' } },
  onSubmitFn: () => console.log('teste'),
  style: {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    columnGap: '10px',
  },
};

describe('Form', () => {
  it('should render', () => {
    const container = render(
      <Form config={formConfig}>
        <div>Form Children</div>
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
