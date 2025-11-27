// filter-link-completed.component.spec.ts
import { render, screen, fireEvent } from '@testing-library/angular';
import { FilterLinkCompletedComponent } from './filter-link-completed.component';

describe('FilterLinkCompletedComponent', () => {
  // Test 1: Correctly renders the link with default props
  test('should render the "Completed" link without the selected class by default', async () => {
    await render(FilterLinkCompletedComponent);

    const linkElement = screen.getByTestId('filter-link-completed');

    // Check if the element exists
    expect(linkElement).toBeInTheDocument();

    // Check the text content
    expect(linkElement).toHaveTextContent('Completed');

    // Check the href attribute
    expect(linkElement).toHaveAttribute('href', '#/completed');

    // Check that the 'selected' class is not applied by default
    expect(linkElement).not.toHaveClass('selected');
  });

  // Test 2: Applies the 'selected' class when isSelected is true
  test('should apply the "selected" class when isSelected input is true', async () => {
    await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: true },
    });

    const linkElement = screen.getByTestId('filter-link-completed');
    expect(linkElement).toHaveClass('selected');
  });

  // Test 3: Does not apply the 'selected' class when isSelected is false
  test('should not apply the "selected" class when isSelected input is false', async () => {
    await render(FilterLinkCompletedComponent, {
      componentProperties: { isSelected: false },
    });

    const linkElement = screen.getByTestId('filter-link-completed');
    expect(linkElement).not.toHaveClass('selected');
  });

  // Test 4: Calls the selectFilter method on click
  test('should call selectFilter method when the link is clicked', async () => {
    const { fixture } = await render(FilterLinkCompletedComponent);
    const componentInstance = fixture.componentInstance;

    // Spy on the selectFilter method
    const selectFilterSpy = jest.spyOn(componentInstance, 'selectFilter');

    const linkElement = screen.getByTestId('filter-link-completed');
    fireEvent.click(linkElement);

    // Expect the method to have been called once
    expect(selectFilterSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy
    selectFilterSpy.mockRestore();
  });

  // Test 5: Logs to the console when selectFilter is called
  test('should log to console when selectFilter method is executed', async () => {
    await render(FilterLinkCompletedComponent);

    // Spy on console.log
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const linkElement = screen.getByTestId('filter-link-completed');
    fireEvent.click(linkElement);

    // Verify that console.log was called with the expected message
    expect(consoleLogSpy).toHaveBeenCalledWith('Completed filter selected');

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });
});